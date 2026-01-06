<template>
    <div class="flex h-screen bg-[#000000] text-white overflow-hidden font-sans">
        <!-- Sidebar -->
        <aside class="w-64 bg-[#0a0a0a] flex flex-col border-r border-[#222] z-40 relative shadow-2xl">
            <!-- Logo -->
            <div class="p-6 mb-2">
                <div class="flex items-center gap-3 text-white group cursor-pointer">
                    <div class="relative w-8 h-8 flex items-center justify-center">
                        <div class="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        <svg class="w-8 h-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
                        </svg>
                    </div>
                    <span class="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">MusicApp</span>
                </div>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 px-4 space-y-2">
                <Link
                    :href="route('tracks.index')"
                    class="group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300"
                    :class="[
                        route().current('tracks.index') 
                            ? 'bg-gradient-to-r from-purple-600/20 to-transparent text-purple-400 font-bold border-l-2 border-purple-500' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                    ]"
                >
                    <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <span>Musiques</span>
                </Link>

                <Link
                    :href="route('playlists.index')"
                    class="group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300"
                    :class="[
                        route().current('playlists.index') 
                            ? 'bg-gradient-to-r from-green-600/20 to-transparent text-green-400 font-bold border-l-2 border-green-500' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                    ]"
                >
                     <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Playlists</span>
                </Link>

                <div v-if="$page.props.auth.user?.admin" class="pt-6 mt-6 border-t border-white/5">
                    <p class="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Zone Admin</p>
                    <Link
                        :href="route('tracks.create')"
                        class="group flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <div class="p-1.5 rounded-lg bg-white/5 group-hover:bg-white text-white group-hover:text-black transition-colors">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                            </svg>
                        </div>
                        <span class="font-medium">Ajouter un titre</span>
                    </Link>
                </div>
            </nav>

            <!-- User section -->
            <div 
                class="p-4 border-t border-white/5 bg-[#0a0a0a]"
                :class="{ 'pb-[100px]': currentTrack }"
            >
                <div v-if="$page.props.auth.user" class="flex items-center gap-3 mb-2 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-white/5">
                    <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-purple-500/20 group-hover:scale-105 transition-all">
                        <span class="text-sm font-bold text-white">{{ $page.props.auth.user.name.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-white truncate group-hover:text-purple-400 transition-colors">{{ $page.props.auth.user.name }}</p>
                        <p class="text-[11px] text-gray-500 truncate">Compte Premium</p>
                    </div>
                     <Link
                        :href="route('logout')"
                        method="post"
                        as="button"
                        class="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        title="Déconnexion"
                    >
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </Link>
                </div>
                <div v-else class="space-y-3 px-2">
                    <Link :href="route('login')" class="block w-full py-3 text-center text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/5 backdrop-blur-sm">
                        Connexion
                    </Link>
                    <Link :href="route('register')" class="block w-full py-3 text-center text-sm font-bold text-black bg-white hover:bg-gray-200 rounded-full transition-all shadow-lg hover:shadow-white/20">
                        Inscription
                    </Link>
                </div>
            </div>
        </aside>

        <!-- Main content -->
        <div class="flex-1 flex flex-col overflow-hidden bg-[#000000] relative">
            <!-- Background glow -->
            <div class="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none"></div>

            <!-- Top bar -->
            <header class="h-20 bg-transparent flex items-center justify-between px-8 z-20">
                <div class="flex items-center gap-4">
                    <button class="w-10 h-10 rounded-full bg-black/40 hover:bg-white/10 flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/5">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <button class="w-10 h-10 rounded-full bg-black/40 hover:bg-white/10 flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/5">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
                <div v-if="!$page.props.auth.user" class="flex items-center gap-4">
                    <Link
                        :href="route('login')"
                        class="px-6 py-2.5 text-sm font-bold text-gray-300 hover:text-white hover:scale-105 transition-all"
                    >
                        S'identifier
                    </Link>
                    <Link
                        :href="route('register')"
                        class="px-8 py-3 text-sm font-bold bg-white text-black rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        S'inscrire
                    </Link>
                </div>
            </header>

            <!-- Content area -->
            <main class="flex-1 overflow-y-auto p-8 relative z-10 scroll-smooth custom-scrollbar">
                <div v-if="$slots.title || $slots.actions" class="mb-10 flex items-end justify-between">
                    <div>
                        <h1 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                            <slot name="title" />
                        </h1>
                    </div>
                    <div class="flex items-center gap-4">
                        <slot name="actions" />
                    </div>
                </div>
                <slot name="content" />
            </main>
        </div>

        <!-- Audio Player -->
        <DeezerPlayer 
            v-if="currentTrack" 
            :track="currentTrack" 
            @close="currentTrack = null"
            @next="console.log('Next track')"
            @previous="console.log('Previous track')"
        />
    </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Link } from '@inertiajs/vue3';
import DeezerPlayer from '@/components/DeezerPlayer.vue';

const currentTrack = ref(null);

provide('setCurrentTrack', (track) => {
    currentTrack.value = track;
});
</script>

<style>
/* Custom Scrollbar for Webkit */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}
</style>
