<template>
    <MusicLayout>
        <template #title>
            Modifier une playlist
        </template>

        <template #actions>
            <Link :href="route('playlists.index')" class="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-full transition-colors">Retour</Link>
        </template>

        <template #content>
            <PlaylistForm :playlist="playlist" :tracks="tracks" />
        </template>
    </MusicLayout>
</template>

<script>
    import MusicLayout from '@/layouts/MusicLayout.vue';
    import { Link } from '@inertiajs/vue3';
    import PlaylistForm from '@/components/Playlists/PlaylistForm.vue';

    export default {
        name: 'Create',
        components: {
            Link,
            MusicLayout,
            PlaylistForm,
        },
        props: {
            playlist: Object,
            tracks: Array,
        },
    }
</script>
