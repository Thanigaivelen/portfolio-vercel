<template>
  <div class="section-container">
    <div class="flex flex-col items-start justify-center w-full max-w-4xl ml-4 md:ml-10 lg:ml-20">
      <!-- Greeting tag -->
      <div
        class="opacity-0 animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-sm font-mono text-surface-300 mb-6"
      >
        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Available for opportunities
      </div>

      <!-- Name & Title -->
      <h1
        class="opacity-0 animate-fade-in-up delay-100 text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight"
      >
        Hi, I'm
        <span class="text-gradient">Thani</span>
      </h1>

      <p
        class="opacity-0 animate-fade-in-up delay-200 mt-4 text-lg md:text-xl lg:text-2xl text-surface-300 font-body max-w-2xl"
      >
        <span ref="typedText" class="typed-text" />
        <span class="animate-typing-cursor text-accent">|</span>
      </p>

      <!-- Description (desktop) -->
      <p
        class="opacity-0 animate-fade-in-up delay-300 hidden md:block mt-4 text-base text-surface-400 font-body max-w-xl leading-relaxed"
      >
        Building scalable web applications, AI-powered platforms, and
        automation tools that make a difference.
      </p>

      <!-- Description (mobile) -->
      <p
        class="opacity-0 animate-fade-in-up delay-300 md:hidden mt-3 text-sm text-surface-400 font-body max-w-xs leading-relaxed"
      >
        Explore my portfolio by navigating through the menu above.
      </p>

      <!-- Social Links -->
      <div class="opacity-0 animate-fade-in-up delay-500 flex items-center gap-4 mt-8">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          :target="social.external ? '_blank' : undefined"
          :rel="social.external ? 'noopener noreferrer' : undefined"
          :aria-label="social.name"
          class="group flex items-center justify-center w-10 h-10 rounded-xl glass-light text-surface-400 hover:text-accent-light hover:border-accent/30 transition-all duration-300"
          @click="handleLinkClick"
        >
          <Icon :name="social.icon" class="text-xl group-hover:scale-110 transition-transform duration-300" />
        </a>

        <!-- Resume CTA -->
        <a
          href="https://drive.google.com/file/d/13H83KxM6Q6ssgZpJtFi58NRGpIcAMa6Z/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent-light text-sm font-medium hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
          @click="handleLinkClick"
        >
          <Icon name="material-symbols:download" class="text-base" />
          Resume
        </a>
      </div>

      <!-- Scroll hint -->
      <div class="opacity-0 animate-fade-in-up delay-700 hidden md:flex items-center gap-2 mt-12 text-surface-500 text-xs font-mono">
        <Icon name="material-symbols:mouse-outline" class="text-base animate-float" />
        Use navigation to explore
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const soundStore = useSoundStore();
const typedText = ref<HTMLElement | null>(null);

const socialLinks = [
  { name: "GitHub", icon: "uil:github", url: "https://github.com/Thanigaivelen", external: true },
  { name: "LinkedIn", icon: "simple-icons:linkedin", url: "https://www.linkedin.com/in/thanigaivelen-c-152666205", external: true },
  { name: "Email", icon: "material-symbols:mail", url: "mailto:thanigaivelen2002@gmail.com", external: false },
];

const titles = [
  "Full-Stack Developer",
  "AI/ML Enthusiast",
  "Automation Engineer",
  "Cloud & DevOps",
];

const handleLinkClick = () => {
  soundStore.playClickSound();
};

let typeTimeout: ReturnType<typeof setTimeout>;

onMounted(() => {
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    if (!typedText.value) return;

    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typedText.value.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedText.value.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentTitle.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      speed = 400;
    }

    typeTimeout = setTimeout(type, speed);
  };

  type();
});

onBeforeUnmount(() => {
  clearTimeout(typeTimeout);
});
</script>

<style scoped>
.typed-text {
  color: theme("colors.surface.200");
}
</style>
