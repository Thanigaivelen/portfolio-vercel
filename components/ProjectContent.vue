<template>
  <div class="section-container">
    <div
      class="flex flex-col w-full max-w-5xl mt-16 lg:mt-0 h-[85vh] lg:h-[80vh] glass rounded-2xl shadow-2xl overflow-hidden"
    >
      <div class="flex-1 overflow-y-auto px-4 md:px-8 lg:px-10 pt-8 pb-6">
        <!-- Section Title -->
        <h2 class="text-3xl md:text-5xl font-heading font-bold text-white mb-2">
          Featured <span class="text-gradient">Projects</span>
        </h2>
        <p class="text-surface-400 text-sm font-body mb-8">
          Things I've built that I'm proud of
        </p>

        <!-- Project Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            v-for="(project, index) in projects"
            :key="index"
            class="group glass-light rounded-xl overflow-hidden hover:border-accent/20 transition-all duration-500"
          >
            <!-- Image -->
            <div class="relative overflow-hidden h-40 md:h-48">
              <NuxtImg
                :src="project.image"
                :alt="project.title"
                width="600"
                height="300"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                format="webp"
                placeholder
              />
              <!-- Overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-surface-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              <!-- Badge -->
              <div class="absolute top-3 left-3">
                <span class="px-2.5 py-1 rounded-lg bg-surface-950/60 backdrop-blur-sm text-xs font-mono text-surface-300 border border-surface-700/30">
                  {{ project.tag }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-4 md:p-5">
              <h3 class="font-heading font-bold text-white text-base md:text-lg mb-1 group-hover:text-accent-light transition-colors duration-300">
                {{ project.title }}
              </h3>
              <p class="text-surface-400 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                {{ project.description }}
              </p>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="px-2 py-0.5 rounded text-xs font-mono text-surface-400 bg-surface-800/50"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Link -->
              <a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent hover-underline transition-colors duration-300"
                @click="handleLinkClick"
              >
                Visit Project
                <Icon name="material-symbols:arrow-outward" class="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const soundStore = useSoundStore();

const handleLinkClick = () => {
  soundStore.playClickSound();
};

interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
  tag: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: "Cos-theta — Project Management Platform",
    description:
      "Engineered an intuitive project management solution with integrated chat, dynamic project pages, file attachments, and customizable sprint boards for enhanced workflow visualization and team productivity.",
    image: "/images/cos-theta.png",
    url: "https://rougeone.dev/",
    tag: "SaaS Platform",
    tech: ["React", "Node.js", "MongoDB", "WebSockets", "Sprint Boards"],
  },
  {
    title: "HeyPascal — AI-Powered EdTech",
    description:
      "Built an AI-powered EdTech platform serving teachers, students, and parents. Enables rapid lesson planning, intelligent tutoring with step-by-step explanations, and parental engagement tools with safety guardrails.",
    image: "/images/heypascal.png",
    url: "https://heypascal.ai",
    tag: "AI / EdTech",
    tech: ["Next.js", "LangChain", "AI Agents", "Google Workspace", "Stripe"],
  },
];
</script>
