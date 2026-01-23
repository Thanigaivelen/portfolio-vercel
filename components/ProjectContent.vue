<template>
  <div
    ref="rootDiv"
    class="flex flex-row absolute left-0 w-full top-0 h-full justify-center items-center duration-500 transition-all"
  >
    <div class="flex flex-col flex-1 h-4/5 items-start justify-start">
      <!-- <img
        src="/images/mingming.png"
        class="mt-8 border-white shadow-xl shadow-black/50 rounded-full"
        alt="MingPV"
        width="300"
        height="300"
        sizes="(max-width: 400px) 100vw, 400px"
        loading="lazy"
        placeholder="blur"
      /> -->
    </div>
    <div
      class="flex flex-col w-[100%] xl:w-[60%] pt-[10vh] xl:pt-0 h-full xl:mt-0 xl:h-4/5 items-center font-serif bg-stone-700/70 backdrop-blur-md rounded-md pb-6"
    >
      <div
        class="w-full my-8 font-serif text-xl md:text-3xl text-stone-200/80 font-bold"
      >
        My Projects
      </div>
      <div
        class="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4 px-4 overflow-y-scroll"
      >
        <div
          class="bg-stone-900/40 flex flex-col gap-2 items-start rounded-md pb-4 px-2 pt-2"
        >
          <div class="flex w-full justify-center mt-2">
            <NuxtImg
              src="/images/heypascal.png"
              width="400"
              height="200"
              class="shadow-lg rounded-md"
              format="webp"
              placeholder
            />
          </div>
          <div class="ml-8 my-2 text-stone-100/80 font-semibold">
            Cos-theta - Project Management Platform
          </div>
          <div class="ml-4 mr-1 text-stone-100 text-start text-md">
            Engineered an intuitive project management solution enabling seamless collaboration through integrated chat features, dynamic project pages, and customizable sprint boards to enhance workflow visualization and team productivity. Built-in chat interface for each project node with file attachments and real-time collaboration. Visualize your workflow with customizable sprint boards to create, assign, and track tasks efficiently.
          </div>
          <div class="flex w-full h-full justify-end items-end">
            <a
              class="flex flex-row justify-end items-center gap-1 pr-4 py-2 underline underline-offset-4 text-sm font-sans hover:text-white/60"
              href="https://rougeone.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Site
              <Icon
                name="material-symbols:arrow-right-alt"
                class="duration-300 transition-all text-xl text-stone-200"
              />
            </a>
          </div>
        </div>
        <div
          class="bg-stone-900/40 flex flex-col gap-2 items-start rounded-md pb-4 px-2 pt-2"
        >
          <div class="flex w-full justify-center mt-2">
            <NuxtImg
              src="/images/cos-theta.png"
              width="400"
              height="200"
              class="shadow-lg rounded-md"
              format="webp"
              placeholder
            />
          </div>
          <div class="ml-8 my-2 text-stone-100/80 font-semibold">
            heypascal - AI-Powered EdTech Platform
          </div>
          <div class="ml-4 mr-1 text-stone-100 text-start text-md">
            Built an AI-powered EdTech platform serving teachers, students, and parents, enabling rapid lesson planning, intelligent student tutoring, and parental engagement tools. Developed educator toolkit for generating lessons, worksheets, rubrics, and assessments in under a minute with integrated Google Workspace export. Implemented student learning mode with AI tutoring providing step-by-step explanations, guided practice, and built-in safety guardrails for responsible AI usage.
          </div>
          <div class="flex w-full h-full justify-end items-end">
            <a
              class="flex flex-row justify-end items-center gap-1 pr-4 py-2 underline underline-offset-4 text-sm font-sans hover:text-white/60"
              href="https://heypascal.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Site
              <Icon
                name="material-symbols:arrow-right-alt"
                class="duration-300 transition-all text-xl text-stone-200"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="xl:flex flex-col hidden w-[5%] h-4/5 justify-center items-center"
    >
      <Icon
        name="hugeicons:vertical-scroll-point"
        class="duration-300 transition-all text-4xl text-stone-700/70 animate-pulse"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const rootDiv = ref<HTMLElement | null>(null);

onMounted(() => {});
</script>

<style></style>
