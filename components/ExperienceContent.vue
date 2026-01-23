<template>
  <div
    ref="rootDiv"
    class="flex flex-row absolute left-0 w-full top-0 h-full justify-center items-center gap-12 duration-500 transition-all"
  >
    <div
      class="flex flex-col w-[90%] md:w-[80%] ml-4 md:ml-12 h-full md:h-4/5 items-start justify-start font-serif bg-stone-700/70 backdrop-blur-md rounded-md overflow-y-auto"
    >
      <div class="w-full pt-8 pb-6 px-6">
        <div
          class="text-3xl md:text-5xl xl:text-7xl font-bold mb-8 text-stone-300/90"
        >
          Work Experience
        </div>
        <div class="flex flex-col gap-8 w-full">
          <!-- Toolpioneers -->
          <div
            class="bg-gradient-to-br from-stone-900/60 to-stone-800/40 flex flex-col md:flex-row gap-6 items-start rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-600/30"
          >
            <div class="flex-shrink-0">
              <div class="w-28 h-28 bg-white rounded-lg p-3 flex items-center justify-center shadow-md">
                <img
                  src="https://static.wixstatic.com/media/cc867e_1dfa4e3201be415693fd297f0b183cc0~mv2.png"
                  alt="Toolpioneers Logo"
                  class="w-full h-full object-contain"
                  onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ccc%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2214%22%3EToolpioneers%3C/text%3E%3C/svg%3E'"
                />
              </div>
            </div>
            <div class="flex-1">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold text-stone-100 mb-1">
                    Software/Retool Developer Engineer
                  </h3>
                  <h4 class="text-lg md:text-xl text-stone-200/90 font-semibold">
                    Toolpioneers
                  </h4>
                </div>
                <div class="flex flex-col items-start md:items-end">
                  <div class="text-stone-300/80 text-sm md:text-base font-medium bg-stone-800/50 px-3 py-1 rounded-md">
                    May 2024 - Present
                  </div>
                  <div class="text-stone-400/70 text-xs md:text-sm mt-1">
                    Hyderabad, India
                  </div>
                </div>
              </div>
              <ul class="list-none space-y-3 text-stone-200/80 text-sm md:text-base">
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Developed scalable backend services by integrating RESTful APIs
                    and leveraging cloud infrastructure, strengthening application
                    reliability and deployment velocity.
                  </span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Utilized langchain and cloud technologies to extend application
                    functionality through deployment of custom AI modules.
                  </span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Enhanced Chrome extension capabilities through seamless
                    integration with cloud infrastructure and backend services
                    utilizing NodeJS.
                  </span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Leveraged AWS cloud services to deploy, monitor, and scale
                    high-availability applications, ensuring seamless system
                    performance and rapid response to fluctuating workloads.
                  </span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Designed and developed internal tools including dashboards,
                    admin panels, and analytical applications using Retool/Sigma,
                    streamlining business operations and improving data
                    accessibility for stakeholders.
                  </span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Implemented workflows, automations, and data validations within
                    Retool to optimize business processes, reducing manual effort
                    and improving operational efficiency across IT departments.
                  </span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Collaborated with cross-functional teams to gather
                    requirements, refine specifications, and deliver customized
                    internal tooling solutions that enhance productivity and
                    decision-making capabilities.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <!-- HyperVerge -->
          <div
            class="bg-gradient-to-br from-stone-900/60 to-stone-800/40 flex flex-col md:flex-row gap-6 items-start rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-600/30"
          >
            <div class="flex-shrink-0">
              <div class="w-28 h-28 bg-white rounded-lg p-3 flex items-center justify-center shadow-md">
                <img
                  src="https://cdn.hyperverge.co/wp-content/uploads/2025/06/hyperverge-logo.webp"
                  alt="HyperVerge Logo"
                  class="w-full h-full object-contain"
                  onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ccc%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2214%22%3EHyperVerge%3C/text%3E%3C/svg%3E'"
                />
              </div>
            </div>
            <div class="flex-1">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold text-stone-100 mb-1">
                    Automation Developer (Intern)
                  </h3>
                  <h4 class="text-lg md:text-xl text-stone-200/90 font-semibold">
                    HyperVerge
                  </h4>
                </div>
                <div class="flex flex-col items-start md:items-end">
                  <div class="text-stone-300/80 text-sm md:text-base font-medium bg-stone-800/50 px-3 py-1 rounded-md">
                    September 2023 - March 2025
                  </div>
                  <div class="text-stone-400/70 text-xs md:text-sm mt-1">
                    Bangalore, India
                  </div>
                </div>
              </div>
              <ul class="list-none space-y-3 text-stone-200/80 text-sm md:text-base">
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Created tools for Automation using Apps Script in a CI/CD
                    pipeline workflow.
                  </span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Streamlined deployment processes by integrating automated
                    testing scripts within the CI/CD pipeline, enabling faster
                    release cycles and greater consistency across builds.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Kaay Labs -->
          <div
            class="bg-gradient-to-br from-stone-900/60 to-stone-800/40 flex flex-col md:flex-row gap-6 items-start rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-600/30"
          >
            <div class="flex-shrink-0">
              <div class="w-28 h-28 bg-white rounded-lg p-3 flex items-center justify-center shadow-md">
                <img
                  src="https://www.kaaylabs.com/favicon.ico"
                  alt="Kaay Labs Logo"
                  class="w-full h-full object-contain"
                  onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ccc%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2214%22%3EKaay Labs%3C/text%3E%3C/svg%3E'"
                />
              </div>
            </div>
            <div class="flex-1">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold text-stone-100 mb-1">
                    Front-end Developer
                  </h3>
                  <h4 class="text-lg md:text-xl text-stone-200/90 font-semibold">
                    Kaay Labs Private Limited
                  </h4>
                </div>
                <div class="flex flex-col items-start md:items-end">
                  <div class="text-stone-300/80 text-sm md:text-base font-medium bg-stone-800/50 px-3 py-1 rounded-md">
                    April 2022 - July 2022
                  </div>
                  <div class="text-stone-400/70 text-xs md:text-sm mt-1">
                    Chennai, India
                  </div>
                </div>
              </div>
              <ul class="list-none space-y-3 text-stone-200/80 text-sm md:text-base">
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Devised user-facing features utilizing frameworks such as
                    React.js, ensuring seamless integration with backend APIs and
                    enhancing the overall interactive experience of the web
                    application.
                  </span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon
                    name="material-symbols:check-circle"
                    class="text-green-400/80 flex-shrink-0 mt-0.5 text-lg"
                  />
                  <span>
                    Refined component architecture by modularizing React.js
                    codebase, which significantly improved code reusability and
                    maintainability for ongoing web application projects.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
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
