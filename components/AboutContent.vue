<template>
  <div class="section-container">
    <div
      class="flex flex-row w-full max-w-6xl mt-16 lg:mt-0 h-[85vh] lg:h-[80vh] glass rounded-2xl shadow-2xl overflow-hidden"
    >
      <!-- Sidebar (Desktop) -->
      <aside class="w-[280px] min-w-[280px] hidden md:flex flex-col items-center pt-8 pb-6 px-6 border-r border-surface-700/30">
        <!-- Profile Image -->
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src="/images/profile-pic.jpeg"
            alt="Thanigaivelen C"
            width="180"
            height="180"
            class="relative rounded-2xl shadow-xl object-cover border-2 border-surface-600/40"
            loading="lazy"
          />
        </div>

        <!-- Info Cards -->
        <div class="flex flex-col items-start w-full mt-6 gap-3">
          <h3 class="font-heading font-bold text-white text-lg">Thanigaivelen C</h3>
          <p class="text-surface-400 text-sm flex items-center gap-2">
            <Icon name="material-symbols:location-on-outline" class="text-accent/70" />
            Chennai, Tamil Nadu, India
          </p>

          <div class="w-full h-px bg-surface-700/40 my-2" />

          <a
            href="mailto:thanigaivelen2002@gmail.com"
            class="flex items-center gap-2 text-surface-300 text-sm hover:text-accent-light transition-colors w-full truncate"
            @click="handleLinkClick"
          >
            <Icon name="material-symbols:mail-outline" class="text-accent/70 flex-shrink-0" />
            thanigaivelen2002@gmail.com
          </a>

          <span class="flex items-center gap-2 text-surface-300 text-sm">
            <Icon name="material-symbols:call-outline" class="text-accent/70 flex-shrink-0" />
            +91 8220233038
          </span>

          <a
            href="https://www.linkedin.com/in/thanigaivelen-c-152666205"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-surface-300 text-sm hover:text-accent-light transition-colors"
            @click="handleLinkClick"
          >
            <Icon name="devicon:linkedin" class="flex-shrink-0" />
            LinkedIn Profile
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-y-auto px-4 md:px-8 pt-8 pb-6">
        <!-- Mobile Profile Header -->
        <div class="flex md:hidden items-center gap-4 mb-6">
          <div class="relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-xl blur-sm opacity-60" />
            <img
              src="/images/profile-pic.jpeg"
              alt="Thanigaivelen C"
              width="80"
              height="80"
              class="relative rounded-xl shadow-lg object-cover border border-surface-600/40"
              loading="lazy"
            />
          </div>
          <div>
            <h2 class="font-heading font-bold text-white text-xl">About Me</h2>
            <p class="text-surface-400 text-sm">Thanigaivelen C</p>
          </div>
        </div>

        <!-- Section Title (Desktop) -->
        <h2 class="hidden md:block text-3xl lg:text-5xl font-heading font-bold text-white mb-6">
          About <span class="text-gradient">Me</span>
        </h2>

        <!-- Bio -->
        <div class="glass-light rounded-xl p-4 md:p-6 mb-6">
          <p class="text-surface-200 text-sm md:text-base leading-relaxed font-body">
            A passionate software developer with hands-on experience in automation,
            front-end development, and creating user-friendly web applications using
            the MERN stack. Proficient in SQL, JavaScript, HTML, and CSS with expertise
            in designing RESTful APIs, integrating data sources, and building internal
            tools — dashboards, admin panels, and analytical applications via Retool
            and the web. Experienced in AI/ML integration, having built AI-powered
            platforms using LangChain and implemented machine learning solutions.
          </p>
        </div>

        <!-- Skills -->
        <div class="mb-6">
          <h3 class="font-heading font-semibold text-white text-lg mb-4 flex items-center gap-2">
            <Icon name="material-symbols:code" class="text-accent" />
            Technologies & Skills
          </h3>
          <div class="flex flex-col gap-3">
            <div v-for="group in skillGroups" :key="group.category">
              <p class="text-xs font-mono text-surface-500 uppercase tracking-wider mb-2">{{ group.category }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in group.skills" :key="skill" class="skill-tag">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div>
          <h3 class="font-heading font-semibold text-white text-lg mb-4 flex items-center gap-2">
            <Icon name="material-symbols:school-outline" class="text-accent" />
            Education
          </h3>
          <div class="glass-light rounded-xl p-4">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <div>
                <p class="font-heading font-semibold text-white">Bachelor of Technology</p>
                <p class="text-surface-300 text-sm">Government College of Technology, Coimbatore</p>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <span class="text-surface-400 font-mono">2020 - 2024</span>
                <span class="px-2 py-0.5 rounded-md bg-accent/10 text-accent-light text-xs font-medium">CGPA: 8.5</span>
              </div>
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

const skillGroups = [
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "PHP"],
  },
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "Vue.js", "Flutter", "Tailwind CSS"],
  },
  {
    category: "Backend & Database",
    skills: ["Node.js", "Express.js", "Django", "GraphQL", "RESTful APIs", "MongoDB", "PostgreSQL", "Prisma", "Firebase"],
  },
  {
    category: "AI/ML & Automation",
    skills: ["LangChain", "RAG", "AI Agents", "Machine Learning", "Workflow Automation", "CI/CD"],
  },
  {
    category: "Cloud & Tools",
    skills: ["AWS", "DevOps", "Git", "GitHub", "Retool", "Postman", "Stripe", "Chrome Extensions"],
  },
];
</script>
