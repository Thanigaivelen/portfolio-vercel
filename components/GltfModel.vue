<template>
  <div style="display: none" />
</template>

<script setup lang="ts">
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const props = defineProps<{
  path: string;
  position?: number[];
  scale?: number[];
  rotation?: number[];
}>();

const emit = defineEmits<{
  loaded: [mesh: THREE.Group];
}>();

onMounted(() => {
  const loader = new GLTFLoader();

  loader.load(
    props.path,
    (gltf) => {
      const model = gltf.scene;
      const group = new THREE.Group();
      group.add(model);

      const pos = props.position ?? [0, 0, 0];
      const scl = props.scale ?? [1, 1, 1];
      const rot = props.rotation ?? [0, 0, 0];

      group.position.set(pos[0], pos[1], pos[2]);
      group.scale.set(scl[0], scl[1], scl[2]);
      group.rotation.set(
        ...rot.map((r) => THREE.MathUtils.degToRad(r)) as [number, number, number]
      );

      emit("loaded", group);
    },
    undefined,
    (error) => {
      console.error(`Failed to load model: ${props.path}`, error);
    }
  );
});
</script>
