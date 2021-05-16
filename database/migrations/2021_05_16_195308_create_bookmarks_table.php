<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookmarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('01_bookmarks', function (Blueprint $table) {
            $table->id();
            $table->string('bookmark_name',255)->nullable(false);
            $table->string('bookmark_type',255)->nullable(false);
            $table->text('description')->nullable(false);
            $table->foreignId('attivita_id');
            $table->foreign('attivita_id')->on('01_attivita')->references('id')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->boolean('checked')->default(false);
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
        Schema::dropIfExists('01_bookmarks');
    }
}
