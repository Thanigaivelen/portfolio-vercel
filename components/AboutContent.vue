<template>
  <div
    ref="rootDiv"
    class="flex flex-row absolute left-0 w-full top-0 h-full justify-center items-center gap-12 duration-500 transition-all"
  >
    <div
      class="flex flex-row w-[100%] mt-[10vh] lg:mt-0 lg:w-[85%] lg:ml-12 h-full lg:h-4/5 items-start justify-center font-serif bg-stone-700/70 backdrop-blur-md rounded-lg shadow-xl"
    >
      <div
        class="w-1/3 h-full pt-8 hidden md:flex flex-col items-center justify-start"
      >
        <div class="relative">
          <div
            class="absolute -inset-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg blur opacity-75"
          ></div>
          <NuxtImg
            src="/images/profile-pic.png"
            alt="Thanigaivelen C"
            width="300"
            height="300"
            class="relative rounded-lg shadow-2xl object-cover border-4 border-stone-600/50"
            format="webp"
            placeholder
          />
        </div>
        <div class="flex flex-col items-start w-full mt-8 gap-4 px-4">
          <div class="font-bold text-stone-100 text-lg">
            Name: <span class="font-normal">Thanigaivelen C</span>
          </div>
          <div class="font-bold text-stone-100 text-sm">
            Location: <span class="font-normal">Chennai, TamilNadu, India</span>
          </div>
          <div class="flex flex-row items-center gap-3 mt-2">
            <Icon
              name="material-symbols:mail"
              class="text-stone-100/80 duration-300 transition-all text-2xl"
            />
            <a
              href="mailto:thanigaivelen2002@gmail.com"
              class="text-stone-200/90 hover:text-stone-100 text-sm transition-colors"
            >
              thanigaivelen2002@gmail.com
            </a>
          </div>
          <div class="flex flex-row items-center gap-3 mt-1">
            <Icon
              name="material-symbols:call"
              class="text-stone-100/80 duration-300 transition-all text-2xl"
            />
            <span class="text-stone-200/90 text-sm">8220233038</span>
          </div>
          <div class="flex flex-row flex-wrap items-center gap-3 mt-1">
            <Icon
              name="devicon:linkedin"
              class="duration-300 transition-all text-2xl text-stone-100/80 hover:text-blue-400"
            />
            <a
              href="https://www.linkedin.com/in/thanigaivelen-c-152666205"
              target="_blank"
              rel="noopener noreferrer"
              class="text-stone-200/90 hover:text-stone-100 text-sm transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
      <div
        class="w-full mx-4 md:w-2/3 h-full flex flex-col justify-start md:mx-6 pt-12 pb-10 overflow-y-auto"
      >
        <div
          class="text-2xl md:text-4xl xl:text-7xl font-bold mb-6 text-stone-300/90"
        >
          About Me
        </div>
        <div class="flex flex-row w-full justify-center mb-6">
          <div class="relative">
            <div
              class="absolute -inset-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg blur opacity-75"
            ></div>
            <NuxtImg
              src="/images/profile-pic.jpeg"
              alt="Thanigaivelen C"
              width="200"
              height="200"
              class="relative rounded-lg shadow-2xl md:hidden object-cover border-4 border-stone-600/50"
              format="webp"
              placeholder
            />
          </div>
        </div>
        <div
          class="md:ml-4 mt-2 text-stone-200/80 text-start text-sm md:text-base lg:text-lg leading-relaxed bg-stone-900/30 rounded-lg p-4 md:p-6"
        >
          A passionate software developer with hands-on experience in automation,
          front-end development, and creating user-friendly web applications using
          MERN stack. Proficient in SQL, JavaScript, HTML, and CSS with expertise in
          designing and implementing RESTful APIs, integrating various data sources,
          and building internal tools such as dashboards, admin panels via both
          Retool and Web, and analytical applications. Experienced in AI/ML
          integration, having built AI-powered platforms using langchain and
          implemented machine learning solutions.
        </div>
        <div
          class="w-full h-full bg-gradient-to-br from-stone-900/50 to-stone-800/30 mt-6 flex flex-col gap-5 justify-start items-start rounded-lg p-4 md:p-6 border border-stone-600/30"
        >
          <div
            class="my-2 mx-2 md:mx-4 w-full flex justify-start items-start flex-col"
          >
            <div class="font-bold text-stone-200 text-lg md:text-xl mb-3 flex items-center gap-2">
              <Icon name="material-symbols:code" class="text-yellow-500/80" />
              Technologies & Skills
            </div>
            <div class="flex flex-col items-start w-full">
              <div
                class="flex flex-wrap gap-2 lg:gap-3 font-semibold font-sans text-xs md:text-sm lg:text-base ml-2 text-stone-300"
              >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >DevOps</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Django</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Next.js</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >ReactJS</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Firebase</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Flutter</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Git</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Github</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Java</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Stripe</span
                >
              </div>
              <div
                class="flex flex-wrap gap-2 lg:gap-3 font-semibold font-sans text-xs md:text-sm lg:text-base ml-2 text-stone-300 mt-2"
              >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Langchain</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Extension</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Agents</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Machine Learning</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Retool</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >PHP</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Postman</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >SQL</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >JavaScript</span
                >
              </div>
              <div
                class="flex flex-wrap gap-2 lg:gap-3 font-semibold font-sans text-xs md:text-sm lg:text-base ml-2 text-stone-300 mt-2"
              >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >AWS</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Prisma</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Postgres</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >MongoDB</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Python</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >ExpressJs</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >GraphQL</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >RESTful</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >Workflow automation</span
                >
              </div>
              <div
                class="flex flex-wrap gap-2 lg:gap-3 font-semibold font-sans text-xs md:text-sm lg:text-base ml-2 text-stone-300 mt-2"
              >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >CI/CD</span
                >
                <span
                  class="bg-stone-700/50 px-3 py-1.5 rounded-md hover:bg-stone-600/50 transition-colors"
                  >RAG</span
                >
              </div>
            </div>
          </div>
          <div
            class="my-2 mx-2 md:mx-4 w-full flex justify-start items-start flex-col border-t border-stone-600/30 pt-4"
          >
            <div class="font-bold text-stone-200 text-lg md:text-xl mb-3 flex items-center gap-2">
              <Icon name="material-symbols:school" class="text-yellow-500/80" />
              Education
            </div>
            <div class="ml-2 text-stone-300 text-sm md:text-base lg:text-lg">
              <div class="font-semibold text-stone-200 mb-1">
                Bachelors in Technology
              </div>
              <div class="text-stone-300/80">
                Government College Of Technology, Coimbatore, India
              </div>
              <div class="text-stone-400/70 text-sm mt-1">
                06/2020 - 05/2024 • CGPA: 8.5
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="lg:flex flex-col hidden lg:w-[15%] h-4/5 items-start justify-start"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const rootDiv = ref<HTMLElement | null>(null);

onMounted(() => {
  if (rootDiv.value) {
    // Animation logic can be added here if needed
  }
});
</script>

<style></style>
