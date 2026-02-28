<template>
  <canvas
    ref="canvas"
    style="width: 100vw; height: 100vh; display: block"
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
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSceneStore } from "~/stores/sceneStore";

const canvas = ref<HTMLCanvasElement | null>(null);

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let animationId: number;
const models: THREE.Group[] = [];

const sceneStore = useSceneStore();

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

function createGradientTexture(): THREE.CanvasTexture {
  const offscreen = document.createElement("canvas");
  offscreen.width = 512;
  offscreen.height = 512;
  const ctx = offscreen.getContext("2d")!;

  const centerX = offscreen.width / 2;
  const centerY = offscreen.height / 2;
  const radius = Math.sqrt(centerX ** 2 + centerY ** 2);

  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(1, "#b6b3a2");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, offscreen.width, offscreen.height);

  return new THREE.CanvasTexture(offscreen);
}

function onModelLoaded(mesh: THREE.Group): void {
  mesh.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(mesh);
  models.push(mesh);
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

onMounted(() => {
  if (!canvas.value) return;

  // Scene
  scene = new THREE.Scene();
  scene.background = createGradientTexture();

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
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
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

  const hemiLight = new THREE.HemisphereLight(0xcceeff, 0xffffff, 0.6);
  scene.add(hemiLight);

  // Animation loop
  const animate = (): void => {
    animationId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener("resize", onWindowResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onWindowResize);
  clearTimeout(resizeTimeout);
  cancelAnimationFrame(animationId);

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
