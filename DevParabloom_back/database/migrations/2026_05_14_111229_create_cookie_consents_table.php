<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCookieConsentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
{
    Schema::create('cookie_consents', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
        $table->string('ip_address', 45);
        $table->boolean('essential')->default(true);
        $table->boolean('functional')->default(false);
        $table->boolean('analytics')->default(false);
        $table->boolean('marketing')->default(false);
        $table->timestamp('consented_at');
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
        Schema::dropIfExists('cookie_consents');
    }
}
