<template>
    <form @submit.prevent="submit" class="max-w-4xl mx-auto space-y-8">
        <div class="bg-[#181818] p-8 rounded-2xl border border-white/5">
            <div class="mb-8">
                <label class="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider" for="title">
                    Titre de la playlist
                </label>
                <input
                    id="title"
                    v-model="form.title"
                    class="w-full bg-[#121212] border border-[#333] rounded-xl py-4 px-5 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-[#1db954] focus:ring-1 focus:ring-[#1db954] transition-all"
                    :class="{ 'border-red-500': form.errors.title }"
                    type="text"
                    placeholder="Ma super playlist..."
                >
                <p v-if="form.errors.title" class="text-red-500 text-sm mt-2">{{ form.errors.title }}</p>
            </div>

            <div class="mb-8">
                <label class="block text-gray-400 text-sm font-bold mb-4 uppercase tracking-wider">
                    Sélectionner les titres ({{ form.tracks.length }})
                </label>

                <div class="max-h-[600px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                    <div
                        v-for="track in tracks"
                        :key="track.slug"
                        @click="toggleTrack(track.slug)"
                        class="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border border-transparent group hover:bg-[#282828]"
                        :class="{ 'bg-[#282828] border-[#1db954]/30': form.tracks.includes(track.slug) }"
                    >
                        <div class="relative w-12 h-12 flex-shrink-0">
                            <img 
                                :src="track.image ? `/storage/${track.image}` : `https://picsum.photos/seed/${track.id}/100`" 
                                class="w-full h-full object-cover rounded-md"
                            >
                            <div v-if="form.tracks.includes(track.slug)" class="absolute inset-0 bg-[#1db954]/80 flex items-center justify-center rounded-md backdrop-blur-[1px]">
                                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        
                        <div class="flex-1 min-w-0">
                            <h4 class="text-white font-medium truncate" :class="{ 'text-[#1db954]': form.tracks.includes(track.slug) }">
                                {{ track.title }}
                            </h4>
                            <p class="text-xs text-gray-500 truncate">{{ track.artist }}</p>
                        </div>

                        <div class="w-6 h-6 rounded-full border-2 border-gray-600 flex items-center justify-center transition-colors group-hover:border-[#1db954]"
                            :class="{ 'bg-[#1db954] border-[#1db954]': form.tracks.includes(track.slug) }">
                            <div v-if="form.tracks.includes(track.slug)" class="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end pt-6 border-t border-white/5">
                <button
                    type="submit"
                    :disabled="form.processing"
                    class="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold py-3 px-8 rounded-full transition-transform transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[#1db954]/20"
                >
                    {{ playlist ? 'Enregistrer les modifications' : 'Créer la playlist' }}
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'PlaylistForm',
        props: {
            playlist: Object,
            tracks: Array,
        },
        data() {
            return {
                form: this.$inertia.form({
                    title: this.playlist?.title ?? '',
                    tracks: this.playlist?.tracks.map(track => track.slug) ?? [],
                }),
            }
        },
        methods: {
            submit() {
                if (this.playlist) {
                    this.form.put(route('playlists.update', { playlist: this.playlist }));
                } else {
                    this.form.post(route('playlists.store'));
                }
            },
            toggleTrack(trackSlug) {
                const index = this.form.tracks.indexOf(trackSlug);
                if (index > -1) {
                    this.form.tracks.splice(index, 1);
                } else {
                    this.form.tracks.push(trackSlug);
                }
            }
        }
    }
</script>
