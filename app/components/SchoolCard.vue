<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps<{
    schoolName: string
    showEdit?: boolean
}>()

const emits = defineEmits<{
    (e: 'edit'): void
}>()

function onEdit() {
    emits('edit')
}
</script>

<template>
    <div class="w-full border rounded-xl p-5 gap-6 bg-linear-to-r from-[#FF7342] to-[#B176FF] text-white">
        <div class="flex flex-col gap-4 lg:flex-row justify-between items-start transition-all">
            <div class="flex flex-col gap-2">
                <h2 class="text-2xl text-left font-semibold">{{ schoolName }}</h2>
                <div class="flex gap-4 items-baseline">
                    <p class="">
                        <Icon name="ph:map-pin-bold" /> Lille
                    </p>
                    <p class="">
                        <Icon name="streamline:shopping-building-real-home-tower-building-house-estate" /> Lycée public
                    </p>
                </div>
            </div>
            <button v-if="props.showEdit !== false" @click="onEdit"
                class="text-stone-950 w-fit h-fit py-2 px-4 text-sm rounded-full bg-white hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Modifier
            </button>
        </div>
    </div>
</template>
