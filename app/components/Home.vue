<script lang="ts" setup>
import { ref, onMounted, nextTick, reactive, computed } from 'vue'
import SchoolCard from './SchoolCard.vue'
import Spinner from './Spinner.vue'
import ImportCard from './ImportCard.vue'

const selected = ref<{ name: string; city?: string | null; type?: string | null } | null>(null)
const list = ref<any[] | null>(null)
const isEditing = ref(false)

onMounted(async () => {
    try {
        const res: any = await $fetch('/api/schools')
        const arr: any[] = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : [])
        list.value = arr
        if (arr.length === 0) return

        const params = new URLSearchParams(window.location.search)
        const q = params.get('school')
        if (q) {
            const found = arr.find((s: any) => (typeof s === 'string' ? s === q : (s.name ?? s.schoolName ?? s.school) === q))
            selected.value = normalize(found ?? q)
        } else {
            const raw = arr[Math.floor(Math.random() * arr.length)]
            selected.value = normalize(raw)
        }
    } catch (e) {
        console.error('Failed to load schools', e)
    }
})

function normalize(raw: any) {
    if (typeof raw === 'string') return { name: raw }
    return {
        name: raw.name ?? raw.schoolName ?? raw.school ?? '',
        city: raw.city ?? raw.town ?? null,
        type: raw.type ?? raw.schoolType ?? null,
    }
}

function onEdit() {
    isEditing.value = true
    // focus for a11y
    nextTick(() => {
        const el = document.getElementById('school-popover')
        el?.focus()
    })
}

function selectAndReload(value: string) {
    const p = new URLSearchParams(window.location.search)
    p.set('school', value)
    window.location.search = p.toString()
}

const confirmed = ref(false)

// store confirmed selections from CardSelect components
const selections = reactive({
    Classe: { option1: null as string | null, option2: null as string | null },
    'Spécialité': { option1: null as string | null, option2: null as string | null }
})

function onClasseConfirm(payload: { option1: string | null; option2: string | null }) {
    selections.Classe.option1 = payload.option1 ?? null
    selections.Classe.option2 = payload.option2 ?? null
}

function onSpecConfirm(payload: { option1: string | null; option2: string | null }) {
    selections['Spécialité'].option1 = payload.option1 ?? null
    selections['Spécialité'].option2 = payload.option2 ?? null
}

const isValid = computed(() => {
    return !!selections.Classe.option1 && !!selections.Classe.option2 && !!selections['Spécialité'].option1
})

function proceed() {
    if (!isValid.value) return
    // set confirmed to true and hide selection UI; keep URL unchanged
    confirmed.value = true
    isEditing.value = false
}
</script>

<template>
    <div class="flex flex-col min-h-screen pb-28">
        <div class="flex flex-col">
            <div class="mt-6">
                <div v-if="selected" class="flex flex-col gap-4 relative">
                    <SchoolCard :key="selected.name" :school-name="selected.name" :city="selected.city"
                        :type="selected.type" @edit="onEdit" :show-edit="!confirmed" />

                    <div v-if="isEditing" id="school-popover" tabindex="-1"
                        class="absolute right-0 mt-2 w-80 bg-white border rounded shadow z-50">
                        <div class="p-3">
                            <div class="text-sm font-medium mb-2">Choisir un lycée</div>
                            <div class="max-h-64 overflow-auto">
                                <button v-for="(s, i) in list || []" :key="i"
                                    @click="() => selectAndReload(typeof s === 'string' ? s : (s.name ?? s.schoolName ?? s.school))"
                                    class="w-full text-left px-2 py-2 hover:bg-gray-100">
                                    {{ typeof s === 'string' ? s : (s.name ?? s.schoolName ?? s.school) }}
                                </button>
                            </div>
                            <div class="mt-3 text-right">
                                <button @click="() => (isEditing = false)"
                                    class="px-3 py-1 rounded bg-gray-200">Fermer</button>
                            </div>
                        </div>
                    </div>

                                        <template v-if="!confirmed">
                                            <CardSelect category="Classe" :option-1="['Seconde', 'Première', 'Terminale']"
                                                    :option-2="['Général', 'Technologique', 'Professionnel']" @confirm="onClasseConfirm" />

                                            <CardSelect category="Spécialité"
                                                    :option-1="['HGGSP', 'HLP', 'LLCE', 'LCA', 'Maths', 'NSI', 'PC', 'SVT', 'SI', 'SES', 'EPS', 'Arts', 'BE']" @confirm="onSpecConfirm" />
                                        </template>

                                        <template v-if="confirmed">
                                            <ImportCard />
                                        </template>

                </div>
                <div v-else class="text-gray-500">
                    <Spinner />
                </div>
            </div>

        </div>
        <button
            v-if="!confirmed"
            type="button"
            aria-label="Confirmer"
            :disabled="!isValid"
            @click="proceed"
            :class="{
                'fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full z-50': true,
                'bg-stone-950 text-white': isValid,
                'bg-white text-gray-400 border-[0.5px] border-gray-400 cursor-not-allowed': !isValid
            }"
        >
            Confirmer
        </button>
    </div>
</template>