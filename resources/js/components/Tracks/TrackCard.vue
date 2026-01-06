<template>
    <div 
        class="group relative bg-[#181818] hover:bg-[#202020] p-4 rounded-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer border border-transparent hover:border-white/10"
        @click="playTrack"
    >
        <div class="relative mb-4 overflow-hidden rounded-lg shadow-lg">
            <img 
                :src="trackImage" 
                :alt="track.title"
                class="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                @error="handleImageError"
            >
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button 
                    @click.stop="playTrack"
                    class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-110 hover:bg-[#ef5466]"
                >
                    <svg v-if="!isPlaying" class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <div class="space-y-1">
            <h3 class="font-bold text-white text-[15px] truncate leading-tight group-hover:text-[#ef5466] transition-colors">{{ track.title }}</h3>
            <p class="text-xs text-gray-400 font-medium truncate hover:underline">{{ track.artist }}</p>
        </div>

        <div v-if="$page.props.auth.user?.admin" class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
            <Link
                :href="route('tracks.edit', { track: track })"
                @click.stop
                class="p-1.5 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors"
                title="Modifier"
            >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </Link>
            <button
                @click.stop="destroy"
                class="p-1.5 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                title="Supprimer"
            >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, computed } from 'vue';
import { Link, router } from '@inertiajs/vue3';

const props = defineProps({
    track: {
        type: Object,
        required: true
    },
    isPlaying: {
        type: Boolean,
        default: false
    }
});

const imageError = ref(false);

const trackImage = computed(() => {
    if (imageError.value || !props.track.image) {
        return `https://picsum.photos/seed/${props.track.id || props.track.title}/400`;
    }
    return `/storage/${props.track.image}`;
});

const handleImageError = () => {
    imageError.value = true;
};

const setCurrentTrack = inject('setCurrentTrack', null);

const playTrack = () => {
    if (setCurrentTrack) {
        setCurrentTrack(props.track);
    }
};

const destroy = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette musique ?')) {
        router.delete(route('tracks.destroy', { track: props.track }), {
            preserveScroll: true,
        });
    }
};
</script>
