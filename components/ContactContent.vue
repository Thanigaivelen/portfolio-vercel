<template>
  <div class="absolute w-full h-full flex flex-col justify-center items-center">
    <div
      class="flex flex-col w-[90%] md:w-[80%] xl:w-[60%] h-fit py-8 md:py-16 xl:py-24 px-6 md:px-16 xl:px-32 items-center justify-center shadow-lg shadow-black/30 backdrop-blur-md"
    >
      <div
        class="text-stone-800/70 text-2xl md:text-3xl xl:text-6xl font-serif font-bold"
      >
        Get in touch
      </div>
      <div class="text-stone-700/60 mt-6 text-sm md:text-lg">
        I'm always excited to make new connections, hear about new ideas, and
        explore potential opportunities, so please feel free to reach out to me
        at
      </div>
      <!-- Email + Copy Button -->
      <div class="flex items-center gap-2 mt-6 justify-center">
        <span class="text-stone-800/70">thanigaivelen2002@gmail.com</span>
        <button class="transition flex justify-center" @click="copyEmail">
          <Icon
            v-show="!isCopied"
            name="tabler:copy"
            class="text-stone-700/70 duration-300 transition-all text-xl hover:text-stone-800"
          />
          <Icon
            v-show="isCopied"
            name="tabler:copy-check"
            class="text-stone-700/70 duration-300 transition-all text-xl text-green-600"
          />
        </button>
      </div>
      <div class="flex flex-row gap-6 mt-8">
        <a
          href="mailto:thanigaivelen2002@gmail.com"
          class="bg-stone-700/70 hover:bg-stone-600/70 px-6 py-3 rounded-md transition duration-300 text-stone-100 font-medium"
        >
          Say Hello
        </a>
        <a
          href="https://drive.google.com/file/d/13H83KxM6Q6ssgZpJtFi58NRGpIcAMa6Z/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-stone-700/70 hover:bg-stone-600/70 px-6 py-3 rounded-md transition duration-300 text-stone-100 font-medium"
        >
          Get Resume
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isCopied = ref(false);

const copyEmail = () => {
  const email = "thanigaivelen2002@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 3000);
  });
};
</script>

<style></style>
