<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';
import { Link } from '@inertiajs/vue3';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div
        class="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#121212] p-6 md:p-10 relative overflow-hidden"
    >
        <!-- Background Gradients -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[120px]"></div>
        </div>

        <div class="w-full max-w-sm relative z-10">
            <div class="flex flex-col gap-8 bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
                <div class="flex flex-col items-center gap-4">
                    <Link
                        :href="home()"
                        class="flex flex-col items-center gap-2 font-medium"
                    >
                        <div
                            class="mb-1 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#a238ff] to-[#5d00ff] shadow-lg"
                        >
                            <AppLogoIcon
                                class="size-6 fill-current text-white"
                            />
                        </div>
                        <span class="sr-only">{{ title }}</span>
                    </Link>
                    <div class="space-y-2 text-center">
                        <h1 class="text-2xl font-bold text-white">{{ title }}</h1>
                        <p class="text-center text-sm text-gray-400">
                            {{ description }}
                        </p>
                    </div>
                </div>
                <div class="text-gray-200">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
