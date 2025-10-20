<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue'
import SchoolCard from './SchoolCard.vue'
import Spinner from './Spinner.vue'

const { data, pending, error } = await useFetch('/api/schools')

</script>

<template>
    <div>
        <h1 class="text-2xl font-bold mt-10">En quelle classe es-tu?</h1>

        <div class="mt-6 space-y-4">
            <template v-if="data">
                <SchoolCard
                    v-for="s in data.data"
                    :key="s"
                    :school-name="s"
                    @edit="() => console.log('edit', s)"
                />
            </template>
            <div v-else class="text-gray-500">
                <Spinner />
            </div>
        </div>
    </div>
</template>