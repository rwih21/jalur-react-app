<?php

namespace Database\Seeders;

use App\Models\AssessmentQuestion;
use Illuminate\Database\Seeder;

class AssessmentQuestionSeeder extends Seeder
{
    public function run(): void
    {
        AssessmentQuestion::query()->delete();

        $questions = [
            [
                'question_text' => 'Sebuah proyek kelompok macet karena tujuannya kurang jelas. Apa yang pertama kali kamu lakukan?',
                'options' => [
                    ['text' => 'Mengumpulkan data dan memecah masalahnya sampai gambaran besarnya jelas.', 'trait' => 'analytical', 'points' => 4],
                    ['text' => 'Mengumpulkan tim, menyepakati prioritas, dan membagi peran dengan jelas.', 'trait' => 'leadership', 'points' => 3],
                    ['text' => 'Langsung mengerjakan bagian yang bisa dieksekusi, biar tim melihat momentum.', 'trait' => 'execution', 'points' => 2],
                    ['text' => 'Mencari tahu apa yang paling dihargai oleh pihak yang menilai hasil proyek ini.', 'trait' => 'commercial', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Kamu menemukan kesalahan pada analisis yang dibuat rekanmu. Bagaimana kamu menyampaikannya?',
                'options' => [
                    ['text' => 'Menjelaskan temuannya dengan tenang dan jelas, lalu berdiskusi dua arah.', 'trait' => 'communication', 'points' => 4],
                    ['text' => 'Menunjukkan data yang membuktikan kesalahan itu secara objektif.', 'trait' => 'analytical', 'points' => 3],
                    ['text' => 'Mengajak rekan itu memperbaikinya bersama dan menyusun rencana lanjutan.', 'trait' => 'leadership', 'points' => 2],
                    ['text' => 'Membuat versi perhitungan yang lebih akurat, lalu menunjukkannya.', 'trait' => 'technical', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Tim disuruh membuat produk atau ide baru. Hal pertama yang terlintas di pikiranmu?',
                'options' => [
                    ['text' => 'Siapa yang akan membayar, dan apakah ini menguntungkan?', 'trait' => 'commercial', 'points' => 4],
                    ['text' => 'Apakah teknologinya tersedia dan bisa dibangun dalam skala besar?', 'trait' => 'technical', 'points' => 3],
                    ['text' => 'Bagaimana cara mengukur dampaknya secara objektif?', 'trait' => 'analytical', 'points' => 2],
                    ['text' => 'Siapa yang mengerjakan apa, dan kapan harus selesai.', 'trait' => 'execution', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Kamu diminta membuat presentasi pitching yang berbeda dari biasanya. Kamu akan...',
                'options' => [
                    ['text' => 'Membuat struktur cerita yang tidak biasa dan memorable.', 'trait' => 'creative', 'points' => 4],
                    ['text' => 'Menyusun narasi yang mudah diikuti audiens non-teknis.', 'trait' => 'communication', 'points' => 3],
                    ['text' => 'Menentukan jadwal latihan dan menyiapkan slide cadangan.', 'trait' => 'execution', 'points' => 2],
                    ['text' => 'Menunjuk siapa yang bicara untuk tiap bagian.', 'trait' => 'leadership', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Kamu diberi tools atau model yang belum pernah kamu pakai. Reaksimu?',
                'options' => [
                    ['text' => 'Mengeksplorasi dokumentasinya dan mencoba sampai benar-benar paham.', 'trait' => 'technical', 'points' => 4],
                    ['text' => 'Langsung memakainya untuk tugas kecil dan belajar sambil jalan.', 'trait' => 'execution', 'points' => 3],
                    ['text' => 'Mengevaluasi apakah tool ini benar-benar menghemat biaya dan waktu.', 'trait' => 'commercial', 'points' => 2],
                    ['text' => 'Membandingkannya dengan tool lain secara sistematis.', 'trait' => 'analytical', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Tim sedang terpecah antara dua strategi. Peranmu biasanya...',
                'options' => [
                    ['text' => 'Membawa tim memilih satu arah dan berkomitmen ke sana.', 'trait' => 'leadership', 'points' => 4],
                    ['text' => 'Menyampaikan pandangan kedua sisi supaya semua orang paham.', 'trait' => 'communication', 'points' => 3],
                    ['text' => 'Mengusulkan opsi ketiga yang di luar dua pilihan itu.', 'trait' => 'creative', 'points' => 2],
                    ['text' => 'Membuat timeline eksekusi begitu keputusan diambil.', 'trait' => 'execution', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Menghadapi masalah bisnis yang rumit, kamu cenderung...',
                'options' => [
                    ['text' => 'Membedahnya jadi faktor-faktor yang bisa diukur.', 'trait' => 'analytical', 'points' => 4],
                    ['text' => 'Membayangkan solusi dari sudut pandang yang belum dipikirkan orang.', 'trait' => 'creative', 'points' => 3],
                    ['text' => 'Mengutamakan solusi yang paling cepat menghasilkan nilai.', 'trait' => 'commercial', 'points' => 2],
                    ['text' => 'Membangun prototype sederhana untuk menguji asumsi.', 'trait' => 'technical', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Deadline sudah mepet dan masih banyak yang harus dikerjakan. Kamu...',
                'options' => [
                    ['text' => 'Membuat daftar prioritas dan bekerja sampai semuanya kelar.', 'trait' => 'execution', 'points' => 4],
                    ['text' => 'Mengoordinasikan tim supaya tiap orang fokus pada bagiannya.', 'trait' => 'leadership', 'points' => 3],
                    ['text' => 'Melaporkan progress ke stakeholder dan mengatur ekspektasi.', 'trait' => 'communication', 'points' => 2],
                    ['text' => 'Menilai ulang cakupan yang bisa dipangkas tanpa mengorbankan kualitas.', 'trait' => 'analytical', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Kamu melihat peluang baru di pasar. Langkah pertamamu?',
                'options' => [
                    ['text' => 'Menghitung potensi revenue dan biaya masuknya.', 'trait' => 'commercial', 'points' => 4],
                    ['text' => 'Membayangkan positioning merek yang belum ada di pasar.', 'trait' => 'creative', 'points' => 3],
                    ['text' => 'Mengecek kelayakan teknis dan data yang diperlukan.', 'trait' => 'technical', 'points' => 2],
                    ['text' => 'Membicarakan idenya ke calon pengguna untuk validasi awal.', 'trait' => 'communication', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Hasil kerjamu dikritik keras di depan umum. Kamu akan...',
                'options' => [
                    ['text' => 'Mendengarkan, bertanya untuk memperjelas, dan merangkum poin perbaikannya.', 'trait' => 'communication', 'points' => 4],
                    ['text' => 'Langsung menyusun rencana perbaikan dan mengeksekusinya.', 'trait' => 'execution', 'points' => 3],
                    ['text' => 'Melihat kritik itu sebagai pintu untuk mencoba pendekatan baru.', 'trait' => 'creative', 'points' => 2],
                    ['text' => 'Menghitung dampak kritik itu terhadap hasil akhir tim.', 'trait' => 'commercial', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Tantangan teknis yang belum pernah kamu hadapi muncul. Kamu...',
                'options' => [
                    ['text' => 'Meneliti cara terbaik dan langsung mencoba implementasinya.', 'trait' => 'technical', 'points' => 4],
                    ['text' => 'Membuat hipotesis dan mengujinya dengan data.', 'trait' => 'analytical', 'points' => 3],
                    ['text' => 'Mengumpulkan orang yang tepat untuk memecahkannya bersama.', 'trait' => 'leadership', 'points' => 2],
                    ['text' => 'Menemukan cara pandang yang membuat masalahnya jadi menarik.', 'trait' => 'creative', 'points' => 1],
                ],
            ],
            [
                'question_text' => 'Persaingan semakin sulit. Kamu lebih suka...',
                'options' => [
                    ['text' => 'Membedakan diri dengan ide yang tidak biasa.', 'trait' => 'creative', 'points' => 4],
                    ['text' => 'Mencari celah pasar yang paling menguntungkan.', 'trait' => 'commercial', 'points' => 3],
                    ['text' => 'Menyatukan tim dan merumuskan strategi kolektif.', 'trait' => 'leadership', 'points' => 2],
                    ['text' => 'Meningkatkan efisiensi operasional dengan sistem yang lebih baik.', 'trait' => 'technical', 'points' => 1],
                ],
            ],
        ];

        foreach ($questions as $i => $question) {
            AssessmentQuestion::create([
                'question_text' => $question['question_text'],
                'options' => $question['options'],
                'sort_order' => $i + 1,
            ]);
        }
    }
}