<?php

namespace App\Console\Commands;

use App\Models\ApiKey;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CreateApiKey extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api-key:create {email=admin@gmail.com} {name=Clé API}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Créer une clé API pour un utilisateur';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $name = $this->argument('name');

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("Utilisateur avec l'email {$email} introuvable.");
            return 1;
        }

        $apiKey = ApiKey::create([
            'slug' => 'key-' . Str::uuid(),
            'user_id' => $user->id,
            'name' => $name,
            'key' => ApiKey::generateKey(),
        ]);

        $this->info("✅ Clé API créée avec succès !");
        $this->line("Nom: {$apiKey->name}");
        $this->line("Clé: {$apiKey->key}");
        $this->newLine();
        $this->line("Utilisez cette clé dans vos requêtes :");
        $this->line("curl.exe -X GET http://localhost:8000/api/playlists -H \"x-api-key: {$apiKey->key}\" -H \"Accept: application/json\"");

        return 0;
    }
}
