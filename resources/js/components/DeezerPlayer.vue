<template>
    <div v-if="track" class="fixed bottom-0 left-0 right-0 h-[92px] bg-[#121216] border-t border-[#32323d] flex items-center justify-between px-4 z-50">
        <!-- Track info -->
        <div class="flex items-center gap-4 w-[30%] min-w-0">
            <img 
                :src="trackImage" 
                :alt="track.title"
                class="w-[56px] h-[56px] rounded hover:brightness-75 transition-all cursor-pointer object-cover"
                @error="handleImageError"
            >
            <div class="flex-1 min-w-0 flex flex-col justify-center">
                <div class="flex items-center gap-2">
                    <a href="#" class="text-[14px] font-semibold text-white hover:underline truncate">{{ track.title }}</a>
                    <button class="text-[#a2a2a2] hover:text-[#ef5466]">
                         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    </button>
                    <button class="text-[#a2a2a2] hover:text-white">
                         <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </button>
                </div>
                <a href="#" class="text-xs text-[#a2a2a2] hover:underline truncate">{{ track.artist }}</a>
            </div>
        </div>

        <!-- Player controls -->
        <div class="flex flex-col items-center flex-1 max-w-[40%]">
            <div class="flex items-center gap-6 mb-2">
                <button 
                    @click="shuffle"
                    class="text-[#a2a2a2] hover:text-white transition-colors"
                    :class="{ 'text-[#a238ff]': isShuffled }"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                    </svg>
                </button>
                <button 
                    @click="previous"
                    class="text-white hover:text-[#a238ff] transition-colors"
                >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11 17l-5-5 5-5v10zm7 0l-5-5 5-5v10z"/>
                    </svg>
                </button>
                <button 
                    @click="togglePlay"
                    class="w-10 h-10 flex items-center justify-center bg-[#a238ff] text-white rounded-full hover:scale-105 transition-transform shadow-lg hover:shadow-[#a238ff]/40"
                >
                    <svg v-if="!isPlaying" class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                </button>
                <button 
                    @click="next"
                    class="text-white hover:text-[#a238ff] transition-colors"
                >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 7l5 5-5 5V7zM6 7l5 5-5 5V7z"/>
                    </svg>
                </button>
                <button 
                    @click="repeat"
                    class="text-[#a2a2a2] hover:text-white transition-colors"
                    :class="{ 'text-[#a238ff]': isRepeated }"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                </button>
            </div>
            
            <div class="flex items-center gap-3 w-full group">
                <span class="text-[11px] text-[#a2a2a2] w-8 text-right font-mono">{{ formatTime(currentTime) }}</span>
                <div class="flex-1 h-1 bg-[#32323d] rounded-full cursor-pointer relative" @click="seek">
                    <div 
                        class="absolute h-full bg-white rounded-full group-hover:bg-[#a238ff] transition-colors"
                        :style="{ width: progressPercent + '%' }"
                    ></div>
                     <div 
                        class="absolute h-3 w-3 bg-white rounded-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-[#a238ff]"
                        :style="{ left: progressPercent + '%' }"
                    ></div>
                </div>
                <span class="text-[11px] text-[#a2a2a2] w-8 font-mono">{{ formatTime(duration) }}</span>
            </div>
        </div>

        <!-- Volume & Options -->
        <div class="flex items-center justify-end gap-4 w-[30%]">
             <button class="text-[#a2a2a2] hover:text-white text-xs font-bold border border-[#a2a2a2] rounded px-1 group-hover:border-white">
                HIFI
            </button>
             <button class="text-[#a2a2a2] hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
             <button class="text-[#a2a2a2] hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
            </button>
            <div class="flex items-center gap-2 w-24 group">
                <button class="text-[#a2a2a2] hover:text-white" @click="toggleMute">
                     <svg v-if="volume > 0" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                    </svg>
                </button>
                <div class="flex-1 h-1 bg-[#32323d] rounded-full cursor-pointer relative" @click="setVolumeFromBar">
                    <div 
                        class="absolute h-full bg-white rounded-full group-hover:bg-[#a238ff] transition-colors"
                        :style="{ width: volume + '%' }"
                    ></div>
                     <div 
                        class="absolute h-3 w-3 bg-white rounded-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-[#a238ff]"
                        :style="{ left: volume + '%' }"
                    ></div>
                </div>
            </div>
             <button class="text-[#a2a2a2] hover:text-white">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
            </button>
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
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps({
    track: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close', 'next', 'previous']);

const audioElement = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(100);
const isShuffled = ref(false);
const isRepeated = ref(false);
const imageError = ref(false);

const progressPercent = computed(() => {
    if (duration.value === 0) return 0;
    return (currentTime.value / duration.value) * 100;
});

const audioSrc = computed(() => {
    if (!props.track?.audio) return '';
    return `/storage/${props.track.audio}`;
});

const trackImage = computed(() => {
    if (imageError.value || !props.track.image) {
        return `https://picsum.photos/seed/${props.track.id || props.track.title}/100`;
    }
    return `/storage/${props.track.image}`;
});

const handleImageError = () => {
    imageError.value = true;
};

const handleAudioError = (event) => {
    console.error('Erreur chargement audio:', event);
    isPlaying.value = false;
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
    const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    audioElement.value.currentTime = percent * duration.value;
};

const setVolumeFromBar = (event) => {
    if (!audioElement.value) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    volume.value = percent * 100;
    audioElement.value.volume = percent;
};

const toggleMute = () => {
    if (!audioElement.value) return;
    if (volume.value > 0) {
        volume.value = 0;
        audioElement.value.volume = 0;
    } else {
        volume.value = 50;
        audioElement.value.volume = 0.5;
    }
};


const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const previous = () => emit('previous');
const next = () => emit('next');
const shuffle = () => { isShuffled.value = !isShuffled.value; };
const repeat = () => { 
    isRepeated.value = !isRepeated.value; 
    if(audioElement.value) audioElement.value.loop = isRepeated.value; 
};
const onEnded = () => {
    if (!isRepeated.value) {
        // Typically go to next track
        next();
    }
};

watch(() => props.track, () => {
    if (audioElement.value) {
        audioElement.value.load();
        audioElement.value.play().then(() => {
            isPlaying.value = true;
        }).catch(() => {
            isPlaying.value = false;
        });
        currentTime.value = 0;
        imageError.value = false; // Reset error on new track
    }
});

onMounted(() => {
    if (audioElement.value) {
        audioElement.value.volume = volume.value / 100;
    }
});
</script>
