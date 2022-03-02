import Head from 'next/head'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div>
         <Head>
           <title>Twiclone</title>
           <link rel="icon" href="/favicon.ico"/>
         </Head>
         <main
           className="bg-black min-h-screen flex max-w-[1500px] max-auto"
         >
           <Sidebar/>
         </main>
    </div>
  )
}

export default Home
