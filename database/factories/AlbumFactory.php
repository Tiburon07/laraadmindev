<?php

namespace Database\Factories;

use App\Models\Album;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AlbumFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Album::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        //$user = User::inRandomOrder()->first();
        //$user->id;
        return [
            'album_name' => $this->faker->text(20),
            'album_thumb' => $this->faker->imageUrl(),
            'description' =>$this->faker->text(),
            'created_at' => $this->faker->dateTime(),
            'user_id' => User::factory()
        ];
    }
}
