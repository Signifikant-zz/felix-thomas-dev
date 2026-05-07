<template>
  <section id="expertise" class="min-h-screen flex items-center bg-slate-900 py-24">
    <div class="max-w-6xl mx-auto px-6 w-full">

      <div class="mb-24">
        <h2 class="text-blue-500 text-sm uppercase tracking-[0.3em] font-bold mb-4">
          Expertise
        </h2>
        <h3 class="text-5xl md:text-7xl text-white font-bold tracking-tight">
          Tech Stack <span class="text-slate-700">&</span> AdTech<span class="text-blue-500">.</span>
        </h3>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">

        <div class="space-y-10">
          <h4 class="text-white text-xs uppercase tracking-widest border-b border-slate-800 pb-4 opacity-50">
            Development
          </h4>
          <ul class="space-y-6 cursor-default">
            <li v-for="item in ['HTML5', 'CSS3', 'JavaScript', 'Vue / Nuxt', 'Node.js / NPM']"
                :key="item"
                class="text-3xl md:text-4xl font-medium text-slate-100">
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="space-y-10">
          <h4 class="text-white text-xs uppercase tracking-widest border-b border-slate-800 pb-4 opacity-50">
            Motion & Design
          </h4>
          <ul class="space-y-6 cursor-default">
            <li v-for="item in ['GSAP 3', 'Canvas API', 'After Effects', 'Photoshop', 'Figma']"
                :key="item"
                class="text-3xl md:text-4xl font-medium text-slate-100">
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="space-y-10">
          <h4 class="text-blue-400 text-xs uppercase tracking-widest border-b border-blue-900/30 pb-4">
            AdTech
          </h4>
          <ul class="space-y-6 cursor-default">
            <li v-for="item in ['CM360', 'Doubleclick Studio', 'Flashtalking', 'Dynamic Content', 'GWD']"
                :key="item"
                class="text-3xl md:text-4xl font-medium text-slate-100">
              {{ item }}
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-24 pt-10 border-t border-slate-800/50 flex flex-wrap gap-x-10 gap-y-4 text-xs uppercase tracking-[0.2em] text-slate-500 cursor-default">
        <span>WebStorm</span>
        <span>Git</span>
        <span>Illustrator</span>
        <span>Media Encoder</span>
        <span>Sketch</span>
        <span>Markdown</span>
        <span>XML / JSON</span>
      </div>

    </div>
  </section>
</template>
