import { defineStore } from "pinia";

export const useSoundStore = defineStore("sound", {
  state: () => ({
    isMuted: false,
    backgroundVolume: 0.3, // 30% volume for background music
    clickVolume: 0.5, // 50% volume for click sounds
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
      
      const bgMusic = document.getElementById(
        "background-music"
      ) as HTMLAudioElement;
      if (bgMusic) {
        bgMusic.volume = this.backgroundVolume;
        bgMusic.loop = true;
        if (!this.isMuted) {
          bgMusic.play().catch((error) => {
            // Silently handle autoplay restrictions
            console.log("Autoplay prevented:", error);
          });
        }
      }
    },

    pauseBackgroundMusic() {
      if (typeof window === "undefined") return;
      
      const bgMusic = document.getElementById(
        "background-music"
      ) as HTMLAudioElement;
      if (bgMusic) {
        bgMusic.pause();
      }
    },

    playClickSound() {
      if (this.isMuted || typeof window === "undefined") return;

      const clickSound = document.getElementById(
        "click-sound"
      ) as HTMLAudioElement;
      if (clickSound) {
        clickSound.volume = this.clickVolume;
        clickSound.currentTime = 0; // Reset to start
        clickSound.play().catch((error) => {
          // Fallback: Generate a simple beep sound if file doesn't exist
          this.playFallbackClickSound();
        });
      } else {
        // Fallback if audio element doesn't exist
        this.playFallbackClickSound();
      }
    },

    playFallbackClickSound() {
      // Generate a simple click sound using Web Audio API as fallback
      if (typeof window === "undefined") return;
      
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (error) {
        // Silently fail if Web Audio API is not supported
      }
    },
  },
});
