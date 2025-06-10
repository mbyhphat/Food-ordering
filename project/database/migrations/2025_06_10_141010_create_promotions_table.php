<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('promotions', function (Blueprint $table) {
        $table->id();
        $table->string('code')->unique();
        $table->text('description');
        $table->float('discount_percentage')->default(0);
        $table->float('min_order_value')->default(0);
        $table->date('start_date');
        $table->date('end_date');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
