import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import PaperCard from '../components/paperCard'
import Header from '../components/msHeader'
import useOnScreen from '../lib/hooks/useOnScreen'
import { useIntersectionObserver } from 'usehooks-ts'


const Home: NextPage = () => {
  const [papers, setPapers] = useState<Paper[]>([])
  // const paperCardRef = useRef(null)
  async function onLastPaperVisible() {
    console.log('last paper visible')
  }
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
        {papers.map((paper,index) => 
        <>
        {index==papers.length-1?<PaperCard setPapers={setPapers} paper={paper}></PaperCard>
        :<PaperCard setPapers={null} paper={paper}></PaperCard>}
        </>
          
        )}
      </main>
    </div>
  )
}

export default Home
