<template>
  <div class="section-container">
    <div class="flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
      <!-- Glass Card -->
      <div class="glass rounded-2xl px-8 py-12 md:px-16 md:py-16 w-full shadow-2xl">
        <!-- Heading -->
        <p class="text-sm font-mono text-accent-light tracking-wider uppercase mb-3">
          What's next?
        </p>
        <h2 class="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          Get In <span class="text-gradient">Touch</span>
        </h2>
        <p class="text-surface-400 text-sm md:text-base font-body leading-relaxed max-w-md mx-auto mb-8">
          I'm always excited to connect, hear about new ideas, and explore
          potential opportunities. Feel free to reach out — let's build something great together.
        </p>

        <!-- Email with Copy -->
        <div class="inline-flex items-center gap-3 px-4 py-3 rounded-xl glass-light mb-8">
          <Icon name="material-symbols:mail-outline" class="text-accent text-lg flex-shrink-0" />
          <span class="text-surface-200 text-sm md:text-base font-mono">
            thanigaivelen2002@gmail.com
          </span>
          <button
            class="p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-300"
            :aria-label="isCopied ? 'Email copied' : 'Copy email'"
            @click="copyEmail"
          >
            <Icon
              :name="isCopied ? 'material-symbols:check-circle' : 'tabler:copy'"
              class="text-lg transition-colors duration-300"
              :class="isCopied ? 'text-green-400' : 'text-surface-400 hover:text-white'"
            />
          </button>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="mailto:thanigaivelen2002@gmail.com"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/30"
            @click="handleButtonClick"
          >
            <Icon name="material-symbols:send" class="text-base" />
            Say Hello
          </a>
          <a
            href="https://drive.google.com/file/d/13H83KxM6Q6ssgZpJtFi58NRGpIcAMa6Z/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-light text-surface-200 font-medium text-sm hover:text-white hover:border-accent/30 transition-all duration-300"
            @click="handleButtonClick"
          >
            <Icon name="material-symbols:download" class="text-base" />
            Get Resume
          </a>
        </div>

        <!-- Social Links -->
        <div class="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-surface-700/30">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            :target="social.external ? '_blank' : undefined"
            :rel="social.external ? 'noopener noreferrer' : undefined"
            :aria-label="social.name"
            class="flex items-center justify-center w-10 h-10 rounded-xl text-surface-400 hover:text-accent-light hover:bg-accent-glow transition-all duration-300"
            @click="handleButtonClick"
          >
            <Icon :name="social.icon" class="text-xl" />
          </a>
        </div>
      </div>

      <!-- Footer -->
      <p class="mt-6 text-surface-600 text-xs font-mono">
        Designed & Built by Thanigaivelen C
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isCopied = ref(false);
const soundStore = useSoundStore();

const socialLinks = [
  { name: "GitHub", icon: "uil:github", url: "https://github.com/Thanigaivelen", external: true },
  { name: "LinkedIn", icon: "simple-icons:linkedin", url: "https://www.linkedin.com/in/thanigaivelen-c-152666205", external: true },
  { name: "Email", icon: "material-symbols:mail", url: "mailto:thanigaivelen2002@gmail.com", external: false },
];

const copyEmail = () => {
  soundStore.playClickSound();
  navigator.clipboard.writeText("thanigaivelen2002@gmail.com").then(() => {
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 3000);
  });
};

const handleButtonClick = () => {
  soundStore.playClickSound();
};
</script>
