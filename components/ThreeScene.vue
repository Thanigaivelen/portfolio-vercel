<template>
  <canvas
    ref="canvas"
    style="width: 100vw; height: 100vh; display: block; cursor: grab"
    @mousemove="onMouseMove"
    @click="onCanvasClick"
    @touchstart="onTouchStart"
  />
  <GltfModel
    path="/models/house/scene.gltf"
    :position="[0, 0.4, 0]"
    :scale="[0.01, 0.01, 0.01]"
    :rotation="[0, 0, 0]"
    @loaded="onModelLoaded"
  />
  <GltfModel
    path="/models/cat/scene.gltf"
    :position="[0, 1.265, 2.2]"
    :scale="[1, 1, 1]"
    :rotation="[0, -70, 0]"
    @loaded="onModelLoaded"
  />
  <GltfModel
    path="/models/shiba/scene.gltf"
    :position="[0.9, 0.8, -1.8]"
    :scale="[0.4, 0.4, 0.4]"
    :rotation="[0, 60, 0]"
    @loaded="onModelLoaded"
  />
  <GltfModel
    path="/models/strong_chicken/scene.gltf"
    :position="[-1.4, 7, -1.5]"
    :scale="[0.7, 0.7, 0.7]"
    :rotation="[0, 90, 0]"
    @loaded="onModelLoaded"
  />

  <!-- Interaction hints overlay -->
  <Transition name="hint-fade">
    <div
      v-if="showHints"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-5 py-3 rounded-2xl bg-surface-950/70 backdrop-blur-xl border border-surface-700/30 text-surface-400 text-xs font-mono"
    >
      <span class="hidden md:flex items-center gap-1.5">
        <kbd class="px-1.5 py-0.5 rounded bg-surface-800 text-surface-300 text-[10px]">Scroll</kbd>
        Navigate
      </span>
      <span class="hidden md:flex items-center gap-1.5">
        <kbd class="px-1.5 py-0.5 rounded bg-surface-800 text-surface-300 text-[10px]">Click</kbd>
        Interact
      </span>
      <span class="hidden md:flex items-center gap-1.5">
        <kbd class="px-1.5 py-0.5 rounded bg-surface-800 text-surface-300 text-[10px]">N</kbd>
        Night Mode
      </span>
      <span class="flex md:hidden items-center gap-1.5">
        Swipe to navigate
      </span>
      <button
        class="ml-2 text-surface-500 hover:text-surface-300 transition-colors"
        aria-label="Dismiss hints"
        @click="showHints = false"
      >
        <Icon name="material-symbols:close" class="text-sm" />
      </button>
    </div>
  </Transition>

  <!-- Day/Night indicator -->
  <Transition name="hint-fade">
    <div
      v-if="showModeToast"
      class="fixed top-20 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-xl bg-surface-950/70 backdrop-blur-xl border border-surface-700/30 text-surface-300 text-sm font-medium"
    >
      {{ isNightMode ? 'Night Mode' : 'Day Mode' }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { useSceneStore } from "~/stores/sceneStore";

const canvas = ref<HTMLCanvasElement | null>(null);
const showHints = ref(true);
const showModeToast = ref(false);
const { isNightMode, onToggleDayNight } = useSceneInteraction();

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let animationId: number;
let clock: THREE.Clock;
const models: THREE.Group[] = [];

// Interaction state
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let hoveredModel: THREE.Group | null = null;
let isScrolling = false;

// Parallax
const parallaxTarget = { x: 0, y: 0 };
const parallaxCurrent = { x: 0, y: 0 };

// Particles
let particleSystem: THREE.Points;
let particleVelocities: Float32Array;

// Lights (mutable for day/night)
let ambientLight: THREE.AmbientLight;
let directionalLight: THREE.DirectionalLight;
let hemiLight: THREE.HemisphereLight;
let pointLight: THREE.PointLight | null = null;

// Background textures
let dayTexture: THREE.CanvasTexture;
let nightTexture: THREE.CanvasTexture;

const sceneStore = useSceneStore();
const soundStore = useSoundStore();

const cameraPositions = [
  {
    position: new THREE.Vector3(6.6, 3.2, 1.46),
    target: new THREE.Vector3(-3.21, 3.2, 4.46),
  },
  {
    position: new THREE.Vector3(3.07, 1.36, -1.33),
    target: new THREE.Vector3(-6.39, 1.2, 4.91),
  },
  {
    position: new THREE.Vector3(1.22, 2.22, 6.02),
    target: new THREE.Vector3(-16.3, 1.4, -3.18),
  },
  {
    position: new THREE.Vector3(4.09, 6.4, -2.34),
    target: new THREE.Vector3(-5.85, 6.4, -9.0),
  },
  {
    position: new THREE.Vector3(4.09, 6.4, -2.34),
    target: new THREE.Vector3(-5.85, 6.4, -30.42),
  },
];

// --- Gradient Textures ---
function createGradientTexture(topColor: string, bottomColor: string): THREE.CanvasTexture {
  const offscreen = document.createElement("canvas");
  offscreen.width = 512;
  offscreen.height = 512;
  const ctx = offscreen.getContext("2d")!;
  const cx = offscreen.width / 2;
  const cy = offscreen.height / 2;
  const radius = Math.sqrt(cx ** 2 + cy ** 2);
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  gradient.addColorStop(0, topColor);
  gradient.addColorStop(1, bottomColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, offscreen.width, offscreen.height);
  return new THREE.CanvasTexture(offscreen);
}

// --- Particle System ---
function createParticles(): THREE.Points {
  const count = 200;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  particleVelocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Spread particles around the scene
    positions[i3] = (Math.random() - 0.5) * 40;
    positions[i3 + 1] = Math.random() * 15 + 1;
    positions[i3 + 2] = (Math.random() - 0.5) * 40;

    // Warm golden colors
    colors[i3] = 0.9 + Math.random() * 0.1;
    colors[i3 + 1] = 0.7 + Math.random() * 0.2;
    colors[i3 + 2] = 0.3 + Math.random() * 0.2;

    // Slow drifting velocities
    particleVelocities[i3] = (Math.random() - 0.5) * 0.005;
    particleVelocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
    particleVelocities[i3 + 2] = (Math.random() - 0.5) * 0.005;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

function updateParticles(time: number): void {
  if (!particleSystem) return;
  const positions = particleSystem.geometry.attributes.position;
  const arr = positions.array as Float32Array;
  const count = arr.length / 3;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Drift + gentle sine wave
    arr[i3] += particleVelocities[i3] + Math.sin(time + i * 0.1) * 0.002;
    arr[i3 + 1] += particleVelocities[i3 + 1] + Math.cos(time * 0.5 + i * 0.05) * 0.002;
    arr[i3 + 2] += particleVelocities[i3 + 2];

    // Reset particles that drift too far
    if (Math.abs(arr[i3]) > 25) arr[i3] *= -0.9;
    if (arr[i3 + 1] > 18 || arr[i3 + 1] < 0) particleVelocities[i3 + 1] *= -1;
    if (Math.abs(arr[i3 + 2]) > 25) arr[i3 + 2] *= -0.9;
  }
  positions.needsUpdate = true;

  // Pulse particle opacity based on time
  const mat = particleSystem.material as THREE.PointsMaterial;
  mat.opacity = 0.4 + Math.sin(time * 0.8) * 0.2;
}

// --- Model Interaction ---
function onModelLoaded(mesh: THREE.Group): void {
  mesh.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  mesh.userData.originalScale = mesh.scale.clone();
  mesh.userData.originalY = mesh.position.y;
  scene.add(mesh);
  models.push(mesh);
}

function checkModelHover(): void {
  raycaster.setFromCamera(mouse, camera);
  let found: THREE.Group | null = null;

  for (const model of models) {
    const intersects = raycaster.intersectObject(model, true);
    if (intersects.length > 0) {
      found = model;
      break;
    }
  }

  if (found !== hoveredModel) {
    // Un-hover old
    if (hoveredModel) {
      const orig = hoveredModel.userData.originalScale as THREE.Vector3;
      gsap.to(hoveredModel.scale, {
        x: orig.x,
        y: orig.y,
        z: orig.z,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
      if (canvas.value) canvas.value.style.cursor = "grab";
    }

    // Hover new
    if (found) {
      const orig = found.userData.originalScale as THREE.Vector3;
      gsap.to(found.scale, {
        x: orig.x * 1.08,
        y: orig.y * 1.08,
        z: orig.z * 1.08,
        duration: 0.3,
        ease: "back.out(2)",
      });
      if (canvas.value) canvas.value.style.cursor = "pointer";
    }

    hoveredModel = found;
  }
}

function bounceModel(model: THREE.Group): void {
  const origY = model.userData.originalY as number;
  soundStore.playClickSound();

  gsap.to(model.position, {
    y: origY + 0.5,
    duration: 0.25,
    ease: "power2.out",
    yoyo: true,
    repeat: 1,
  });

  // Spin the model
  gsap.to(model.rotation, {
    y: model.rotation.y + Math.PI * 2,
    duration: 0.8,
    ease: "power2.out",
  });
}

// --- Day/Night Mode ---
function applyDayNight(): void {
  showModeToast.value = true;
  setTimeout(() => { showModeToast.value = false; }, 1500);

  if (isNightMode.value) {
    // Night
    gsap.to(ambientLight, { intensity: 0.15, duration: 1.5 });
    gsap.to(directionalLight, { intensity: 1, duration: 1.5 });
    gsap.to(hemiLight, { intensity: 0.2, duration: 1.5 });

    scene.background = nightTexture;

    // Add point light for warm glow
    if (!pointLight) {
      pointLight = new THREE.PointLight(0xff9944, 3, 20);
      pointLight.position.set(0, 3, 0);
      scene.add(pointLight);
    }
    gsap.to(pointLight, { intensity: 3, duration: 1.5 });

    // Make particles brighter
    const mat = particleSystem.material as THREE.PointsMaterial;
    gsap.to(mat, { opacity: 0.8, duration: 1.5 });
    mat.size = 0.12;
  } else {
    // Day
    gsap.to(ambientLight, { intensity: 0.6, duration: 1.5 });
    gsap.to(directionalLight, { intensity: 5, duration: 1.5 });
    gsap.to(hemiLight, { intensity: 0.6, duration: 1.5 });

    scene.background = dayTexture;

    if (pointLight) {
      gsap.to(pointLight, { intensity: 0, duration: 1.5 });
    }

    const mat = particleSystem.material as THREE.PointsMaterial;
    gsap.to(mat, { opacity: 0.4, duration: 1.5 });
    mat.size = 0.08;
  }
}

// --- Event Handlers ---
function onMouseMove(event: MouseEvent): void {
  // Normalized mouse coords for raycasting
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Parallax target (subtle camera sway)
  parallaxTarget.x = mouse.x * 0.3;
  parallaxTarget.y = mouse.y * 0.15;
}

function onCanvasClick(): void {
  if (hoveredModel) {
    bounceModel(hoveredModel);
  }
}

function onTouchStart(event: TouchEvent): void {
  if (event.touches.length === 1) {
    const touch = event.touches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    checkModelHover();
    if (hoveredModel) {
      bounceModel(hoveredModel);
    }
  }
}

function handleScroll(event: WheelEvent): void {
  event.preventDefault();
  if (isScrolling) return;
  isScrolling = true;

  soundStore.playClickSound();

  if (event.deltaY > 0) {
    sceneStore.nextSection();
  } else {
    sceneStore.prevSection();
  }

  setTimeout(() => {
    isScrolling = false;
  }, 2200);
}

function handleKeyDown(event: KeyboardEvent): void {
  switch (event.key) {
    case "ArrowDown":
    case "ArrowRight":
    case "PageDown":
      event.preventDefault();
      if (!isScrolling) {
        isScrolling = true;
        soundStore.playClickSound();
        sceneStore.nextSection();
        setTimeout(() => { isScrolling = false; }, 2200);
      }
      break;
    case "ArrowUp":
    case "ArrowLeft":
    case "PageUp":
      event.preventDefault();
      if (!isScrolling) {
        isScrolling = true;
        soundStore.playClickSound();
        sceneStore.prevSection();
        setTimeout(() => { isScrolling = false; }, 2200);
      }
      break;
    case "n":
    case "N": {
      const { toggleDayNight } = useSceneInteraction();
      toggleDayNight();
      break;
    }
    case "1": case "2": case "3": case "4": case "5":
      sceneStore.setSection(parseInt(event.key) - 1);
      soundStore.playClickSound();
      break;
  }
}

// Touch swipe for mobile
let touchStartY = 0;
function handleTouchStart(e: TouchEvent): void {
  touchStartY = e.touches[0].clientY;
}
function handleTouchEnd(e: TouchEvent): void {
  if (isScrolling) return;
  const touchEndY = e.changedTouches[0].clientY;
  const diff = touchStartY - touchEndY;
  if (Math.abs(diff) > 50) {
    isScrolling = true;
    soundStore.playClickSound();
    if (diff > 0) {
      sceneStore.nextSection();
    } else {
      sceneStore.prevSection();
    }
    setTimeout(() => { isScrolling = false; }, 2200);
  }
}

let resizeTimeout: ReturnType<typeof setTimeout>;
function onWindowResize(): void {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, 100);
}

// --- Mount ---
onMounted(() => {
  if (!canvas.value) return;

  clock = new THREE.Clock();

  // Scene
  scene = new THREE.Scene();
  dayTexture = createGradientTexture("#ffffff", "#b6b3a2");
  nightTexture = createGradientTexture("#1a1a2e", "#16213e");
  scene.background = dayTexture;

  // Fog for depth
  scene.fog = new THREE.FogExp2(0xb6b3a2, 0.015);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4000);
  camera.position.set(6.6, 3.2, 1.46);
  camera.lookAt(-3.21, 3.2, 4.46);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 10;
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enableRotate = false;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.target.set(-3.21, 3.2, 4.46);
  controls.update();

  // Store references
  sceneStore.setCamera(camera);
  sceneStore.setControls(controls);
  sceneStore.setCameraPositions(cameraPositions);

  // Lights
  ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  directionalLight.position.set(10, 40, 10);
  directionalLight.target.position.set(0, 0, 0);
  directionalLight.castShadow = true;
  directionalLight.shadow.bias = -0.002;
  directionalLight.shadow.normalBias = 0.02;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  const shadowCam = directionalLight.shadow.camera;
  shadowCam.left = -30;
  shadowCam.right = 30;
  shadowCam.top = 30;
  shadowCam.bottom = -30;
  shadowCam.near = 0.5;
  shadowCam.far = 100;
  shadowCam.updateProjectionMatrix();
  scene.add(directionalLight);

  hemiLight = new THREE.HemisphereLight(0xcceeff, 0xffffff, 0.6);
  scene.add(hemiLight);

  // Particles
  particleSystem = createParticles();
  scene.add(particleSystem);

  // Event listeners
  window.addEventListener("wheel", handleScroll, { passive: false });
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchend", handleTouchEnd, { passive: true });

  // Register day/night callback from composable
  onToggleDayNight(() => {
    applyDayNight();
  });

  // Auto-hide hints after 8 seconds
  setTimeout(() => { showHints.value = false; }, 8000);

  // Animation loop
  const animate = (): void => {
    animationId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Smooth parallax
    parallaxCurrent.x += (parallaxTarget.x - parallaxCurrent.x) * 0.02;
    parallaxCurrent.y += (parallaxTarget.y - parallaxCurrent.y) * 0.02;

    // Apply parallax as a subtle offset to camera
    camera.position.x += (parallaxCurrent.x * 0.5 - (camera.position.x - sceneStore.cameraPositions[sceneStore.currentSection]?.position.x)) * 0.01;
    camera.position.y += (parallaxCurrent.y * 0.3 - (camera.position.y - sceneStore.cameraPositions[sceneStore.currentSection]?.position.y)) * 0.01;

    // Animate models (gentle floating)
    models.forEach((model, i) => {
      const baseY = model.userData.originalY as number;
      if (baseY !== undefined) {
        const floatOffset = Math.sin(elapsed * 0.5 + i * 1.5) * 0.05;
        model.position.y = baseY + floatOffset;
      }
    });

    // Update particles
    updateParticles(elapsed);

    // Raycasting for hover detection (throttle to every few frames)
    if (Math.floor(elapsed * 30) % 2 === 0) {
      checkModelHover();
    }

    controls.update();
    renderer.render(scene, camera);
  };
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener("wheel", handleScroll);
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("resize", onWindowResize);
  window.removeEventListener("touchstart", handleTouchStart);
  window.removeEventListener("touchend", handleTouchEnd);
  clearTimeout(resizeTimeout);
  cancelAnimationFrame(animationId);

  // Dispose particles
  if (particleSystem) {
    particleSystem.geometry.dispose();
    (particleSystem.material as THREE.PointsMaterial).dispose();
  }

  // Dispose models
  models.forEach((model) => {
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material?.dispose();
        }
      }
    });
  });

  controls.dispose();
  renderer.dispose();
  scene.clear();
});
</script>

<style scoped>
.hint-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.hint-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.hint-fade-enter-from,
.hint-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
</style>
