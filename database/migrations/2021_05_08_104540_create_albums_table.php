<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlbumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('02_albums', function (Blueprint $table) {
            $table->id();
            $table->string('album_name',128)->unique()->nullable(false);
            $table->text('description')->nullable();
            $table->foreignId('user_id');
            $table->foreign('user_id')->on('users')->references('id')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('album_thumb');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('02_albums');
    }
}
