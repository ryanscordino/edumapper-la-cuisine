<script lang="ts" setup>
const props = defineProps<{
    category: string
    option1?: string[]
    option2?: string[]
}>()

import { ref, onMounted } from 'vue'
import Chip from './Chip.vue'

const isCategoryActive = ref(false)

const option1List = props.option1 ?? []
const option2List = props.option2 ?? []

const selectedOpt1 = ref<string | null>(null)
const selectedOpt2 = ref<string | null>(null)

const emit = defineEmits(['confirm'])

function confirm() {
    emit('confirm', { option1: selectedOpt1.value, option2: selectedOpt2.value })
    // close the category editor after confirming
    isCategoryActive.value = false
    // persist selection to localStorage
    try {
        const key = `cardselect:${props.category ?? 'default'}`
        localStorage.setItem(key, JSON.stringify({ option1: selectedOpt1.value, option2: selectedOpt2.value }))
    } catch (e) {
        // ignore storage errors
    }
}

onMounted(() => {
    try {
        const key = `cardselect:${props.category ?? 'default'}`
        const raw = localStorage.getItem(key)
        if (!raw) return
        const parsed = JSON.parse(raw)
        selectedOpt1.value = parsed.option1 ?? null
        selectedOpt2.value = parsed.option2 ?? null
    } catch (e) {
        // ignore parse errors
    }
})
</script>

<template>
    <div class="flex flex-col">
        <div class="flex justify-between items-center p-5 gap-8 bg-white rounded-t-xl">
            <h2 class="font-bold">{{ category }}</h2>
            <button class="items-end gap-2 flex" @click="isCategoryActive = !isCategoryActive">
                <span v-if="!isCategoryActive">À compléter</span>
                <Icon v-if="!isCategoryActive" name="ic:baseline-keyboard-arrow-down" size="1.5em" />
                <Icon v-else name="ic:baseline-keyboard-arrow-up" size="1.5em" />
            </button>
        </div>
        <div v-if="!isCategoryActive" class="text-sm text-gray-600 text-left bg-white rounded-b-xl gap-2 py-2 px-5">
            <span v-if="selectedOpt1 || selectedOpt2">Sélection: </span>
            <span v-if="selectedOpt1">{{ selectedOpt1 }}</span>
            <span v-if="selectedOpt1 && selectedOpt2"> — </span>
            <span v-if="selectedOpt2">{{ selectedOpt2 }}</span>
        </div>
        <div v-if="isCategoryActive" class="p-4 bg-white rounded-b-xl flex flex-col gap-2">
            <!-- Class chips -->
            <div class="flex gap-2 flex-wrap">
                <Chip v-for="c in option1List" :key="c" :label="c" :selected="selectedOpt1 === c"
                    @toggle="() => selectedOpt1 = selectedOpt1 === c ? null : c" />
            </div>

            <div v-if="option2List && option2List.length" class="border-[0.5px] border-stone-300 my-6"></div>

                        <template v-if="option2List && option2List.length">
                            <h3 class="text-sm mb-2 text-left">Type de Bac</h3>

                            <div class="flex gap-2 flex-wrap mb-3">
                                    <Chip v-for="b in option2List" :key="b" :label="b" :selected="selectedOpt2 === b"
                                            @toggle="() => selectedOpt2 = selectedOpt2 === b ? null : b" />
                            </div>
                        </template>

            <div class="w-full">
                <button @click="confirm"
                    class="px-4 py-2 my-2 bg-stone-950 w-full text-white rounded-full">Confirmer</button>
            </div>
        </div>

    </div>
    <!-- Selection summary (small, left-aligned) -->


</template>