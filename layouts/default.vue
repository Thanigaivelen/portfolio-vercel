<template>
  <div>
    <!-- Audio Elements -->
    <audio id="background-music" preload="auto" loop>
      <source src="/sounds/countryside.m4a" type="audio/mp4" />
    </audio>
    <audio id="click-sound" preload="auto">
      <source src="/sounds/click.wav" type="audio/wav" />
    </audio>

    <!-- Navigation -->
    <nav
      class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      :class="[
        scrolled
          ? 'bg-surface-950/80 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-surface-800/50'
          : 'bg-transparent'
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <button
            class="group flex items-center gap-2 cursor-pointer"
            @click="handleSectionClick(0)"
            aria-label="Go to home"
          >
            <span class="text-xl font-heading font-bold text-white group-hover:text-accent-light transition-colors duration-300">
              Thani
            </span>
            <span class="w-2 h-2 rounded-full bg-accent animate-glow" />
          </button>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-1">
            <button
              v-for="link in navLinks"
              :key="link.index"
              class="nav-link"
              :class="{ active: sceneStore.currentSection === link.index }"
              @click="handleSectionClick(link.index)"
            >
              {{ link.label }}
            </button>

            <!-- Divider -->
            <div class="w-px h-5 bg-surface-700 mx-2" />

            <!-- Day/Night Toggle -->
            <button
              class="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              :aria-label="isNightMode ? 'Switch to day mode' : 'Switch to night mode'"
              @click="toggleDayNight"
            >
              <Icon
                :name="isNightMode ? 'material-symbols:light-mode' : 'material-symbols:dark-mode'"
                class="text-lg"
              />
            </button>

            <!-- Sound Toggle -->
            <button
              class="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              :aria-label="soundStore.isMuted ? 'Unmute sound' : 'Mute sound'"
              @click="soundStore.toggleMute()"
            >
              <Icon
                :name="soundStore.isMuted ? 'material-symbols:volume-off' : 'material-symbols:volume-up'"
                class="text-lg"
              />
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <div class="flex items-center gap-2 md:hidden">
            <button
              class="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              :aria-label="soundStore.isMuted ? 'Unmute sound' : 'Mute sound'"
              @click="soundStore.toggleMute()"
            >
              <Icon
                :name="soundStore.isMuted ? 'material-symbols:volume-off' : 'material-symbols:volume-up'"
                class="text-lg"
              />
            </button>
            <button
              class="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              aria-label="Toggle menu"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <Icon
                :name="mobileMenuOpen ? 'material-symbols:close' : 'material-symbols:menu'"
                class="text-xl"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <div
          v-if="mobileMenuOpen"
          class="md:hidden bg-surface-950/95 backdrop-blur-xl border-t border-surface-800/50"
        >
          <div class="px-4 py-3 space-y-1">
            <button
              v-for="link in navLinks"
              :key="link.index"
              class="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300"
              :class="[
                sceneStore.currentSection === link.index
                  ? 'text-white bg-accent/10 border-l-2 border-accent'
                  : 'text-surface-400 hover:text-white hover:bg-white/5'
              ]"
              @click="handleSectionClick(link.index); mobileMenuOpen = false"
            >
              {{ link.label }}
            </button>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- Section indicator (desktop) -->
    <div class="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      <button
        v-for="link in navLinks"
        :key="link.index"
        class="group relative flex items-center"
        :aria-label="`Go to ${link.label}`"
        @click="handleSectionClick(link.index)"
      >
        <span
          class="absolute right-6 px-2 py-1 rounded text-xs font-medium text-surface-300 bg-surface-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
        >
          {{ link.label }}
        </span>
        <span
          class="w-2 h-2 rounded-full transition-all duration-500"
          :class="[
            sceneStore.currentSection === link.index
              ? 'bg-accent scale-150 shadow-[0_0_8px_rgba(217,119,6,0.5)]'
              : 'bg-surface-600 hover:bg-surface-400 scale-100'
          ]"
        />
      </button>
    </div>

    <!-- Main Content -->
    <div class="w-full h-screen">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const sceneStore = useSceneStore();
const soundStore = useSoundStore();
const { isNightMode, toggleDayNight } = useSceneInteraction();

const scrolled = ref(false);
const mobileMenuOpen = ref(false);

const navLinks = [
  { label: "Home", index: 0 },
  { label: "About", index: 1 },
  { label: "Experience", index: 2 },
  { label: "Projects", index: 3 },
  { label: "Contact", index: 4 },
];

const handleSectionClick = (index: number) => {
  soundStore.playClickSound();
  sceneStore.setSection(index);
};

onMounted(() => {
  // Background music on first interaction
  const startMusic = () => {
    soundStore.playBackgroundMusic();
    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
  };
  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("touchstart", startMusic, { once: true });

  // Navbar background on scroll (fallback, mainly for section changes)
  scrolled.value = true;
});
</script>

<style scoped>
.mobile-menu-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-menu-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
