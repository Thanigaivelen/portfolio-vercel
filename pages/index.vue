<script setup lang="ts">
import { useSceneStore } from "~/stores/sceneStore";

const store = useSceneStore();

const sections = [
  { name: "HelloContent", index: 0 },
  { name: "AboutContent", index: 1 },
  { name: "ExperienceContent", index: 2 },
  { name: "ProjectContent", index: 3 },
  { name: "ContactContent", index: 4 },
];

const components: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  HelloContent: defineAsyncComponent(
    () => import("~/components/HelloContent.vue")
  ),
  AboutContent: defineAsyncComponent(
    () => import("~/components/AboutContent.vue")
  ),
  ExperienceContent: defineAsyncComponent(
    () => import("~/components/ExperienceContent.vue")
  ),
  ProjectContent: defineAsyncComponent(
    () => import("~/components/ProjectContent.vue")
  ),
  ContactContent: defineAsyncComponent(
    () => import("~/components/ContactContent.vue")
  ),
};
</script>

<template>
  <div>
    <div class="absolute top-0 left-0 w-full h-screen text-center z-40 text-white">
      <Transition name="section" mode="out-in">
        <component
          :is="components[sections[store.currentSection].name]"
          :key="store.currentSection"
        />
      </Transition>
    </div>
    <ThreeScene />
  </div>
</template>

<style scoped>
.section-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.section-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.section-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.section-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
