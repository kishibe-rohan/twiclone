import Head from 'next/head'

import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'

export default function Home({ trendingResults, followResults }) {
  return (
    <div>
      <Head>
        <title>Twiclone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  )
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  )

  return {
    props: {
      trendingResults,
      followResults,
    },
  }
}
