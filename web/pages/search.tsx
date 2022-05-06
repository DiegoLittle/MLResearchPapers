import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import PaperCard from '../components/paperCard'
import Header from '../components/msHeader'
import SearchBox from '../components/papers_search_box'
import FileUpload from '../components/file_upload'
const Home: NextPage = () => {
    const [query, setQuery] = useState('')
    const [image,setImage] = useState('')
    const [words,setWords] = useState([])
    const [results,setResults] = useState([])
    const [loadingResults,setLoadingResults] = useState(false)
    async function get_dit(){
        let res = await fetch('http://localhost:8000/?q='+query)
        let data = await res.json()
        // console.log(data.ImageBytes)
        setImage(data.ImageBytes)
        console.log(JSON.parse(data.features).words)
        setWords(JSON.parse(data.features).words)
    }
    // useEffect(async()=>{

    // },[query])
    async function search(){
      setLoadingResults(true)
      try {
        let res = await fetch(process.env.NEXT_PUBLIC_HOST+'/api/paper_search?q='+query)
        let data = await res.json()
        console.log(data)
        setResults(data)
        setLoadingResults(false)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>ML Research Papers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header></Header> */}
      <main className="flex w-full flex-1 flex-col ">
          <SearchBox setQuery={setQuery} search={search}></SearchBox>
          {/* <input onChange={(e)=>setQuery(e.target.value)}></input> */}
          {loadingResults&&
                <div className="h-screen flex justify-center mt-40">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-200"></div>
              </div>
          
          }
          <div className='mx-8'>
          {results.map((paper)=>
            <PaperCard paper={paper}></PaperCard>
          )}
          </div>
      </main>
    </div>
  )
}

export default Home
