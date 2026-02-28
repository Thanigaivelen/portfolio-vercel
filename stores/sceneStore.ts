import { defineStore } from "pinia";
import type * as THREE from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

interface CameraPosition {
  position: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
}

export const useSceneStore = defineStore("scene", {
  state: () => ({
    currentSection: 0,
    camera: null as THREE.PerspectiveCamera | null,
    controls: null as OrbitControls | null,
    cameraPositions: [] as CameraPosition[],
  }),

  actions: {
    setCamera(camera: THREE.PerspectiveCamera) {
      this.camera = camera;
    },

    setControls(controls: OrbitControls) {
      this.controls = controls;
    },

    setCameraPositions(positions: CameraPosition[]) {
      this.cameraPositions = positions;
    },

    setSection(index: number) {
      if (index < 0 || index >= this.cameraPositions.length) return;
      if (index === this.currentSection) return;

      this.currentSection = index;
      this.moveCameraToCurrentSection();
    },

    nextSection() {
      if (this.currentSection < this.cameraPositions.length - 1) {
        this.currentSection++;
        this.moveCameraToCurrentSection();
      }
    },

    prevSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
        this.moveCameraToCurrentSection();
      }
    },

    moveCameraToCurrentSection() {
      if (!this.camera || !this.controls) return;

      const target = this.cameraPositions[this.currentSection];
      if (!target) return;

      gsap.to(this.camera.position, {
        x: target.position.x,
        y: target.position.y,
        z: target.position.z,
        duration: 2,
        ease: "power2.out",
      });

      const lookAt = {
        x: this.controls.target.x,
        y: this.controls.target.y,
        z: this.controls.target.z,
      };

      gsap.to(lookAt, {
        x: target.target.x,
        y: target.target.y,
        z: target.target.z,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          this.controls?.target.set(lookAt.x, lookAt.y, lookAt.z);
          this.controls?.update();
        },
      });
    },
  },
});
