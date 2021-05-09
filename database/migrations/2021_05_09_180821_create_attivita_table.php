<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttivitaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('01_attivita', function (Blueprint $table) {
            $table->id();
            $table->string('title',128)->unique()->nullable(false);
            $table->string('fsn',128)->nullable(false);
            $table->text('description')->nullable();
            $table->foreignId('user_id');
            $table->foreign('user_id')->on('users')->references('id')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->integer('status_id');
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
        Schema::dropIfExists('01_attivita');
    }
}
