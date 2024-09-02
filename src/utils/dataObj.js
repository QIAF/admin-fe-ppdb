import UserIcon from '../assets/images/UserIcon.png'
import UserIconWh from '../assets/images/UserIconWh.png'
import DashboardIcon from '../assets/images/DashboardIcon.png'
import DashboardIconWh from '../assets/images/DashboardIconWh.png'
import KriteriaIcon from '../assets/images/KriteriaIcon.png'
import KriteriaIconWh from '../assets/images/KriteriaIconWh.png'

export const sides = [
  {
    icon: DashboardIcon,
    icon2: DashboardIconWh,
    label: 'Dashboard',
    link: '/dashboard'
  },
  {
    icon: UserIcon,
    icon2: UserIconWh,
    label: 'Data Siswa',
    link: '/users'
  },
  {
    icon: KriteriaIcon,
    icon2: KriteriaIconWh,
    label: 'Data Nilai',
    link: '/scores'
  },
  {
    icon: KriteriaIcon,
    icon2: KriteriaIconWh,
    label: 'Hasil Akhir',
    link: '/finalResults'
  },
  {
    icon: UserIcon,
    icon2: UserIconWh,
    label: 'Bidang Keahlian',
    link: '/majors'
  },
  {
    icon: UserIcon,
    icon2: UserIconWh,
    label: 'Pengumuman',
    link: '/articles'
  },
]

export const navTitle = [
    {
      route: '',
      title: 'Dashboard',
    },
    {
      route: 'scores',
      title: 'Data nilai',
    },

    {
      route: 'users',
      title: 'Data Calon Siswa',
    },
    {
      route: 'finalResults',
      title: 'Hasil Seleksi Akhir',
    },
    {
      route: 'majors',
      title: 'Data Jurusan',
    },
    {
      route: 'articles',
      title: 'Pengumuman',
    },
  ]

export const thead = ["No","NISN","Nama Siswa", "Jenis Kelamin"];
export const theadStudentPassed = ["NISN","Nama Siswa", "Hasil", "Bidang keahlian"];
export const theadScores = ["User ID","Nama Siswa", "Nilai Raport rata-rata", "Nilai Kesehatan", "Nilai Wawancara", "Hasil"];
export const theadAllScores = ["Rank","Nama Siswa", "Raport rata-rata", "Nilai Kesehatan", "Nilai Wawancara", "Hasil", "Hasil Akhir", "Bidang Keahlian", "Deskripsi"];
export const theadAllMajors = ["Nama Bidang", "Deskripsi", "Gambar"];
export const theadArticle = ["No", "Judul", "Deskripsi"]