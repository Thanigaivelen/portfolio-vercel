<script setup lang="ts">
import * as THREE from 'three';
import { buildStudio } from '~/utils/buildStudio';

const props = defineProps<{ warm: boolean; motion: boolean }>();
const emit = defineEmits<{ ready: []; project: [id: string]; availability: [available: boolean] }>();
const host = ref<HTMLDivElement>();
const unavailable = ref(false);
const hovering = ref(false);
let renderer: THREE.WebGLRenderer | undefined;
let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let studio: ReturnType<typeof buildStudio>;
let resizeObserver: ResizeObserver;
let intersectionObserver: IntersectionObserver;
let frame = 0;
let disposed = false;
let visible = true;
let dragging = false;
let pointerStart = { x: 0, y: 0, angle: 0 };
let angle = 0;
let targetAngle = 0;
let keyLight: THREE.DirectionalLight;
let elapsed = 0;
let previousTime = 0;
const textures: THREE.Texture[] = [];
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function canvasTexture(draw: (ctx: CanvasRenderingContext2D) => void, width = 512, height = 512) {
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas unavailable');
  draw(context);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture); return texture;
}
function setLighting() {
  if (!studio) return;
  studio.skyMaterial.color.set(props.warm ? '#ffffff' : '#648cce');
  studio.windowLight.color.set(props.warm ? '#ffb66d' : '#8bb9ff');
  studio.windowLight.intensity = props.warm ? 14 : 9;
  studio.lampLight.intensity = props.warm ? 9 : 5;
  keyLight.color.set(props.warm ? '#ffe2bd' : '#accbff');
  keyLight.intensity = props.warm ? 3.4 : 1.5;
  renderer!.toneMappingExposure = props.warm ? 1.2 : .95;
  render();
}
function render() { if (renderer && scene && camera && !disposed) renderer.render(scene, camera); }
function resize() {
  if (!host.value || !renderer) return;
  const { width, height } = host.value.getBoundingClientRect();
  const aspect = width / Math.max(1, height);
  const vertical = Math.max(6.2, 7.2 / aspect);
  camera.left = -vertical * aspect / 2; camera.right = vertical * aspect / 2;
  camera.top = vertical / 2; camera.bottom = -vertical / 2; camera.updateProjectionMatrix();
  renderer.setSize(width, height, false); render();
}
function animate(now: number) {
  frame = requestAnimationFrame(animate);
  // A deliberate 30 fps cap keeps the decorative scene light on laptop GPUs.
  if (previousTime && now - previousTime < 1000 / 30) return;
  const delta = previousTime ? Math.min((now - previousTime) / 1000, .05) : 0;
  previousTime = now;
  if (!visible || document.hidden || unavailable.value) return;
  const settling = Math.abs(angle - targetAngle) > .0001;
  if (props.motion) elapsed += delta;
  angle += (targetAngle - angle) * Math.min(delta * 12, 1);
  studio.room.rotation.y = angle + (props.motion && !dragging ? Math.sin(elapsed * .27) * .025 : 0);
  if (props.motion || settling || dragging) render();
}
function hit(event: PointerEvent) {
  if (!renderer || !studio || !camera) return undefined;
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  // Test the whole room so screens cannot be selected through a wall or chair.
  const intersection = raycaster.intersectObject(studio.room, true)[0];
  return intersection?.object.userData.project as string | undefined;
}
function pointerDown(event: PointerEvent) {
  if (event.button !== 0) return;
  dragging = true; pointerStart = { x: event.clientX, y: event.clientY, angle: targetAngle };
  renderer?.domElement.setPointerCapture(event.pointerId);
}
function pointerMove(event: PointerEvent) {
  if (dragging) { targetAngle = THREE.MathUtils.clamp(pointerStart.angle + (event.clientX - pointerStart.x) * .006, -.55, .6); }
  else hovering.value = Boolean(hit(event));
}
function pointerUp(event: PointerEvent) {
  const wasDragging = dragging; dragging = false;
  hovering.value = false;
  if (renderer?.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
  if (wasDragging && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) < 6) {
    const project = hit(event); if (project) emit('project', project);
  }
}
function pointerCancel() { dragging = false; hovering.value = false; }
function pointerLeave() { hovering.value = false; }
function contextLost(event: Event) { event.preventDefault(); unavailable.value = true; emit('availability', false); }

