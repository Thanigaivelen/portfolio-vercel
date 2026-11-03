<script setup lang="ts">
const warm = ref(true);
const motion = ref(false);
const ready = ref(false);
const sceneAvailable = ref(true);
const menuOpen = ref(false);
const copyStatus = ref('Copy email');
const email = 'thanigaivelen2002@gmail.com';
const linkedin = 'https://www.linkedin.com/in/thanigaivelen06122002/';
const resume = 'https://drive.google.com/file/d/13H83KxM6Q6ssgZpJtFi58NRGpIcAMa6Z/view?usp=sharing';
let copyTimer: ReturnType<typeof setTimeout>;
let media: MediaQueryList | undefined;
const syncMotion = () => { motion.value = !media?.matches; };
onMounted(() => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)');
  syncMotion();
  media.addEventListener('change', syncMotion);
});
onBeforeUnmount(() => { clearTimeout(copyTimer); media?.removeEventListener('change', syncMotion); });
function selectProject(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: media?.matches ? 'instant' : 'smooth', block: 'center' });
  document.getElementById(id)?.focus({ preventScroll: true });
}
async function copyEmail() {
  try { await navigator.clipboard.writeText(email); copyStatus.value = 'Copied!'; }
  catch { copyStatus.value = 'Use the email link'; }
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => { copyStatus.value = 'Copy email'; }, 2500);
}
const skills = ['React & Next.js', 'Vue & Nuxt', 'Node.js', 'TypeScript', 'Python', 'LangChain & RAG', 'PostgreSQL', 'AWS', 'Retool', 'Automation'];
const experience = [
  { company: 'Toolpioneers', role: 'Software / Retool Developer Engineer', date: 'May 2024 — Present', text: 'Building backend services, AI integrations, Chrome extensions, and internal tools. Connecting Node.js, AWS, LangChain, and Retool to make everyday work simpler.' },
  { company: 'HyperVerge', role: 'Automation Developer · Intern', date: 'Sep 2023 — Mar 2025', text: 'Created Apps Script automation and integrated automated testing into CI/CD workflows to streamline deployments.' },
  { company: 'Kaay Labs', role: 'Front-end Developer', date: 'Apr 2022 — Jul 2022', text: 'Built interactive React interfaces and reusable components, connecting the frontend to backend APIs.' },
];
</script>

