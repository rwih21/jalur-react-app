<?php

namespace Database\Seeders;

use App\Models\CareerDNA;
use Illuminate\Database\Seeder;

class CareerDNASeeder extends Seeder
{
    public function run(): void
    {
        CareerDNA::query()->delete();

        $dnas = [
            [
                'key' => 'analytical_strategist',
                'name' => 'Analytical Strategist',
                'tagline' => 'Rasional, berbasis data, dan punya angle komersial.',
                'description' => 'Kamu memecah masalah rumit menjadi bagian yang bisa diukur, lalu menyusun strategi dari bukti. Profesi yang menuntut ketajaman analisis dan judgment bisnis adalah tempatmu bersinar.',
                'trait_profile' => [
                    'analytical' => 5,
                    'leadership' => 2,
                    'communication' => 2,
                    'commercial' => 4,
                    'technical' => 3,
                    'creative' => 1,
                    'execution' => 3,
                ],
            ],
            [
                'key' => 'people_leader',
                'name' => 'People Leader',
                'tagline' => 'Pengaruh alami dan kemampuan menyatukan orang.',
                'description' => 'Kamu membangun kepercayaan, menggerakkan tim, dan berkomunikasi dengan jelas. Kamu berkembang di lingkungan yang membutuhkan kolaborasi dan kepemimpinan.',
                'trait_profile' => [
                    'analytical' => 2,
                    'leadership' => 5,
                    'communication' => 5,
                    'commercial' => 2,
                    'technical' => 1,
                    'creative' => 3,
                    'execution' => 3,
                ],
            ],
            [
                'key' => 'commercial_driver',
                'name' => 'Commercial Driver',
                'tagline' => 'Berorientasi hasil dan selalu melihat peluang nilai.',
                'description' => 'Kamu fokus pada value, revenue, dan dampak bisnis. Kamu nyaman mengambil keputusan berisiko kalau angkanya menjanjikan.',
                'trait_profile' => [
                    'analytical' => 3,
                    'leadership' => 3,
                    'communication' => 3,
                    'commercial' => 5,
                    'technical' => 1,
                    'creative' => 2,
                    'execution' => 4,
                ],
            ],
            [
                'key' => 'technical_builder',
                'name' => 'Technical Builder',
                'tagline' => 'Paham sistem dalam-dalam dan suka membangun.',
                'description' => 'Kamu nyaman dengan logika, tools, dan detail teknis. Kamu paling produktif saat diberi masalah kompleks untuk dipecahkan lewat eksplorasi dan penguasaan teknologi.',
                'trait_profile' => [
                    'analytical' => 4,
                    'leadership' => 1,
                    'communication' => 2,
                    'commercial' => 1,
                    'technical' => 5,
                    'creative' => 2,
                    'execution' => 3,
                ],
            ],
            [
                'key' => 'creative_pioneer',
                'name' => 'Creative Pioneer',
                'tagline' => 'Melihat kemungkinan yang tidak dilihat orang lain.',
                'description' => 'Kamu berpikir lewat sudut pandang baru dan nyaman dengan ide-ide yang belum terbukti. Lingkungan yang memberi ruang eksplorasi akan membuatmu berkembang pesat.',
                'trait_profile' => [
                    'analytical' => 2,
                    'leadership' => 2,
                    'communication' => 4,
                    'commercial' => 2,
                    'technical' => 2,
                    'creative' => 5,
                    'execution' => 3,
                ],
            ],
            [
                'key' => 'operational_executor',
                'name' => 'Operational Executor',
                'tagline' => 'Eksekutor andal yang mengubah rencana jadi kenyataan.',
                'description' => 'Kamu menutup loop: membuat timeline, mengoordinasikan, dan memastikan hal selesai. Kamu adalah orang yang tim andalkan saat deadline dekat.',
                'trait_profile' => [
                    'analytical' => 3,
                    'leadership' => 4,
                    'communication' => 3,
                    'commercial' => 3,
                    'technical' => 2,
                    'creative' => 1,
                    'execution' => 5,
                ],
            ],
        ];

        foreach ($dnas as $dna) {
            CareerDNA::create($dna);
        }
    }
}