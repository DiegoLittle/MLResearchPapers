import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import PaperCard from '../components/paperCard'
import Header from '../components/msHeader'


const Home: NextPage = () => {
  const [papers, setPapers] = useState<Paper[]>([])
  useEffect(async ()=>{
    console.log('Home page loaded')
    let papers = await fetch('/api/papers')
    papers = await papers.json()
    console.log("Papers: ", papers)
    // console.log(papers)
    setPapers(papers)
  },[])
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* <Header></Header> */}
      <main className="flex w-full flex-1 flex-col ">
        {papers.map(paper => 
          <PaperCard paper={paper}></PaperCard>
        )}
      </main>
    </div>
  )
}

export default Home
