<template>
  <div class="w-full border rounded-lg p-5 bg-white">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3 justify-center">
        <input ref="fileInput" type="file" class="hidden" @change="onFileChange" />
        <button @click="pickFile" type="button" class="px-3 py-2 text-center mx-auto flex items-center gap-2"><Icon name="material-symbols:document-scanner-sharp"/> Joindre ma fiche avenir pour cette formation</button>
        <div v-if="fileName" class="text-sm text-gray-800">{{ fileName }}</div>
      </div>

      <div class="flex gap-2 mt-3">
        <button v-if="fileName && !imported" @click="importFile" class="px-3 py-2 rounded bg-stone-950 text-white">Importer</button>
        <div v-if="imported" class="text-sm text-green-600">Fichier importé (simulation)</div>
        <button v-if="fileName" @click="clear" class="px-3 py-2 rounded border text-sm">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref<string | null>(null)
const imported = ref(false)

function pickFile() {
  fileInput.value?.click()
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const f = input.files?.[0]
  if (f) {
    fileName.value = f.name
    imported.value = false
  }
}

function importFile() {
  // simulate upload
  imported.value = true
  setTimeout(() => {
    // keep imported true
  }, 600)
}

function clear() {
  fileName.value = null
  imported.value = false
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<style scoped></style>
