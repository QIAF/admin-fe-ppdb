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
    icon: KriteriaIcon,
    icon2: KriteriaIconWh,
    label: 'Data Nilai',
    link: '/scores'
  },
  {
    icon: UserIcon,
    icon2: UserIconWh,
    label: 'Data Siswa',
    link: '/users'
  },
  {
    icon: UserIcon,
    icon2: UserIconWh,
    label: 'Bidang Keahlian',
    link: '/majors'
  },
]

export const navTitle = [
    {
      route: '',
      title: 'Dashboard',
    },
    {
    //   route: 'criteria',
      title: 'Data Nilai',
    },

    {
      route: 'users',
      title: 'Data Calon Siswa',
    },
    {
      route: 'majors',
      title: 'Data Major',
    },
  ]

export const thead = ["No","NISN","Nama Siswa", "Jenis Kelamin"];
export const theadScores = ["User ID","Nama Siswa", "Nilai Raport rata-rata", "Nilai Kesehatan", "Nilai Wawancara", "Hasil"];
export const theadAllScores = ["Nama Siswa", "Raport rata-rata", "Nilai Kesehatan", "Nilai Wawancara", "Hasil", "Rank", "Bidang Keahlian", "Deskripsi"];
export const theadAllMajors = ["Nama Bidang", "Deskripsi", "Gambar"];