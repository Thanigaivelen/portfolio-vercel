<template>
  <div class="section-container">
    <div
      class="flex flex-col w-full max-w-5xl mt-16 lg:mt-0 h-[85vh] lg:h-[80vh] glass rounded-2xl shadow-2xl overflow-hidden"
    >
      <div class="flex-1 overflow-y-auto px-4 md:px-8 lg:px-10 pt-8 pb-6">
        <!-- Section Title -->
        <h2 class="text-3xl md:text-5xl font-heading font-bold text-white mb-2">
          Work <span class="text-gradient">Experience</span>
        </h2>
        <p class="text-surface-400 text-sm font-body mb-8">
          {{ totalYears }}+ years of building software that matters
        </p>

        <!-- Timeline -->
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-[18px] md:left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-surface-800/20" />

          <!-- Experience Cards -->
          <div class="flex flex-col gap-8">
            <div
              v-for="(exp, index) in experiences"
              :key="index"
              class="relative flex gap-4 md:gap-6"
            >
              <!-- Timeline Dot -->
              <div class="flex flex-col items-center flex-shrink-0 pt-1">
                <div
                  class="w-[10px] h-[10px] md:w-3 md:h-3 rounded-full border-2 z-10"
                  :class="[
                    index === 0
                      ? 'bg-accent border-accent shadow-[0_0_8px_rgba(217,119,6,0.5)]'
                      : 'bg-surface-800 border-surface-600'
                  ]"
                />
              </div>

              <!-- Card -->
              <div class="flex-1 glass-light rounded-xl p-4 md:p-6 hover:border-accent/20 transition-all duration-300 group">
                <!-- Header -->
                <div class="flex flex-col md:flex-row md:items-start gap-3 md:gap-4 mb-3">
                  <!-- Company Logo -->
                  <div class="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/90 p-2 flex items-center justify-center flex-shrink-0 shadow-md">
                    <img
                      :src="exp.logo"
                      :alt="`${exp.company} Logo`"
                      class="w-full h-full object-contain"
                    />
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                      <div>
                        <h3 class="text-base md:text-lg font-heading font-bold text-white leading-tight">
                          {{ exp.role }}
                        </h3>
                        <p class="text-accent-light text-sm font-medium">{{ exp.company }}</p>
                      </div>
                      <div class="flex flex-wrap items-center gap-2 text-xs flex-shrink-0">
                        <span class="px-2.5 py-1 rounded-md bg-surface-800/80 text-surface-300 font-mono whitespace-nowrap">
                          {{ exp.duration }}
                        </span>
                        <span class="text-surface-500 hidden md:inline">
                          {{ exp.location }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Descriptions -->
                <ul class="space-y-2 mt-3">
                  <li
                    v-for="(point, pIndex) in exp.points"
                    :key="pIndex"
                    class="flex items-start gap-2.5 text-surface-300 text-sm leading-relaxed"
                  >
                    <Icon
                      name="material-symbols:arrow-right-alt"
                      class="text-accent/60 flex-shrink-0 mt-0.5 text-sm"
                    />
                    <span>{{ point }}</span>
                  </li>
                </ul>

                <!-- Tech Tags -->
                <div v-if="exp.tech" class="flex flex-wrap gap-1.5 mt-4">
                  <span
                    v-for="tech in exp.tech"
                    :key="tech"
                    class="px-2 py-0.5 rounded text-xs font-mono text-surface-400 bg-surface-800/50"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  logo: string;
  points: string[];
  tech?: string[];
}

const totalYears = computed(() => {
  const start = new Date(2022, 3); // April 2022
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
});

const experiences: Experience[] = [
  {
    role: "Software / Retool Developer Engineer",
    company: "Toolpioneers",
    duration: "May 2024 — Present",
    location: "Hyderabad, India",
    logo: "https://static.wixstatic.com/media/cc867e_1dfa4e3201be415693fd297f0b183cc0~mv2.png",
    points: [
      "Developed scalable backend services with RESTful APIs and cloud infrastructure, improving application reliability and deployment velocity.",
      "Deployed custom AI modules using LangChain and cloud technologies to extend application functionality.",
      "Enhanced Chrome extension capabilities through seamless integration with backend services using Node.js.",
      "Leveraged AWS to deploy, monitor, and scale high-availability applications for fluctuating workloads.",
      "Built internal dashboards, admin panels, and analytical tools using Retool/Sigma, streamlining business operations.",
      "Implemented workflows and automations within Retool, reducing manual effort across IT departments.",
    ],
    tech: ["Node.js", "AWS", "LangChain", "Retool", "REST APIs", "Chrome Extensions"],
  },
  {
    role: "Automation Developer (Intern)",
    company: "HyperVerge",
    duration: "Sep 2023 — Mar 2025",
    location: "Bangalore, India",
    logo: "https://cdn.hyperverge.co/wp-content/uploads/2025/06/hyperverge-logo.webp",
    points: [
      "Created automation tools using Apps Script within CI/CD pipeline workflows.",
      "Streamlined deployment processes by integrating automated testing scripts, enabling faster release cycles and greater build consistency.",
    ],
    tech: ["Apps Script", "CI/CD", "Automated Testing"],
  },
  {
    role: "Front-end Developer",
    company: "Kaay Labs Private Limited",
    duration: "Apr 2022 — Jul 2022",
    location: "Chennai, India",
    logo: "/images/kaay_labs.jpeg",
    points: [
      "Built user-facing features with React.js, ensuring seamless integration with backend APIs and enhancing the interactive experience.",
      "Modularized the React.js codebase, significantly improving code reusability and maintainability across ongoing projects.",
    ],
    tech: ["React.js", "JavaScript", "REST APIs"],
  },
];
</script>
