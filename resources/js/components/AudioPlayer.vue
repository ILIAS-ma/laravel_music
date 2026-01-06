<template>
    <div v-if="track" class="fixed bottom-0 left-0 right-0 h-24 bg-[#181818] border-t border-gray-800 flex items-center justify-between px-6 z-50">
        <!-- Track info -->
        <div class="flex items-center gap-4 flex-1 min-w-0">
            <img 
                :src="`/storage/${track.image}`" 
                :alt="track.title"
                class="w-14 h-14 rounded object-cover"
            >
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-white truncate">{{ track.title }}</p>
                <p class="text-xs text-gray-400 truncate">{{ track.artist }}</p>
            </div>
            <button 
                @click="$emit('close')"
                class="p-2 text-gray-400 hover:text-white transition-colors"
            >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </button>
        </div>

        <!-- Player controls -->
        <div class="flex flex-col items-center gap-2 flex-1">
            <div class="flex items-center gap-4">
                <button 
                    @click="shuffle"
                    class="p-2 text-gray-400 hover:text-white transition-colors"
                    :class="{ 'text-[#1db954]': isShuffled }"
                >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H1v-2h1c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 5h1.78c.61 0 1.18.28 1.59.69L21 8.5v5l-2.5 2.5c-.41.41-.98.69-1.59.69H16v-2h1.78l1.5-1.5V9.5l-1.5-1.5H16V5zm-4 0v2h-1.5l-1.5-1.5V5H12zm-4 0v2H6.5l-1.5-1.5V5H8zm-4 0v2H4.5L3 5.5V5h1z"/>
                    </svg>
                </button>
                <button 
                    @click="previous"
                    class="p-2 text-gray-400 hover:text-white transition-colors"
                >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
                    </svg>
                </button>
                <button 
                    @click="togglePlay"
                    class="p-3 bg-white text-black rounded-full hover:scale-105 transition-transform"
                >
                    <svg v-if="!isPlaying" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                    <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                </button>
                <button 
                    @click="next"
                    class="p-2 text-gray-400 hover:text-white transition-colors"
                >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0011 6v2.798l-5.445-3.63z"/>
                    </svg>
                </button>
                <button 
                    @click="repeat"
                    class="p-2 text-gray-400 hover:text-white transition-colors"
                    :class="{ 'text-[#1db954]': isRepeated }"
                >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
            <div class="flex items-center gap-2 w-full max-w-md">
                <span class="text-xs text-gray-400 w-10">{{ formatTime(currentTime) }}</span>
                <div class="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer" @click="seek">
                    <div 
                        class="h-1 bg-white rounded-full transition-all"
                        :style="{ width: progressPercent + '%' }"
                    ></div>
                </div>
                <span class="text-xs text-gray-400 w-10">{{ formatTime(duration) }}</span>
            </div>
        </div>

        <!-- Volume control -->
        <div class="flex items-center gap-2 flex-1 justify-end">
            <button class="p-2 text-gray-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4.38-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"/>
                </svg>
            </button>
            <div class="flex items-center gap-2 w-24">
                <div class="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer">
                    <div 
                        class="h-1 bg-white rounded-full"
                        :style="{ width: volumePercent + '%' }"
                    ></div>
                </div>
            </div>
        </div>

        <!-- Hidden audio element -->
        <audio
            ref="audioElement"
            :src="audioSrc"
            @timeupdate="updateTime"
            @loadedmetadata="updateDuration"
            @ended="onEnded"
            @error="handleAudioError"
        ></audio>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    track: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close']);

const audioElement = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(100);
const isShuffled = ref(false);
const isRepeated = ref(false);

const progressPercent = computed(() => {
    if (duration.value === 0) return 0;
    return (currentTime.value / duration.value) * 100;
});

const volumePercent = computed(() => volume.value);

const audioSrc = computed(() => {
    if (!props.track?.audio) return '';
    return `/storage/${props.track.audio}`;
});

const handleAudioError = (event) => {
    console.error('Erreur de chargement audio:', event);
    isPlaying.value = false;
    
    // Vérifier le type d'erreur
    const audio = event.target;
    let errorMessage = 'Le fichier audio est introuvable.';
    
    if (audio.error) {
        switch (audio.error.code) {
            case audio.error.MEDIA_ERR_ABORTED:
                errorMessage = 'Le chargement du fichier audio a été annulé.';
                break;
            case audio.error.MEDIA_ERR_NETWORK:
                errorMessage = 'Erreur réseau lors du chargement du fichier audio.';
                break;
            case audio.error.MEDIA_ERR_DECODE:
                errorMessage = 'Le fichier audio est corrompu ou dans un format non supporté.';
                break;
            case audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                errorMessage = 'Le format audio n\'est pas supporté. Utilisez un fichier MP3 valide.';
                break;
        }
    }
    
    errorMessage += '\n\nPour ajouter une musique avec un vrai fichier audio :\n';
    errorMessage += '1. Connectez-vous en tant qu\'admin\n';
    errorMessage += '2. Cliquez sur "+ Ajouter une musique"\n';
    errorMessage += '3. Uploadez un fichier MP3 valide';
    
    alert(errorMessage);
};

const togglePlay = () => {
    if (!audioElement.value) return;
    
    if (isPlaying.value) {
        audioElement.value.pause();
    } else {
        audioElement.value.play();
    }
    isPlaying.value = !isPlaying.value;
};

const updateTime = () => {
    if (audioElement.value) {
        currentTime.value = audioElement.value.currentTime;
    }
};

const updateDuration = () => {
    if (audioElement.value) {
        duration.value = audioElement.value.duration;
    }
};

const seek = (event) => {
    if (!audioElement.value) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    audioElement.value.currentTime = percent * duration.value;
};

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const previous = () => {
    // TODO: Implement previous track
};

const next = () => {
    // TODO: Implement next track
};

const shuffle = () => {
    isShuffled.value = !isShuffled.value;
};

const repeat = () => {
    isRepeated.value = !isRepeated.value;
    if (audioElement.value) {
        audioElement.value.loop = isRepeated.value;
    }
};

const onEnded = () => {
    isPlaying.value = false;
    currentTime.value = 0;
};

watch(() => props.track, () => {
    if (audioElement.value) {
        audioElement.value.load();
        isPlaying.value = false;
        currentTime.value = 0;
    }
});

onMounted(() => {
    if (audioElement.value) {
        audioElement.value.volume = volume.value / 100;
    }
});

onUnmounted(() => {
    if (audioElement.value) {
        audioElement.value.pause();
    }
});
</script>

