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
    link: '/'
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
    label: 'Data User',
    link: '/users'
  },
]

export const navTitle = [
    {
      route: '',
      title: 'Dashboard',
    },
    {
    //   route: 'criteria',
      title: 'Data Kriteria',
    },

    {
      route: 'users',
      title: 'Data User',
    },
  ]

export const thead = ["User ID","Nama Siswa", "Jenis Kelamin" , "NISN"];
export const theadScores = ["User ID","Nama Siswa", "Nilai Raport rata-rata", "Nilai Kesehatan", "Nilai Wawancara", "Hasil"];
export const theadAllScores = ["Nama Siswa", "Nilai Raport rata-rata", "Nilai Kesehatan", "Nilai Wawancara", "Hasil"];
