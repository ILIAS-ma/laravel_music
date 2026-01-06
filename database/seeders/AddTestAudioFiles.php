<?php

namespace Database\Seeders;

use App\Models\Track;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class AddTestAudioFiles extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer les dossiers s'ils n'existent pas
        Storage::disk('public')->makeDirectory('tracks/musics');
        Storage::disk('public')->makeDirectory('tracks/images');

        // Mettre à jour les tracks existantes avec de vrais fichiers
        $tracks = Track::where('is_visible', true)->get();

        $this->command->info("📦 Création de fichiers audio et images pour {$tracks->count()} musiques...");

        foreach ($tracks as $index => $track) {
            $audioPath = "tracks/musics/test-{$index}.mp3";
            $imagePath = "tracks/images/test-{$index}.jpg";

            // Créer le fichier audio de test (fichier MP3 minimal valide)
            if (!Storage::disk('public')->exists($audioPath)) {
                $this->createValidMp3($audioPath);
            }

            // Créer une image de test
            if (!Storage::disk('public')->exists($imagePath)) {
                $this->createTestImage($imagePath, $track->title, $track->artist);
            }

            // Mettre à jour le track
            $track->update([
                'audio' => $audioPath,
                'image' => $imagePath,
            ]);

            $trackNumber = $index + 1;
            $totalTracks = $tracks->count();
            $this->command->info("✅ Track {$trackNumber}/{$totalTracks}: {$track->title}");
        }

        $this->command->info("✅ Tous les fichiers audio et images ont été créés avec succès !");
    }

    /**
     * Crée un fichier MP3 valide en téléchargeant un fichier de test
     * ou en créant un MP3 minimal mais fonctionnel
     */
    private function createValidMp3($path)
    {
        // Télécharger un fichier MP3 de test depuis une source publique
        // Fichier de test libre de droits (silence de 10 secondes)
        $testMp3Url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

        try {
            // Essayer de télécharger un fichier MP3 de test
            $response = Http::timeout(10)->get($testMp3Url);

            if ($response->successful() && $response->header('Content-Type') === 'audio/mpeg') {
                // Téléchargement réussi, sauvegarder le fichier
                Storage::disk('public')->put($path, $response->body());
                return;
            }
        } catch (\Exception $e) {
            // Si le téléchargement échoue, créer un fichier MP3 minimal
            $this->command->warn("⚠️ Impossible de télécharger le fichier de test, création d'un MP3 minimal...");
        }

        // Fallback: Créer un fichier MP3 minimal mais valide
        // Utiliser un fichier MP3 de test basique (silence)
        // Format: MPEG-1 Layer 3, 128kbps, 44.1kHz, Stereo
        $mp3Content = $this->generateMinimalMp3();

        Storage::disk('public')->put($path, $mp3Content);
    }

    /**
     * Génère un fichier MP3 minimal mais valide
     */
    private function generateMinimalMp3()
    {
        // Fichier MP3 minimal valide (1 seconde de silence)
        // Basé sur un vrai format MP3
        $mp3 = '';

        // ID3v2 tag (optionnel)
        $id3Tag = "ID3\x03\x00\x00\x00\x00\x00\x00";

        // MP3 Frame Header
        // 0xFF 0xFB = Frame sync + MPEG-1 Layer 3
        // 0x90 0x00 = Bitrate 128kbps, Sample rate 44.1kHz, Stereo
        $frameHeader = "\xFF\xFB\x90\x00";

        // Taille d'une frame à 128kbps, 44.1kHz: 417 bytes
        // Pour 1 seconde: ~38 frames
        $mp3 = $id3Tag;
        for ($i = 0; $i < 38; $i++) {
            $mp3 .= $frameHeader;
            // Données de frame (remplissage minimal)
            $mp3 .= str_repeat("\x00", 413);
        }

        return $mp3;
    }

    /**
     * Crée une image de test (SVG converti en base64 pour simuler une image)
     */
    private function createTestImage($path, $title, $artist)
    {
        // Créer une image SVG colorée avec le titre et l'artiste
        $colors = [
            ['#1db954', '#121212'],
            ['#ff6b6b', '#2d3436'],
            ['#4ecdc4', '#2d3436'],
            ['#ffe66d', '#2d3436'],
            ['#a8e6cf', '#2d3436'],
            ['#ffd93d', '#2d3436'],
            ['#6c5ce7', '#2d3436'],
            ['#fd79a8', '#2d3436'],
            ['#fdcb6e', '#2d3436'],
            ['#55efc4', '#2d3436'],
        ];

        $colorIndex = (int) substr(md5($title), 0, 1) % count($colors);
        [$color1, $color2] = $colors[$colorIndex];

        $svg = '<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:' . $color1 . ';stop-opacity:1" />
            <stop offset="100%" style="stop-color:' . $color2 . ';stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#grad)" />
    <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white"
        text-anchor="middle" dominant-baseline="middle">' . htmlspecialchars(mb_substr($title, 0, 20)) . '</text>
    <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.8)"
        text-anchor="middle" dominant-baseline="middle">' . htmlspecialchars(mb_substr($artist, 0, 25)) . '</text>
</svg>';

Storage::disk('public')->put($path, $svg);
}
}