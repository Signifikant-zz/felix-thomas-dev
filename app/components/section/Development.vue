<template>
  <section id="development" class="relative py-24 bg-slate-50 border-y border-slate-100">
  <div class="max-w-6xl mx-auto px-6">
    <div class="flex flex-col lg:flex-row gap-16 items-center">

      <div class="lg:w-5/12 relative">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
          <a class="text-blue-500 underline" href="https://wiki.eternl.io" target="_blank" title="Externer Link: wiki.eternl.io"><img src="/assets/eternl-wiki.jpg" alt="Eternl Wiki Screenshot" class="w-full h-auto" /></a>
          <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 p-4">
<!--            <p class="text-white text-xs font-bold uppercase tracking-widest">Eternl Wiki Project</p>-->
          </div>
        </div>

        <div class="absolute -bottom-6 -right-6 w-2/3 rounded-xl overflow-hidden shadow-2xl border border-white transform rotate-3 hover:rotate-1 transition-transform duration-500 hidden md:block">
          <a class="text-blue-500 underline" href="https://eternl.io" target="_blank" title="Externer Link: eternl.io"><img src="/assets/eternl.jpg" alt="Eternl Wallet Screenshot" class="w-full h-auto" /></a>
        </div>
      </div>

      <div class="lg:w-2/3">
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
          <div class="pt-4 border-t border-slate-200">
            <p class="text-sm leading-relaxed">
              <span class="text-blue-500 font-bold">Build Info:</span>
              Diese Portfolio-Website wurde als Einstieg in <strong>Nuxt 4</strong> entwickelt.
              Sie nutzt eine <strong>Supabase/PostgreSQL</strong> Anbindung zur Verwaltung individueller
              Zugangscodes und zum Tracking von Login-Aktivitäten.
              Die Banner im Showcase werden während des Build-Prozesses aus einem <strong>privaten Repository</strong>
              gesynct und über eine geschützte API-Route serverseitig bereitgestellt.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
  </section>
</template>
<script setup lang="ts">
</script>
