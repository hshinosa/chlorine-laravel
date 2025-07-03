export const dashboardCards = [
    {
        id: "lengkapi_profile",
        title: "Lengkapi Profile",
        icon: "profile",
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        route: "profile.edit",
        description: "Lengkapi informasi profil Anda"
    },
    {
        id: "lowongan_kerja",
        title: "Lowongan Kerja",
        icon: "chart",
        bgColor: "bg-red-100",
        iconColor: "text-red-600",
        route: "#",
        description: "Cari dan lamar lowongan kerja"
    },
    {
        id: "permohonan_saya",
        title: "Permohonan Saya",
        icon: "document",
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        route: "#",
        description: "Lihat status permohonan Anda"
    },
    {
        id: "survey_kepuasan",
        title: "Survey Kepuasan",
        icon: "survey",
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
        route: "#",
        description: "Berikan feedback layanan"
    }
];

// Icon paths untuk dashboard cards
export const dashboardIcons = {
    profile: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    document: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    survey: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
};