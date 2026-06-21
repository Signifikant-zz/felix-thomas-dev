<template>
  <section id="development" class="relative py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
    <div class="max-w-6xl mx-auto px-6 relative">

      <div class="absolute left-1/3 top-1/2 lg:top-10 -translate-x-1/2 lg:-translate-x-1/3 -translate-y-1/3 pointer-events-none z-0 opacity-10
                  w-[70%] aspect-square max-w-[500px] lg:max-w-[350px]">
        <svg id="cardano-logo-wrap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" class="w-full h-full fill-blue-600">
          <g id="cardano-logo">
            <path id="c1" class="c c-inner" d="M243.4,399.4c-1.5,25.3,17.9,47,43.2,48.5h2.5c25.3,0,45.8-20.6,45.8-45.9s-20.6-45.8-45.9-45.8 c-24.3,0-44.3,19-45.7,43.2L243.4,399.4z"/>
            <path id="c2" class="c c-outer" d="M72.5,387.8c-8.2-0.5-15.2,5.8-15.6,14c-0.5,8.2,5.8,15.2,14,15.6c8.2,0.5,15.1-5.8,15.6-13.9 C86.9,395.2,80.7,388.2,72.5,387.8C72.5,387.8,72.5,387.8,72.5,387.8z"/>
            <path id="c3" class="c c-outer" d="M240.5,133.3c7.3-3.7,10.2-12.7,6.4-20c-3.7-7.3-12.7-10.2-20-6.4c-7.2,3.7-10.1,12.6-6.5,19.8 c3.7,7.3,12.6,10.3,19.9,6.6C240.4,133.3,240.5,133.3,240.5,133.3z"/>
            <path id="c4" class="c c-middle" d="M287,214.4c11.3-5.7,15.8-19.5,10.1-30.8c-5.7-11.3-19.5-15.8-30.8-10.1c-11.3,5.7-15.8,19.5-10.1,30.7 C262,215.6,275.7,220.1,287,214.4C287,214.4,287,214.4,287,214.4z"/>
            <path id="c5" class="c c-outer" d="M130.5,270.2c8.7,5.7,20.4,3.3,26.1-5.4c5.7-8.7,3.3-20.4-5.4-26.1c-8.7-5.7-20.4-3.3-26.1,5.4c0,0,0,0,0,0 C119.4,252.8,121.8,264.5,130.5,270.2z"/>
            <path id="c6" class="c c-middle" d="M158.4,379.4c-12.6-0.7-23.4,8.9-24.2,21.6c-0.7,12.6,8.9,23.4,21.6,24.2c12.6,0.7,23.4-8.9,24.2-21.5 C180.7,391,171,380.1,158.4,379.4z"/>
            <path id="c7" class="c c-outer" d="M133,533.4c-9.3,4.7-13,16-8.3,25.3s16,13,25.3,8.3c9.3-4.7,13-16,8.3-25.3 C153.7,532.4,142.3,528.7,133,533.4C133,533.4,133,533.4,133,533.4z"/>
            <path id="c8" class="c c-middle" d="M222,332.1c12.5,8.2,29.2,4.7,37.3-7.8c8.2-12.5,4.7-29.2-7.8-37.3c-12.4-8.2-29.2-4.7-37.3,7.8 C206.1,307.2,209.5,323.9,222,332.1C222,332.1,222,332.1,222,332.1z"/>
            <path id="c9" class="c c-middle" d="M504.4,212.6c10.6,6.9,24.8,3.9,31.7-6.7c6.9-10.6,3.9-24.8-6.7-31.7c-10.6-6.9-24.8-3.9-31.7,6.7 C490.8,191.5,493.8,205.6,504.4,212.6C504.4,212.6,504.4,212.6,504.4,212.6z"/>
            <path id="c10" class="c c-outer" d="M551.4,131.7c6.9,4.5,16,2.6,20.5-4.3c4.5-6.9,2.6-16-4.3-20.5c-6.9-4.5-16-2.6-20.5,4.3c0,0,0,0,0,0 C542.6,118.1,544.6,127.3,551.4,131.7z"/>
            <path id="c11" class="c c-inner" d="M508,355.7c-25.3-1.5-47,17.9-48.4,43.2c-1.5,25.3,17.9,47,43.2,48.4c0.9,0,1.8,0,2.7,0 c25.3,0,45.8-20.5,45.8-45.9c0-11.3-4.2-22.1-11.7-30.5C531.5,361.8,520.1,356.4,508,355.7z"/>
            <path id="c12" class="c c-inner" d="M302.1,328.9c7.8,15.5,23.6,25.3,41,25.2c25.3,0,45.9-20.5,45.9-45.9c0-7.2-1.7-14.3-4.9-20.7 c-7.8-15.4-23.7-25.1-41-25.1c-25.3,0-45.8,20.6-45.8,45.9C297.3,315.6,298.9,322.6,302.1,328.9z"/>
            <path id="c13" class="c c-outer" d="M661.6,270.2c9.3-4.7,13-16,8.3-25.3s-16-13-25.3-8.3c-9.3,4.7-13,16-8.4,25.3 C640.9,271.1,652.3,274.8,661.6,270.2z"/>
            <path id="c14" class="c c-middle" d="M545.3,284.8c-13.3,6.7-18.6,22.9-12,36.2c6.7,13.3,22.9,18.6,36.2,12c13.3-6.7,18.6-22.9,12-36.2 C574.9,283.4,558.7,278.1,545.3,284.8C545.4,284.8,545.3,284.8,545.3,284.8z"/>
            <path id="c15" class="c c-outer" d="M395.6,124.8c10.4,0.6,19.3-7.4,19.9-17.8s-7.4-19.3-17.8-19.9s-19.3,7.4-19.9,17.8c0,0,0,0,0,0 C377.2,115.3,385.2,124.2,395.6,124.8z"/>
            <path id="c16" class="c c-middle" d="M395.4,243.6c14.9,0.8,27.6-10.5,28.4-25.4c0.8-14.9-10.5-27.6-25.4-28.4c-14.9-0.8-27.6,10.5-28.4,25.4 C369.1,230,380.5,242.7,395.4,243.6z"/>
            <path id="c17" class="c c-middle" d="M249.3,518.7c13.3-6.7,18.6-22.9,11.9-36.2c-6.7-13.3-22.9-18.6-36.2-11.9c-13.3,6.7-18.6,22.9-11.9,36.2 c0,0,0,0,0,0C219.8,520.1,236,525.4,249.3,518.7z"/>
            <path id="c18" class="c c-inner" d="M412.8,282.9c-13.9,21.2-8,49.6,13.2,63.5c21.2,13.9,49.6,8,63.5-13.2c13.9-21.2,8-49.6-13.2-63.5 c-7.5-4.9-16.2-7.5-25.1-7.5C435.7,262.2,421.3,269.9,412.8,282.9z"/>
            <path id="c19" class="c c-middle" d="M492.5,474.6c-11.4-22.6-39-31.7-61.6-20.3s-31.7,39-20.3,61.6c7.8,15.5,23.6,25.2,40.9,25.2 c7.2,0,14.2-1.8,20.6-5C494.7,524.7,503.8,497.2,492.5,474.6z"/>
            <path id="c20" class="c c-middle" d="M572.6,471.4c-12.4-8.2-29.2-4.7-37.3,7.7s-4.7,29.2,7.7,37.3c12.4,8.2,29.2,4.7,37.3-7.7 C588.5,496.3,585,479.6,572.6,471.4z"/>
            <path id="c21" class="c c-middle" d="M660.4,402.5c0.7-12.6-8.9-23.4-21.6-24.2s-23.4,8.9-24.2,21.6c-0.7,12.6,8.9,23.4,21.5,24.2 C648.9,424.8,659.7,415.2,660.4,402.5z"/>
            <path id="c22" class="c c-outer" d="M723.8,386.2c-8.2-0.5-15.2,5.8-15.7,14c-0.5,8.2,5.8,15.2,14,15.7c8.2,0.5,15.2-5.8,15.7-14c0,0,0,0,0,0 C738.2,393.7,732,386.7,723.8,386.2z"/>
            <path id="c23" class="c c-outer" d="M664.1,533.3c-8.7-5.7-20.4-3.3-26.1,5.4c-5.7,8.7-3.3,20.4,5.4,26.1c8.7,5.7,20.4,3.3,26.1-5.4 C675.3,550.7,672.8,539,664.1,533.3C664.1,533.3,664.1,533.3,664.1,533.3z"/>
            <path id="c24" class="c c-outer" d="M243.2,671.8c-6.8-4.5-16-2.6-20.5,4.3c-4.5,6.8-2.6,16,4.3,20.5c6.8,4.5,16,2.6,20.5-4.3 C252,685.5,250.1,676.3,243.2,671.8C243.2,671.8,243.2,671.8,243.2,671.8z"/>
            <path id="c25" class="c c-outer" d="M554.1,670.2c-7.3,3.7-10.3,12.6-6.6,19.9c3.7,7.3,12.6,10.3,19.9,6.6c7.3-3.7,10.3-12.6,6.6-19.9 c0,0,0,0,0,0C570.3,669.5,561.4,666.5,554.1,670.2C554.1,670.2,554.1,670.2,554.1,670.2z"/>
            <path id="c26" class="c c-inner" d="M381.8,520.5c13.9-21.2,8-49.6-13.2-63.5c-21.2-13.9-49.6-8-63.5,13.2c-13.9,21.2-8,49.6,13.2,63.5c7.5,4.9,16.2,7.5,25.1,7.5C358.9,541.3,373.4,533.5,381.8,520.5z"/>
            <path id="c27" class="c c-middle" d="M290.2,590.9c-10.6-6.9-24.8-4-31.7,6.6c-6.9,10.6-4,24.8,6.6,31.7c10.6,6.9,24.8,4,31.7-6.6 C303.7,612,300.8,597.9,290.2,590.9z"/>
            <path id="c28" class="c c-outer" d="M397.1,678.7c-10.4-0.6-19.3,7.4-19.9,17.8c-0.6,10.4,7.4,19.3,17.8,19.9c10.4,0.6,19.3-7.4,19.9-17.8 C415.5,688.2,407.5,679.3,397.1,678.7C397.1,678.7,397.1,678.7,397.1,678.7z"/>
            <path id="c29" class="c c-inner" d="M397.3,560c-14.9-0.9-27.6,10.4-28.5,25.3c-0.9,14.9,10.4,27.6,25.3,28.5c14.9,0.9,27.6-10.4,28.5-25.3 c0,0,0-0.1,0-0.1C423.4,573.6,412.1,560.9,397.3,560z"/>
            <path id="c30" class="c c-middle" d="M507.6,589.1c-11.3,5.7-15.8,19.5-10.1,30.8c5.7,11.3,19.5,15.8,30.8,10.1c11.3-5.7,15.8-19.5,10.1-30.8 c0,0,0,0,0,0C532.6,587.8,518.9,583.3,507.6,589.1C507.6,589.1,507.6,589.1,507.6,589.1z"/>
          </g>
        </svg>
      </div>

      <div class="flex flex-col lg:flex-row gap-16 items-center relative z-10">

        <div class="w-11/12 lg:w-5/12 relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <a class="text-blue-500 underline" href="https://wiki.eternl.io" target="_blank" rel="noopener noreferrer"><img src="/assets/eternl-wiki.jpg" alt="Eternl Wiki Screenshot" class="w-full h-auto" /></a>
          </div>
          <div class="absolute -bottom-6 -right-6 w-2/3 rounded-xl overflow-hidden shadow-2xl border border-white transform rotate-3 hover:rotate-1 transition-transform duration-500">
            <a class="text-blue-500 underline" href="https://eternl.io" target="_blank" rel="noopener noreferrer"><img src="/assets/eternl.jpg" alt="Eternl Wallet Screenshot" class="w-full h-auto" /></a>
          </div>
        </div>

        <div class="lg:w-7/12">
          <h2 class="text-sm uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">App Development</h2>
          <h3 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            Vom Motion Design zum Web Engineering<span class="text-blue-500">.</span>
          </h3>
          <div class="space-y-6 text-slate-600 leading-relaxed max-w-2xl">
            <p>
              Seit dem letzten Jahr habe ich meinen Fokus intensiv auf moderne JavaScript-Frameworks ausgeweitet. Bei der Mitarbeit am Frontend der <strong>Eternl Wallet</strong> (<a class="text-blue-500 underline" href="https://eternl.io" target="_blank">eternl.io</a>) konnte ich wertvolle Erfahrungen in der Entwicklung komplexer Web-Apps sammeln.
            </p>
            <p>
              Ein zentrales Projekt war die Neukonzeption und Programmierung des <strong>Eternl Wikis</strong> (<a class="text-blue-500 underline" href="https://wiki.eternl.io" target="_blank">wiki.eternl.io</a>). Auf Basis von <strong>Vue.js</strong> und einem maßgeschneiderten <strong>TypeScript-Parser</strong> für Markdown-Inhalte entstand eine performante Dokumentationsplattform, die technische Wartbarkeit und User Experience vereint.
            </p>
            <p class="pt-4 border-t border-slate-200 text-sm text-slate-500">
              Diese Erfahrungen fließen auch direkt in meine eigenen Projekte ein: <strong>Dieses Portfolio</strong> wurde als Einstieg in <strong>Nuxt 4</strong> realisiert. Es nutzt eine <strong>Supabase/PostgreSQL</strong> Anbindung zur Verwaltung individueller Zugangscodes und zum Tracking von Login-Aktivitäten. Die Banner im Showcase werden während des Build-Prozesses aus einem <strong>privaten Repository</strong> gesynct und über eine geschützte API-Route serverseitig bereitgestellt.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const logo = document.getElementById('cardano-logo')
  if (!logo) return

  // 1. DAUERSCHLEIFE
  gsap.to(logo, {
    rotation: 360,
    duration: 60,
    repeat: -1,
    ease: 'none',
    transformOrigin: '50% 50%'
  })

  // 2. SCROLL-ANIMATION
  gsap.to('#cardano-logo-wrap', {
    scrollTrigger: {
      trigger: '#development',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
    rotation: 60,
    scale: 1.7,
    transformOrigin: '50% 50%',
    ease: 'none'
  })
})
</script>
