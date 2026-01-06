<template>
    <MusicLayout>
        <template #content>
            <div class="-m-8 bg-[#121212] min-h-screen p-8">
                <!-- Header -->
                <div class="max-w-4xl mx-auto mb-10 flex items-center justify-between">
                    <div>
                         <span class="text-[#1db954] text-xs font-bold tracking-widest uppercase mb-2 block">Nouvelle Piste</span>
                        <h1 class="text-4xl font-black text-white tracking-tight">Ajouter un titre</h1>
                    </div>
                     <Link :href="route('tracks.index')" class="bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-full transition-all flex items-center gap-2 group backdrop-blur-sm border border-white/5">
                        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour
                    </Link>
                </div>

                <!-- Form -->
                <form @submit.prevent="submit" class="max-w-4xl mx-auto">
                    <div class="bg-[#181818] p-8 rounded-3xl border border-white/5 shadow-2xl space-y-8">
                        
                        <!-- Title & Artist Row -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-2">
                                <label class="block text-gray-400 text-xs font-bold uppercase tracking-wider" for="title">
                                    Titre
                                </label>
                                <input
                                    id="title"
                                    v-model="form.title"
                                    class="w-full bg-[#121212] border border-[#333] rounded-xl py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-[#1db954] focus:ring-1 focus:ring-[#1db954] transition-all"
                                    :class="{ 'border-red-500': form.errors.title }"
                                    type="text"
                                    placeholder="Ex: Shape of You"
                                >
                                <p v-if="form.errors.title" class="text-red-500 text-xs mt-1">{{ form.errors.title }}</p>
                            </div>

                            <div class="space-y-2">
                                <label class="block text-gray-400 text-xs font-bold uppercase tracking-wider" for="artist">
                                    Artiste
                                </label>
                                <input
                                    id="artist"
                                    v-model="form.artist"
                                    class="w-full bg-[#121212] border border-[#333] rounded-xl py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-[#1db954] focus:ring-1 focus:ring-[#1db954] transition-all"
                                    :class="{ 'border-red-500': form.errors.artist }"
                                    type="text"
                                    placeholder="Ex: Ed Sheeran"
                                >
                                <p v-if="form.errors.artist" class="text-red-500 text-xs mt-1">{{ form.errors.artist }}</p>
                            </div>
                        </div>

                        <!-- Uploads -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <!-- Image Upload -->
                            <div class="space-y-2">
                                <label class="block text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    Pochette d'Album
                                </label>
                                <div class="relative w-full h-48 border-2 border-dashed border-[#333] hover:border-[#1db954] rounded-xl overflow-hidden transition-colors group cursor-pointer bg-[#121212]">
                                    <input 
                                        type="file" 
                                        name="image" 
                                        id="image" 
                                        @input="handleImageUpload"
                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="image/*"
                                    >
                                    <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                                        <template v-if="imagePreview">
                                            <img :src="imagePreview" alt="Preview" class="absolute inset-0 w-full h-full object-cover">
                                            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p class="text-white font-medium text-sm">Changer l'image</p>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="w-12 h-12 rounded-full bg-[#1db954]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                <svg class="w-6 h-6 text-[#1db954]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <p class="text-gray-400 text-sm font-medium">Cliquez ou glissez une image ici</p>
                                            <p class="text-gray-600 text-xs mt-1">PNG, JPG jusqu'à 2MB</p>
                                        </template>
                                    </div>
                                </div>
                                <p v-if="form.errors.image" class="text-red-500 text-xs mt-1">{{ form.errors.image }}</p>
                            </div>

                            <!-- Audio Upload -->
                            <div class="space-y-2">
                                <label class="block text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    Fichier Audio
                                </label>
                                <div class="relative w-full h-48 border-2 border-dashed border-[#333] hover:border-[#1db954] rounded-xl overflow-hidden transition-colors group cursor-pointer bg-[#121212]">
                                    <input 
                                        type="file" 
                                        name="music" 
                                        id="music" 
                                        @input="handleMusicUpload"
                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="audio/*"
                                    >
                                    <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                                        <div class="w-12 h-12 rounded-full bg-[#1db954]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <svg class="w-6 h-6 text-[#1db954]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                            </svg>
                                        </div>
                                        <p class="text-gray-400 text-sm font-medium" :class="{'text-[#1db954]': musicFileName}">
                                            {{ musicFileName || "Cliquez ou glissez un fichier audio" }}
                                        </p>
                                        <p class="text-gray-600 text-xs mt-1">MP3, WAV</p>
                                    </div>
                                </div>
                                <p v-if="form.errors.music" class="text-red-500 text-xs mt-1">{{ form.errors.music }}</p>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="pt-6 border-t border-white/5 flex justify-end">
                            <button
                                type="submit"
                                :disabled="form.processing"
                                class="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold py-4 px-10 rounded-full transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(29,185,84,0.39)] hover:shadow-[0_6px_20px_rgba(29,185,84,0.23)] hover:-translate-y-0.5"
                            >
                                <span v-if="form.processing">Chargement...</span>
                                <span v-else>Créer la musique</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </template>
    </MusicLayout>
</template>

<script>
    import MusicLayout from '@/layouts/MusicLayout.vue';
    import { Link } from '@inertiajs/vue3';

    export default {
        name: 'Create',
        components: {
            Link,
            MusicLayout,
        },
        data() {
            return {
                form: this.$inertia.form({
                    title: '',
                    artist: '',
                    image: null,
                    music: null,
                }),
                imagePreview: null,
                musicFileName: null,
            }
        },
        methods: {
            submit() {
                this.form.post(route('tracks.store'));
            },
            handleImageUpload(event) {
                const file = event.target.files[0];
                this.form.image = file;
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.imagePreview = e.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    this.imagePreview = null;
                }
            },
            handleMusicUpload(event) {
                const file = event.target.files[0];
                this.form.music = file;
                if (file) {
                    this.musicFileName = file.name;
                } else {
                    this.musicFileName = null;
                }
            }
        }
    }
</script>
