<template>
  <div>
    <!-- Audio Elements -->
    <audio
      id="background-music"
      preload="auto"
      loop
    >
      <source src="/sounds/countryside.m4a" type="audio/mp4" />
    </audio>
    <audio id="click-sound" preload="auto">
      <source src="/sounds/click.wav" type="audio/wav" />
    </audio>

    <!-- Fixed Navbar -->
    <nav
      class="fixed top-0 left-0 w-full bg-black bg-opacity-70 text-white shadow-md backdrop-blur-md z-50"
    >
      <div
        class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center"
      >
        <div
          class="text-2xl hover:cursor-pointer font-semibold font-serif hidden md:block"
          @click="handleSectionClick(0)"
        >
          Thani
        </div>
        <ul class="flex gap-6 text-sm font-medium items-center">
          <li>
            <div
              class="hover:text-gray-300 transition hover:cursor-pointer"
              @click="handleSectionClick(0)"
            >
              Home
            </div>
          </li>
          <li>
            <div
              class="hover:text-gray-300 transition hover:cursor-pointer"
              @click="handleSectionClick(1)"
            >
              About
            </div>
          </li>
          <li>
            <div
              class="hover:text-gray-300 transition hover:cursor-pointer"
              @click="handleSectionClick(2)"
            >
              Experience
            </div>
          </li>
          <li>
            <div
              class="hover:text-gray-300 transition hover:cursor-pointer"
              @click="handleSectionClick(3)"
            >
              Project
            </div>
          </li>
          <li>
            <div
              class="hover:text-gray-300 transition hover:cursor-pointer"
              @click="handleSectionClick(4)"
            >
              Contact
            </div>
          </li>

          <!-- Sound Toggle Button -->
          <li class="ml-4">
            <button
              @click="soundStore.toggleMute()"
              class="hover:text-gray-300 transition hover:cursor-pointer flex items-center justify-center p-2 rounded-md hover:bg-white/10"
              :title="soundStore.isMuted ? 'Unmute' : 'Mute'"
            >
              <Icon
                :name="
                  soundStore.isMuted
                    ? 'material-symbols:volume-off'
                    : 'material-symbols:volume-up'
                "
                class="text-xl"
              />
            </button>
          </li>

          <div
            class="flex flex-row items-center animate-pulse gap-1 text-xs font-mono font-bold text-stone-300/80"
          >
            <Icon
              name="material-symbols:line-start-arrow-notch-rounded"
              class="duration-300 transition-all text-xl"
            />Explore section
          </div>
        </ul>
      </div>
    </nav>

    <!-- Push content down below the navbar -->
    <div class="w-full h-[90vh]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const sceneStore = useSceneStore();
const soundStore = useSoundStore();

const handleSectionClick = (index: number) => {
  soundStore.playClickSound();
  sceneStore.setSection(index);
};

onMounted(() => {
  // Start background music after user interaction
  const startMusic = () => {
    soundStore.playBackgroundMusic();
    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
  };

  // Wait for user interaction before playing music (browser autoplay policy)
  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("touchstart", startMusic, { once: true });
});
</script>

<style></style>