onMounted(() => {
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-label', 'Interactive 3D developer studio. Drag to rotate. Project links are also available below.');
    renderer.domElement.setAttribute('role', 'img');
    host.value!.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-4, 4, 4, -4, .1, 50);
    camera.position.set(7.4, 6.2, 9.5); camera.lookAt(0, 1.5, 0);
    scene.add(new THREE.AmbientLight('#b8cce5', 1.1));
    scene.add(new THREE.HemisphereLight('#d6e6ff', '#6b695d', 1.5));
    keyLight = new THREE.DirectionalLight('#ffe2bd', 3.4); keyLight.position.set(-3, 7, 5);
    keyLight.castShadow = true; keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -5; keyLight.shadow.camera.right = 5; keyLight.shadow.camera.top = 6; keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.normalBias = .035; keyLight.shadow.bias = -.0002; scene.add(keyLight);
    const rim = new THREE.DirectionalLight('#8db9ff', 1.8); rim.position.set(5, 4, -4); scene.add(rim);
    const sign = canvasTexture(ctx => {
      ctx.font = 'bold 100px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.shadowColor = '#ffc594'; ctx.shadowBlur = 14; ctx.fillStyle = '#ffe0b9'; ctx.fillText('thani.', 256, 100);
    }, 512, 200);
    const sky = canvasTexture(ctx => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 512); gradient.addColorStop(0, '#e3a6a0'); gradient.addColorStop(.5, '#f4be8b'); gradient.addColorStop(1, '#e4d0a7'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = '#fff0c3'; ctx.beginPath(); ctx.arc(350, 170, 65, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#a29e9c'; ctx.beginPath(); ctx.moveTo(0, 390); ctx.bezierCurveTo(130, 300, 150, 450, 320, 360); ctx.bezierCurveTo(420, 300, 480, 320, 512, 350); ctx.lineTo(512, 512); ctx.lineTo(0, 512); ctx.fill();
      ctx.fillStyle = '#7c8588'; ctx.beginPath(); ctx.moveTo(0, 455); ctx.bezierCurveTo(150, 360, 350, 500, 512, 420); ctx.lineTo(512, 512); ctx.lineTo(0, 512); ctx.fill();
    });
    function projectTexture(path: string) {
      const texture = new THREE.TextureLoader().load(path, () => { if (disposed) texture.dispose(); else render(); });
      texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(4, renderer!.capabilities.getMaxAnisotropy()); textures.push(texture); return texture;
    }
    studio = buildStudio({ sign, sky, pascal: projectTexture('/images/cos-theta.png'), theta: projectTexture('/images/heypascal.png') });
    scene.add(studio.room); setLighting();
    const canvas = renderer.domElement;
    canvas.addEventListener('pointerdown', pointerDown); canvas.addEventListener('pointermove', pointerMove);
    canvas.addEventListener('pointerup', pointerUp); canvas.addEventListener('pointercancel', pointerCancel);
    canvas.addEventListener('pointerleave', pointerLeave);
    canvas.addEventListener('webglcontextlost', contextLost);
    resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host.value!);
    intersectionObserver = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) render(); }); intersectionObserver.observe(host.value!);
    resize(); frame = requestAnimationFrame(animate); emit('ready');
  } catch { unavailable.value = true; emit('availability', false); emit('ready'); }
});
watch(() => props.warm, setLighting);
watch(() => props.motion, () => { if (studio) { studio.room.rotation.y = angle; render(); } });
onBeforeUnmount(() => {
  disposed = true; cancelAnimationFrame(frame); resizeObserver?.disconnect(); intersectionObserver?.disconnect();
  const canvas = renderer?.domElement;
  canvas?.removeEventListener('pointerdown', pointerDown); canvas?.removeEventListener('pointermove', pointerMove);
  canvas?.removeEventListener('pointerup', pointerUp); canvas?.removeEventListener('pointercancel', pointerCancel);
  canvas?.removeEventListener('pointerleave', pointerLeave);
  canvas?.removeEventListener('webglcontextlost', contextLost);
  const geometries = new Set<THREE.BufferGeometry>(); const materials = new Set<THREE.Material>();
  scene?.traverse(object => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material)); } });
  geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose()); textures.forEach(texture => texture.dispose());
  keyLight?.shadow.dispose(); renderer?.dispose(); canvas?.remove();
});
</script>

<template>
  <div ref="host" class="studio-canvas" :class="{ 'over-screen': hovering, 'is-unavailable': unavailable }">
    <div v-if="unavailable" class="studio-fallback"><span aria-hidden="true">✳</span><h2>A space for ideas.</h2><p>The interactive studio couldn’t load on this device.<br>My work is ready to explore below.</p><a href="#work">Explore my work ↗</a></div>
    <div v-if="hovering && !unavailable" class="screen-hint">Open project ↗</div>
  </div>
</template>

<style scoped>
.studio-canvas{width:100%;height:100%;position:relative}.studio-canvas :deep(canvas){display:block;width:100%;height:100%;cursor:grab;touch-action:pan-y}.studio-canvas :deep(canvas:active){cursor:grabbing}.over-screen :deep(canvas){cursor:pointer}.screen-hint{position:absolute;bottom:60px;left:50%;transform:translateX(-50%);color:#f0eee8;background:#23354be6;padding:9px 15px;border-radius:20px;font-size:11px;pointer-events:none}.studio-fallback{position:absolute;inset:15% 8%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:#1b2c43;border:1px solid #ffffff16;border-radius:140px 140px 15px 15px}.studio-fallback>span{font-size:90px;color:#f4b185}.studio-fallback h2{font-size:25px;letter-spacing:-1px;margin:12px 0}.studio-fallback p{font-size:12px;line-height:1.9;color:#a7b9cf}.studio-fallback a{color:#f4b185;font-size:12px;margin-top:20px}.is-unavailable :deep(canvas){display:none}
</style>
