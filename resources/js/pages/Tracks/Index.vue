<template>
    <MusicLayout>
        <template #content>
            <div class="-m-8 bg-[#121212] min-h-screen">
                <!-- Hero Section -->
                <div class="relative bg-gradient-to-b from-[#4c1d95] via-[#1e1b4b] to-[#121212] pt-20 pb-28 px-8 overflow-hidden">
                    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
                    
                    <div class="relative max-w-8xl mx-auto z-10">
                        <div class="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                            <div class="space-y-4">
                                <span class="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white tracking-wider uppercase">
                                    Bibliothèque Musicale
                                </span>
                                <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                                    Découvrez <br/>
                                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-text">
                                        l'Inspiration
                                    </span>
                                </h1>
                            </div>
                            
                            <Link
                                v-if="$page.props.auth.user?.admin"
                                :href="route('tracks.create')"
                                class="group px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-3"
                            >
                                <div class="bg-black text-white rounded-full p-1 group-hover:rotate-90 transition-transform">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                                </div>
                                <span>Ajouter un titre</span>
                            </Link>
                        </div>

                        <!-- Search Bar floating -->
                        <div class="relative max-w-2xl">
                            <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </div>
                            <input
                                v-model="search"
                                type="text"
                                class="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/10 rounded-2xl text-lg text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-purple-500/50 backdrop-blur-xl transition-all shadow-xl"
                                placeholder="Rechercher des artistes, titres ou genres..."
                            >
                        </div>
                    </div>
                </div>

                <!-- Content Grid -->
                <div class="px-8 -mt-10 relative z-20 pb-20">
                    <div v-if="filteredTracks.length > 0" class="max-w-8xl mx-auto">
                        <div class="flex items-center justify-between mb-8">
                            <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                                <span class="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                                Tendances Actuelles
                            </h2>
                            <span class="text-sm text-gray-400 font-medium">{{ filteredTracks.length }} titres trouvés</span>
                        </div>
                        
                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            <TrackCard
                                v-for="track in filteredTracks"
                                :key="track.slug"
                                :track="track"
                            />
                        </div>
                    </div>
                    
                    <div v-else class="flex flex-col items-center justify-center py-32 text-center">
                        <div class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Aucun résultat</h3>
                        <p class="text-gray-400">Essayez de rechercher autre chose.</p>
                    </div>
                </div>
            </div>
        </template>
    </MusicLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import MusicLayout from '@/layouts/MusicLayout.vue';
import TrackCard from '@/components/Tracks/TrackCard.vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    tracks: Array
});

const search = ref('');

const filteredTracks = computed(() => {
    if (!search.value) return props.tracks;
    const query = search.value.toLowerCase();
    return props.tracks.filter(track => 
        track.title.toLowerCase().includes(query) || 
        track.artist.toLowerCase().includes(query)
    );
});
</script>
