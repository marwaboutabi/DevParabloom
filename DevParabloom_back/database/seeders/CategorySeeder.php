<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
{
    // ✅ Vider les tables avant d'insérer
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    DB::table('products')->truncate();
    DB::table('categories')->truncate();
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');

    DB::table('categories')->insert([
        ['id' => 1, 'name' => 'Visage',                   'slug' => 'visage',      'created_at' => now(), 'updated_at' => now()],
        ['id' => 2, 'name' => 'Cheveux',                  'slug' => 'cheveux',     'created_at' => now(), 'updated_at' => now()],
        ['id' => 3, 'name' => 'Corps',                    'slug' => 'corps',       'created_at' => now(), 'updated_at' => now()],
        ['id' => 4, 'name' => 'Compléments Alimentaires', 'slug' => 'complements', 'created_at' => now(), 'updated_at' => now()],
    ]);
}
}
