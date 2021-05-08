<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('02_photos', function (Blueprint $table) {
            $table->id();
            $table->string('name',128);
            $table->text('description')->nullable();
            $table->foreignId('album_id');
            $table->foreign('album_id')->on('02_albums')->references('id')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('img_path');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('02_photos');
    }
}
