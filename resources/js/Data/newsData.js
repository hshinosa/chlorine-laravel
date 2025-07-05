// Mock data untuk aplikasi berita
export const newsData = {
    // Artikel utama/featured
    featuredArticles: [
        {
            id: 1,
            title: "Pemerintah Luncurkan Program Digitalisasi UMKM Nasional",
            excerpt: "Inisiatif baru untuk mendorong transformasi digital usaha mikro, kecil, dan menengah di seluruh Indonesia dengan target 1 juta UMKM pada tahun ini.",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
            category: "Ekonomi",
            author: "Ahmad Rizki",
            publishedAt: "2025-01-05 14:30:00",
            readTime: "5 menit",
            views: 15420,
            slug: "pemerintah-luncurkan-program-digitalisasi-umkm-nasional"
        },
        {
            id: 2,
            title: "Breakthrough AI Indonesia Raih Penghargaan Internasional",
            excerpt: "Tim peneliti dari universitas terkemuka berhasil mengembangkan teknologi AI yang mendapat pengakuan di ajang teknologi dunia.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
            category: "Teknologi",
            author: "Sari Dewi",
            publishedAt: "2025-01-05 12:15:00",
            readTime: "7 menit",
            views: 8930,
            slug: "breakthrough-ai-indonesia-raih-penghargaan-internasional"
        }
    ],

    // Artikel trending
    trendingArticles: [
        {
            id: 3,
            title: "Timnas Indonesia Lolos ke Semifinal Piala Asia U-23",
            excerpt: "Prestasi gemilang skuad Garuda Muda yang berhasil mengalahkan juara bertahan dengan skor 2-1.",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
            category: "Olahraga",
            author: "Budi Santoso",
            publishedAt: "2025-01-05 16:45:00",
            readTime: "4 menit",
            views: 12870,
            slug: "timnas-indonesia-lolos-semifinal-piala-asia-u23"
        },
        {
            id: 4,
            title: "Tren Fashion Sustainable Semakin Diminati Milenial",
            excerpt: "Kesadaran lingkungan mendorong generasi muda memilih brand fashion yang ramah lingkungan.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
            category: "Lifestyle",
            author: "Maya Putri",
            publishedAt: "2025-01-05 10:20:00",
            readTime: "6 menit",
            views: 7650,
            slug: "tren-fashion-sustainable-diminati-milenial"
        },
        {
            id: 5,
            title: "Inflasi Indonesia Turun ke Level Terendah dalam 3 Tahun",
            excerpt: "Bank Indonesia optimis dengan stabilitas ekonomi dan proyeksi pertumbuhan positif tahun ini.",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
            category: "Ekonomi",
            author: "Fandi Pratama",
            publishedAt: "2025-01-05 08:30:00",
            readTime: "5 menit",
            views: 9240,
            slug: "inflasi-indonesia-turun-level-terendah"
        }
    ],

    // Artikel terbaru
    latestArticles: [
        {
            id: 6,
            title: "Startup Fintech Indonesia Ekspansi ke Asia Tenggara",
            excerpt: "Langkah strategis perusahaan teknologi finansial lokal untuk memperluas jangkauan layanan.",
            image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
            category: "Teknologi",
            author: "Rina Sari",
            publishedAt: "2025-01-05 17:00:00",
            readTime: "4 menit",
            views: 3420,
            slug: "startup-fintech-indonesia-ekspansi-asia-tenggara"
        },
        {
            id: 7,
            title: "Kebijakan Energi Terbarukan Dukung Target Net Zero 2060",
            excerpt: "Pemerintah percepat transisi energi dengan investasi masif di sektor energi terbarukan.",
            image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop",
            category: "Politik",
            author: "Joko Widodo",
            publishedAt: "2025-01-05 15:45:00",
            readTime: "6 menit",
            views: 5680,
            slug: "kebijakan-energi-terbarukan-target-net-zero-2060"
        },
        {
            id: 8,
            title: "Liga 1 Indonesia Siap Terapkan VAR Musim Depan",
            excerpt: "Teknologi Video Assistant Referee akan diimplementasikan untuk meningkatkan kualitas wasit.",
            image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop",
            category: "Olahraga",
            author: "Andi Kurniawan",
            publishedAt: "2025-01-05 13:20:00",
            readTime: "3 menit",
            views: 4750,
            slug: "liga-1-indonesia-siap-terapkan-var-musim-depan"
        },
        {
            id: 9,
            title: "Festival Kuliner Nusantara Hadirkan 100 Menu Tradisional",
            excerpt: "Acara tahunan untuk melestarikan warisan kuliner Indonesia dengan sentuhan modern.",
            image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=250&fit=crop",
            category: "Lifestyle",
            author: "Dewi Maharani",
            publishedAt: "2025-01-05 11:30:00",
            readTime: "5 menit",
            views: 6890,
            slug: "festival-kuliner-nusantara-100-menu-tradisional"
        }
    ],

    // Kategori populer
    categories: [
        { id: 1, name: "Politik", slug: "politik", color: "bg-red-100 text-red-800", count: 45 },
        { id: 2, name: "Ekonomi", slug: "ekonomi", color: "bg-green-100 text-green-800", count: 38 },
        { id: 3, name: "Teknologi", slug: "teknologi", color: "bg-blue-100 text-blue-800", count: 52 },
        { id: 4, name: "Olahraga", slug: "olahraga", color: "bg-orange-100 text-orange-800", count: 29 },
        { id: 5, name: "Lifestyle", slug: "lifestyle", color: "bg-purple-100 text-purple-800", count: 34 }
    ],

    // Data untuk detail artikel
    articleDetail: {
        id: 1,
        title: "Pemerintah Luncurkan Program Digitalisasi UMKM Nasional",
        content: `
            <p>Jakarta - Pemerintah Indonesia secara resmi meluncurkan Program Digitalisasi UMKM Nasional yang bertujuan untuk mendorong transformasi digital usaha mikro, kecil, dan menengah di seluruh Indonesia. Program ambisius ini menargetkan 1 juta UMKM untuk go digital dalam tahun 2025.</p>
            
            <p>Menteri Koperasi dan UKM, Teten Masduki, dalam acara peluncuran di Jakarta, menyatakan bahwa program ini merupakan langkah strategis untuk meningkatkan daya saing UMKM Indonesia di era digital. "Kami berkomitmen untuk membantu UMKM Indonesia memasuki era digital dengan menyediakan platform, pelatihan, dan pendampingan yang komprehensif," ujar Teten.</p>
            
            <h3>Fitur Utama Program</h3>
            <p>Program ini menawarkan berbagai fitur unggulan untuk mendukung UMKM, antara lain:</p>
            <ul>
                <li>Platform e-commerce terintegrasi</li>
                <li>Sistem manajemen keuangan digital</li>
                <li>Pelatihan digital marketing</li>
                <li>Akses ke marketplace nasional dan internasional</li>
                <li>Konsultasi bisnis gratis</li>
            </ul>
            
            <p>Direktur Jenderal Pemberdayaan UMKM menambahkan bahwa program ini akan dilaksanakan dalam tiga fase. Fase pertama akan dimulai di 10 provinsi prioritas, kemudian diperluas ke seluruh Indonesia pada fase kedua dan ketiga.</p>
            
            <h3>Dukungan Teknologi</h3>
            <p>Untuk mendukung program ini, pemerintah bekerja sama dengan beberapa perusahaan teknologi terkemuka dalam negeri. Partnership strategis ini memastikan bahwa solusi yang ditawarkan sesuai dengan kebutuhan dan karakteristik UMKM Indonesia.</p>
            
            <p>Program Digitalisasi UMKM Nasional diharapkan dapat meningkatkan kontribusi UMKM terhadap PDB Indonesia yang saat ini mencapai 60%, menjadi 65% pada akhir tahun 2025.</p>
        `,
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop",
        category: "Ekonomi",
        author: {
            name: "Ahmad Rizki",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            bio: "Jurnalis ekonomi dengan pengalaman 8 tahun meliput perkembangan UMKM dan startup di Indonesia."
        },
        publishedAt: "2025-01-05 14:30:00",
        readTime: "5 menit",
        views: 15420,
        tags: ["UMKM", "Digitalisasi", "Ekonomi Digital", "Kementerian", "Startup"],
        slug: "pemerintah-luncurkan-program-digitalisasi-umkm-nasional"
    },

    // Artikel terkait
    relatedArticles: [
        {
            id: 10,
            title: "UMKM Indonesia Tumbuh 15% di Sektor Digital",
            excerpt: "Pertumbuhan signifikan UMKM digital selama pandemic mendorong optimisme ekonomi nasional.",
            image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=400&h=250&fit=crop",
            category: "Ekonomi",
            publishedAt: "2025-01-04 09:15:00",
            slug: "umkm-indonesia-tumbuh-15-persen-sektor-digital"
        },
        {
            id: 11,
            title: "Marketplace Lokal Dominasi Transaksi E-commerce Indonesia",
            excerpt: "Platform perdagangan elektronik dalam negeri menguasai 70% transaksi online nasional.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
            category: "Teknologi",
            publishedAt: "2025-01-03 14:20:00",
            slug: "marketplace-lokal-dominasi-transaksi-ecommerce-indonesia"
        }
    ]
};

// Utility functions
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};
