import Image from 'next/image'
import { Inter } from 'next/font/google'
import Calendar from '@/components/Calendar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen bg-slate-950">
      <div className="flex justify-center items-center w-96 h-96 bg-slate-600 rounded-full">
        <Calendar />
      </div>
    </div>
  )
}
