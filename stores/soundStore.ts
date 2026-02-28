import { defineStore } from "pinia";

export const useSoundStore = defineStore("sound", {
  state: () => ({
    isMuted: false,
    backgroundVolume: 0.3,
    clickVolume: 0.5,
  }),

  actions: {
    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        this.pauseBackgroundMusic();
      } else {
        this.playBackgroundMusic();
      }
    },

    playBackgroundMusic() {
      if (typeof window === "undefined") return;

      const bgMusic = document.getElementById("background-music") as HTMLAudioElement | null;
      if (bgMusic && !this.isMuted) {
        bgMusic.volume = this.backgroundVolume;
        bgMusic.loop = true;
        bgMusic.play().catch(() => {
          // Silently handle autoplay restrictions
        });
      }
    },

    pauseBackgroundMusic() {
      if (typeof window === "undefined") return;

      const bgMusic = document.getElementById("background-music") as HTMLAudioElement | null;
      if (bgMusic) {
        bgMusic.pause();
      }
    },

    playClickSound() {
      if (this.isMuted || typeof window === "undefined") return;

      const clickSound = document.getElementById("click-sound") as HTMLAudioElement | null;
      if (clickSound) {
        clickSound.volume = this.clickVolume;
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {
          this.playFallbackClickSound();
        });
      } else {
        this.playFallbackClickSound();
      }
    },

    playFallbackClickSound() {
      if (typeof window === "undefined") return;

      try {
        const AudioCtx =
          window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;

        const audioContext = new AudioCtx();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch {
        // Silently fail if Web Audio API is not supported
      }
    },
  },
});
