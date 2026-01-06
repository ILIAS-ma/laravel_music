<?php

namespace Database\Seeders;

use App\Models\ApiKey;
use App\Models\Playlist;
use App\Models\Track;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Créer un utilisateur admin par défaut
        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'admin' => true,
        ]);

        // Créer quelques utilisateurs normaux
        User::factory(5)->create();

        // Créer des musiques (50 tracks) - toutes visibles
        $tracks = Track::factory(50)->create([
            'is_visible' => true,
        ]);

        // Créer quelques playlists pour l'admin avec des musiques
        $playlist1 = Playlist::create([
            'slug' => 'ply-' . \Illuminate\Support\Str::uuid(),
            'user_id' => $admin->id,
            'title' => 'Ma Playlist Favorie',
        ]);
        $playlist1->tracks()->attach($tracks->random(10)->pluck('id'));

        $playlist2 = Playlist::create([
            'slug' => 'ply-' . \Illuminate\Support\Str::uuid(),
            'user_id' => $admin->id,
            'title' => 'Musiques Chill',
        ]);
        $playlist2->tracks()->attach($tracks->random(8)->pluck('id'));

        // Créer une clé API pour l'admin
        $apiKey = ApiKey::create([
            'slug' => 'key-' . \Illuminate\Support\Str::uuid(),
            'user_id' => $admin->id,
            'name' => 'Clé API Admin',
            'key' => ApiKey::generateKey(),
        ]);

        $this->command->info('✅ Base de données seedée avec succès !');
        $this->command->info('👤 Admin créé : admin@gmail.com / admin123');
        $this->command->info('🔑 Clé API créée : ' . $apiKey->key);
    }
}