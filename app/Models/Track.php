<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Track extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'artist',
        'audio_path',
        'uuid',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'uuid' => 'string',
        ];
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($track) {
            if (empty($track->uuid)) {
                $track->uuid = (string) Str::uuid();
            }
        });
    }

    /**
     * The playlists that belong to the track.
     */
    public function playlists()
    {
        return $this->belongsToMany(Playlist::class)
            ->withPivot('play_count')
            ->withTimestamps();
    }
}

