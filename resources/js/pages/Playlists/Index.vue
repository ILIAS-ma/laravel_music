<template>
    <MusicLayout>
        <template #content>
            <div class="-m-8 bg-[#121212] min-h-screen">
                <!-- Hero Section -->
                <div class="relative bg-gradient-to-b from-[#1db954] via-[#114a2b] to-[#121212] pt-20 pb-28 px-8 overflow-hidden">
                    <div class="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
                    
                    <div class="relative max-w-8xl mx-auto z-10">
                        <div class="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                            <div class="space-y-4">
                                <span class="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white tracking-wider uppercase">
                                    Vos Collections
                                </span>
                                <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                                    Mes <br/>
                                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 animate-text">
                                        Playlists
                                    </span>
                                </h1>
                            </div>
                            
                            <Link
                                :href="route('playlists.create')"
                                class="group px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-3"
                            >
                                <div class="bg-black text-white rounded-full p-1 group-hover:rotate-90 transition-transform">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                                </div>
                                <span>Créer une playlist</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <!-- Playlists Grid -->
                <div class="px-8 -mt-10 relative z-20 pb-20">
                    <div class="max-w-8xl mx-auto">
                        <div v-if="playlists.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            <div
                                v-for="playlist in playlists"
                                :key="playlist.slug"
                                class="group relative bg-[#181818] hover:bg-[#202020] p-4 rounded-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10 cursor-pointer border border-transparent hover:border-white/10"
                                @click="router.visit(route('playlists.edit', { playlist: playlist }))"
                            >
                                <div class="relative mb-4 overflow-hidden rounded-lg shadow-lg aspect-square">
                                    <div class="w-full h-full bg-gradient-to-br from-[#1db954] to-[#1a1a1a] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                        <div class="text-center p-6">
                                            <span class="block text-4xl font-bold text-white/20 mb-2">#{{ playlist.id }}</span>
                                            <svg class="w-16 h-16 text-white opacity-50 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <!-- Hover Play Button Overlay -->
                                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                                        <button class="w-16 h-16 bg-[#1db954] text-white rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-all duration-300 shadow-xl hover:bg-[#1ed760]">
                                            <svg class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div class="space-y-1">
                                    <h3 class="font-bold text-white text-xl truncate group-hover:text-[#1db954] transition-colors">{{ playlist.title }}</h3>
                                    <p class="text-sm text-gray-400 font-medium">{{ playlist.tracks_count || 0 }} titres</p>
                                </div>

                                <!-- Action Buttons -->
                                <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    <Link
                                        :href="route('playlists.edit', { playlist: playlist })"
                                        @click.stop
                                        class="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors"
                                        title="Modifier"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    </Link>
                                    <Link
                                        :href="route('playlists.destroy', { playlist: playlist })"
                                        method="delete"
                                        as="button"
                                        @click.stop
                                        class="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                                        title="Supprimer"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-else class="flex flex-col items-center justify-center py-32 text-center bg-[#181818]/50 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <div class="w-24 h-24 bg-[#1db954]/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <svg class="w-10 h-10 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-2">Votre bibliothèque est vide</h3>
                            <p class="text-gray-400 mb-8 max-w-md">Créez votre première playlist et commencez à organiser vos titres préférés dès maintenant.</p>
                            <Link
                                :href="route('playlists.create')"
                                class="inline-flex items-center px-8 py-3 bg-[#1db954] hover:bg-[#1ed760] text-black font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(29,185,84,0.3)]"
                            >
                                Créer une playlist
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </MusicLayout>
</template>

<script setup>
import MusicLayout from '@/layouts/MusicLayout.vue';
import { Link, router } from '@inertiajs/vue3';

defineProps({
    playlists: Array
});
</script>
