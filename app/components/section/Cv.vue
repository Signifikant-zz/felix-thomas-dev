<template>
  <section id="cv" class="py-24 bg-[#1a202c] text-slate-200">
    <div class="max-w-5xl mx-auto px-6">

      <h2 class="text-blue-500 text-sm uppercase tracking-[0.3em] font-bold mb-4">Curriculum Vitae</h2>

      <div class="mb-24">
        <h3 class="text-2xl font-bold mb-10 text-slate-150 border-b border-slate-700 pb-4">Berufliche & Praktische Erfahrung</h3>

        <div class="relative border-l-2 border-slate-700 md:ml-48">

          <div class="relative pl-10 pb-12">
            <div class="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-blue-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-200 text-[15px] font-mono font-bold md:text-right pt-0.5 whitespace-nowrap">03/2020 - 05/2026</span>
            <div>
              <h4 class="text-xl font-bold text-white">Webentwickler & Programmierer (Senior Banner Developer)</h4>
              <p class="text-slate-300">Tastenkunst GmbH, Leipzig</p>
            </div>
          </div>

          <div class="relative pl-10 pb-10">
            <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">02/2019 - 07/2019</span>
            <div>
              <h4 class="text-lg font-bold text-slate-250">Software-Entwickler</h4>
              <p class="text-slate-400">S&P Software Consulting & Solution GmbH, Leipzig</p>
            </div>
          </div>

          <div class="relative pl-10 pb-10">
            <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">12/2017 - 08/2018</span>
            <div>
              <h4 class="text-lg font-bold text-slate-200">Programmierer (Praktikant)</h4>
              <p class="text-slate-400">ORSoft GmbH, Leipzig</p>
            </div>
          </div>

          <div class="relative pl-10 pb-10">
            <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">12/2017 - 08/2018</span>
            <div>
              <h4 class="text-lg font-medium text-slate-250 italic">autodidaktische Weiterbildung & private Projekte</h4>
              <p class="text-slate-400">Zend Framework 2, HTML5, CSS3, Javascript</p>
            </div>
          </div>

          <div class="relative pl-10">
            <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">02/2013 - 06/2013</span>
            <div>
              <h4 class="text-lg font-bold text-slate-200">Programmierer / Webentwickler (Praktikant)</h4>
              <p class="text-slate-400">Artkolchose GmbH, Leipzig</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-bold mb-10 text-slate-150 border-b border-slate-700 pb-4">Bildungsweg</h3>

        <div class="relative border-l-2 border-slate-700 md:ml-48">

          <div class="relative pl-10 pb-12">
            <div class="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-blue-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-100 text-sm font-mono font-bold md:text-right pt-0.5 whitespace-nowrap">09/2016 - 08/2018</span>
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h4 class="text-xl font-bold text-white">Fachinformatiker Anwendungsentwicklung (IHK)</h4>
                <UiPdfButton pdf-path="/assets/cv-IHK-Felix-Thomas.pdf" @open="openPdf" />
              </div>
              <p class="text-slate-300">Note: 1,8 </p>
              <p class="text-slate-400">ciT Leipzig GmbH</p>
            </div>
          </div>

          <div class="relative pl-10 pb-10">
            <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">05/2014 - 09/2014</span>
            <div>
              <h4 class="text-lg font-bold text-slate-250">modulare Weiterbildung</h4>
              <p class="text-slate-400">Web-Developer Level 2, Ajax, jQuery, Fortgeschrittene Programmierung mit JavaScript</p>
              <p class="text-slate-400 text-sm">future Training & Consulting GmbH, Halle</p>
            </div>
          </div>

          <div class="relative pl-10 pb-12">
            <div class="absolute -left-[8px] top-2 w-3.5 h-3.5 rounded-full bg-blue-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-100 text-sm font-mono font-bold md:text-right pt-0.5 whitespace-nowrap">09/2011 - 09/2012</span>
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h4 class="text-xl font-bold text-slate-150 font-bold">Web Design & Development - SAE Diploma</h4>
                <UiPdfButton pdf-path="/assets/cv-SAE-Feilx-Thomas.pdf" @open="openPdf" />
              </div>
              <p class="text-slate-300">Note: 1,9</p>
              <p class="text-slate-400">SAE Leipzig</p>
            </div>
          </div>

          <div class="relative pl-10 pb-4">
            <div class="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-blue-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-100 text-sm font-mono font-bold md:text-right pt-0.5 whitespace-nowrap">10/2006 - 09/2010</span>
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h4 class="text-xl font-bold text-slate-100">Magister Artium</h4>
                <UiPdfButton pdf-path="/assets/cv-Magister-Felix-Thomas.pdf" @open="openPdf" />
              </div>
              <p class="text-slate-300">Note: 2,2</p>
              <p class="text-slate-400">Magister Studium der Philosophie (1. Hauptfach) und der Logik & Wissenschaftstheorie (2. Hauptfach)</p>
              <p class="text-slate-400">Universität Leipzig</p>
            </div>
          </div>

          <div class="relative pl-10 pb-10">
            <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">10/2002 - 09/2006</span>
            <div>
              <p class="text-slate-400">Magister Studium der Logik & Wissenschaftstheorie (1. Hauptfach) und der Philosophie (2. Hauptfach)</p>
              <p class="text-slate-400">Universität Leipzig</p>
            </div>
          </div>

          <div class="relative pl-10">
            <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
            <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">10/2002 - 09/2006</span>
            <div>
              <h4 class="text-lg font-bold text-slate-150 leading-tight">Allgemeine Hochschulreife / Abitur</h4>
              <p class="text-slate-400">Staatliches Gymnasium Lerchenberg Gymnasium, Altenburg</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <dialog ref="pdfDialog" class="w-[90vw] md:w-[80vw] h-[85vh] rounded-lg border-none p-0 bg-slate-900 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm overflow-hidden">
      <div class="relative w-full h-full flex flex-col pt-12">
        <button
            @click="closePdf"
            class="absolute top-3 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-xl font-bold"
        >
          &times;
        </button>

        <iframe
            v-if="currentPdf"
            :src="currentPdf"
            class="w-full h-full border-none bg-white"
        ></iframe>
      </div>
    </dialog>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const pdfDialog = ref(null)
const currentPdf = ref(null)

const openPdf = (pdfPath) => {
  currentPdf.value = pdfPath
  pdfDialog.value?.showModal()
}

const closePdf = () => {
  pdfDialog.value?.close()
  currentPdf.value = null
}
</script>
