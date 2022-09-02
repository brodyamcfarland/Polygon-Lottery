import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col bg-[#2f1427] min-h-screen">
      <Head>
        <title>Polygon Lottery</title>
      </Head>
      <Header />
    </div>
  )
}

export default Home