<template>
  <div class="portfolio" :class="{ 'cool-studio': !warm }">
    <a class="skip-link" href="#work">Skip to work</a>
    <header class="site-header">
      <a href="#home" class="wordmark" aria-label="Thani home">thani<span>.</span></a>
      <nav aria-label="Main navigation" :class="{ open: menuOpen }">
        <a href="#work" @click="menuOpen = false">Selected work</a>
        <a href="#about" @click="menuOpen = false">About me</a>
        <a href="#contact" @click="menuOpen = false">Let’s talk <span aria-hidden="true">↗</span></a>
      </nav>
      <a :href="resume" target="_blank" rel="noopener noreferrer" class="resume-link">Résumé <span aria-hidden="true">↗</span></a>
      <button class="menu-toggle" :aria-expanded="menuOpen" aria-label="Toggle navigation" @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close' : 'Menu' }}</button>
    </header>
    <main>
      <section id="home" class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="intro"><span class="availability-dot" /> A developer. A builder. A curious mind.</p>
          <h1 id="hero-title">Small details.<br>Big possibilities.</h1>
          <p class="hero-description">Hey, I’m <strong>Thani</strong>. I turn complex ideas into thoughtful digital experiences—with a little code and a lot of curiosity.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#work">Explore my work <span aria-hidden="true">↗</span></a>
            <a class="text-link" href="#about">A little about me <span aria-hidden="true">↗</span></a>
          </div>
          <div class="hero-meta"><span>Full-stack development</span><span>AI & automation</span></div>
        </div>
        <div class="studio-stage">
          <div v-if="!ready" class="studio-heading"><span class="studio-status"><span /> Setting up the studio</span></div>
          <ClientOnly>
            <StudioScene :warm="warm" :motion="motion" @ready="ready = true" @availability="sceneAvailable = $event" @project="selectProject" />
            <template #fallback><div class="studio-loading">Opening the studio…</div></template>
          </ClientOnly>
          <div v-if="ready && sceneAvailable" class="studio-controls">
            <span class="drag-hint"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 7V5a4 4 0 0 1 8 0v2M8 10h8M12 7v5M7 7h10v8a5 5 0 0 1-10 0V7Z" stroke="currentColor" stroke-width="1.4"/></svg>Drag to explore</span>
            <div class="control-buttons">
              <button :aria-pressed="!warm" :aria-label="warm ? 'Switch to moonlight' : 'Switch to golden hour'" @click="warm = !warm"><span aria-hidden="true">{{ warm ? '☀' : '☾' }}</span> {{ warm ? 'Golden hour' : 'Moonlight' }}</button>
              <button :aria-pressed="!motion" :aria-label="motion ? 'Pause scene motion' : 'Play scene motion'" class="motion-button" @click="motion = !motion"><span aria-hidden="true">{{ motion ? 'Ⅱ' : '▷' }}</span></button>
            </div>
          </div>
        </div>
        <div class="hero-bottom"><span>Based in Chennai, India <span class="tiny-orbit" aria-hidden="true">◎</span></span><a href="#work">Scroll to discover <span aria-hidden="true">↓</span></a><span class="availability"><span class="availability-dot" /> Open to interesting opportunities</span></div>
      </section>
      <section id="work" class="work-section section-wrap" aria-labelledby="work-title">
        <div class="section-heading"><div><p class="section-kicker">Ideas, brought to life</p><h2 id="work-title">A few things<br>I’ve put into the world.</h2></div><p>Useful software. Considered experiences.<br>Here’s a look at what I’ve been building.</p></div>
        <article id="heypascal" class="project project-pascal" tabindex="-1">
          <a href="https://heypascal.ai" target="_blank" rel="noopener noreferrer" class="project-visual" aria-label="Visit HeyPascal AI"><div class="project-browser"><div class="browser-chrome"><span /><span /><span /><p>heypascal.ai</p></div><img src="/images/cos-theta.png" alt="HeyPascal education platform interface" loading="lazy" width="1200" height="700"></div><span class="project-open" aria-hidden="true">↗</span></a>
          <div class="project-details"><p class="project-category">AI & education</p><h3>HeyPascal</h3><p>A little more possibility in every classroom. An AI-powered platform for lesson planning, guided tutoring, and connecting teachers, students, and parents.</p><ul class="tech-list" aria-label="HeyPascal technologies"><li>Next.js</li><li>LangChain</li><li>AI agents</li><li>Stripe</li></ul><a href="https://heypascal.ai" target="_blank" rel="noopener noreferrer" class="text-link">Explore the project <span aria-hidden="true">↗</span></a></div>
        </article>
        <article id="costheta" class="project project-theta" tabindex="-1">
          <a href="https://rougeone.dev/" target="_blank" rel="noopener noreferrer" class="project-visual" aria-label="Visit Cos-theta"><div class="project-browser"><div class="browser-chrome"><span /><span /><span /><p>cos-theta / workspace</p></div><img src="/images/heypascal.png" alt="Cos-theta project management workspace" loading="lazy" width="1200" height="700"></div><span class="project-open" aria-hidden="true">↗</span></a>
          <div class="project-details"><p class="project-category">Productivity & collaboration</p><h3>Cos-theta</h3><p>Less scattered work. More shared momentum. A project management platform that brings conversations, sprint boards, files, and project pages into one workspace.</p><ul class="tech-list" aria-label="Cos-theta technologies"><li>React</li><li>Node.js</li><li>MongoDB</li><li>WebSockets</li></ul><a href="https://rougeone.dev/" target="_blank" rel="noopener noreferrer" class="text-link">Explore the project <span aria-hidden="true">↗</span></a></div>
        </article>
        <a class="github-link" href="https://github.com/Thanigaivelen" target="_blank" rel="noopener noreferrer">More experiments live on GitHub <span aria-hidden="true">↗</span></a>
      </section>
      <section id="about" class="about-section section-wrap" aria-labelledby="about-title">
        <div class="about-portrait"><div class="portrait-frame"><img src="/images/profile-pic.jpeg" alt="Thanigaivelen C" loading="lazy" width="600" height="720"></div><span class="portrait-note">Usually building something.</span><span class="portrait-spark" aria-hidden="true">✳</span></div>
        <div class="about-copy"><p class="section-kicker">The person behind the pixels</p><h2 id="about-title">Curiosity is<br>my favourite tool.</h2><p>I’m Thanigaivelen, a software developer based in Chennai. I like understanding how things work—and figuring out how to make them work a little better.</p><p>My work lives between full-stack development, AI, and automation. From a carefully built interface to the systems behind it, I enjoy connecting the pieces into something people can actually use.</p><div class="skill-list"><span v-for="skill in skills" :key="skill">{{ skill }}</span></div><p class="education">B.Tech · Government College of Technology, Coimbatore<br><span>2020–2024 · CGPA 8.5</span></p></div>
      </section>
      <section class="experience-section section-wrap" aria-labelledby="experience-title"><div class="experience-heading"><p class="section-kicker">Along the way</p><h2 id="experience-title">Places I’ve<br>made an impact.</h2></div><div class="experience-list"><article v-for="job in experience" :key="job.company" class="experience-item"><p class="experience-date">{{ job.date }}</p><h3>{{ job.company }}</h3><p class="experience-role">{{ job.role }}</p><p>{{ job.text }}</p></article></div></section>
      <section id="contact" class="contact-section section-wrap" aria-labelledby="contact-title"><div class="contact-orbit" aria-hidden="true">✳</div><p class="section-kicker">Good things start with a conversation</p><h2 id="contact-title">Have something<br>in mind?</h2><p>A product idea, a challenging problem, or just a hello.<br>I’d love to hear it.</p><a class="contact-email" :href="'mailto:' + email">{{ email }} <span aria-hidden="true">↗</span></a><button class="copy-email" @click="copyEmail" aria-live="polite">{{ copyStatus }}</button><div class="contact-links"><a :href="linkedin" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/Thanigaivelen" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a :href="resume" target="_blank" rel="noopener noreferrer">Résumé ↗</a></div></section>
    </main>
    <footer class="site-footer"><a href="#home" class="wordmark">thani<span>.</span></a><p>Made with curiosity, code, and a little Three.js.</p><a href="#home">Back to top ↑</a></footer>
  </div>
</template>
