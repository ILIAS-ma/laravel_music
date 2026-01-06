<template>
    <MusicLayout>
        <template #title>
            Mes clés API
        </template>

        <template #actions>
            <Link
                :href="route('playlists.index')"
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
                Retour
            </Link>
        </template>

        <template #content>
            <div v-if="$page.props.auth.user" class="mb-6">
                <h2 class="text-xl font-semibold mb-4">Créer une nouvelle clé API</h2>
                <form @submit.prevent="createKey" class="mb-8">
                    <div class="mb-4">
                        <label class="block text-gray-200 text-sm font-bold mb-2" for="name">
                            Nom de la clé
                        </label>
                        <input
                            id="name"
                            v-model="form.name"
                            class="shadow appearance-none border border-gray-600 bg-gray-800 text-white rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                            :class="{ 'border-red-500': form.errors.name }"
                            type="text"
                            placeholder="Ex: Mon application mobile"
                        >
                        <small class="text-red-500">{{ form.errors.name }}</small>
                    </div>
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Générer une clé
                    </button>
                </form>
            </div>

            <div>
                <h2 class="text-xl font-semibold mb-4">Mes clés API</h2>
                <ul v-if="apiKeys.length > 0" class="space-y-4">
                    <li
                        v-for="apiKey in apiKeys"
                        :key="apiKey.slug"
                        class="border border-gray-700 bg-gray-900 rounded p-4"
                    >
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <h3 class="font-bold text-lg">{{ apiKey.name }}</h3>
                                <div class="text-sm text-gray-300 mt-1 flex items-center gap-2">
                                    <span>Clé:</span>
                                    <code class="bg-gray-800 text-white px-2 py-1 rounded font-mono text-xs">{{ apiKey.key }}</code>
                                    <button
                                        @click="copyToClipboard(apiKey.key)"
                                        class="text-blue-400 hover:text-blue-300 text-xs underline"
                                        title="Copier la clé"
                                    >
                                        📋 Copier
                                    </button>
                                </div>
                                <p class="text-xs text-gray-400 mt-2">
                                    Créée le {{ new Date(apiKey.created_at).toLocaleDateString() }}
                                </p>
                            </div>
                            <div class="flex gap-2">
                                <button
                                    @click="editKey(apiKey)"
                                    class="text-green-500 hover:text-green-700"
                                >
                                    Modifier
                                </button>
                                <Link
                                    :href="route('api-keys.destroy', { apiKey: apiKey })"
                                    method="delete"
                                    as="button"
                                    class="text-red-500 hover:text-red-700"
                                >
                                    Supprimer
                                </Link>
                            </div>
                        </div>
                        <div v-if="editingKey && editingKey.slug === apiKey.slug" class="mt-4">
                            <form @submit.prevent="updateKey(apiKey)">
                                <div class="mb-4">
                                    <label class="block text-gray-200 text-sm font-bold mb-2" for="edit_name">
                                        Nouveau nom
                                    </label>
                                    <input
                                        id="edit_name"
                                        v-model="editForm.name"
                                        class="shadow appearance-none border border-gray-600 bg-gray-800 text-white rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                                        :class="{ 'border-red-500': editForm.errors.name }"
                                        type="text"
                                    >
                                    <small class="text-red-500">{{ editForm.errors.name }}</small>
                                </div>
                                <div class="flex gap-2">
                                    <button
                                        type="submit"
                                        :disabled="editForm.processing"
                                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Enregistrer
                                    </button>
                                    <button
                                        type="button"
                                        @click="cancelEdit"
                                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </li>
                </ul>
                <p v-else class="text-gray-400">Aucune clé API créée pour le moment.</p>
            </div>
        </template>
    </MusicLayout>
</template>

<script>
    import MusicLayout from '@/layouts/MusicLayout.vue';
    import { Link } from '@inertiajs/vue3';

    export default {
        name: 'ApiKeysIndex',
        components: {
            Link,
            MusicLayout,
        },
        props: {
            apiKeys: Array,
        },
        data() {
            return {
                form: this.$inertia.form({
                    name: '',
                }),
                editingKey: null,
                editForm: this.$inertia.form({
                    name: '',
                }),
            }
        },
        methods: {
            createKey() {
                this.form.post(route('api-keys.store'), {
                    onSuccess: () => {
                        this.form.reset();
                    }
                });
            },
            editKey(apiKey) {
                this.editingKey = apiKey;
                this.editForm.name = apiKey.name;
            },
            updateKey(apiKey) {
                this.editForm.put(route('api-keys.update', { apiKey: apiKey }), {
                    onSuccess: () => {
                        this.cancelEdit();
                    }
                });
            },
            cancelEdit() {
                this.editingKey = null;
                this.editForm.reset();
            },
            copyToClipboard(text) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Clé API copiée dans le presse-papiers !');
                }).catch(err => {
                    console.error('Erreur lors de la copie:', err);
                    // Fallback pour les navigateurs qui ne supportent pas clipboard API
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    alert('Clé API copiée dans le presse-papiers !');
                });
            }
        }
    }
</script>





