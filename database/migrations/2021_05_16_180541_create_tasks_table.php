<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('01_task', function (Blueprint $table) {
            $table->id();
            $table->text('task')->nullable(false);
            $table->foreignId('attivita_id');
            $table->foreign('attivita_id')->on('01_attivita')->references('id')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->boolean('checked')->default(false);
            $table->string('tempo_previsto');
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
        Schema::dropIfExists('01_task');
    }
}
