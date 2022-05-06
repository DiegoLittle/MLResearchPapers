import Link from 'next/link'
import dayjs from "dayjs";
import dynamic from 'next/dynamic'

import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, BookmarkIcon } from '@heroicons/react/outline';
import { useSelector,useDispatch } from 'react-redux';
import {selectSavedPapers} from '../../store/slices/userLibrarySlice'
import { add_paper,set_papers,remove_paper } from '../../store/slices/userLibrarySlice'
import Head from 'next/head';

var months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
]
var days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
function format_date(date) {
  return months[dayjs(date).month()] + " " + dayjs(date).date() + ", " + dayjs(date).year()
}
const Paper = ({ paper, elements, similar_papers }) => {
  const router = useRouter()
  const [load, setLoad] = useState(false)
  const dispatch = useDispatch()
  // const { id } = router.query
  const { title, url_abs, authors, abstract, url, image, date, categories, _id, references, arxiv_id,id } = paper;
  const [showReferences, setShowReferences] = useState(false)
  const userLibrary = useSelector(selectSavedPapers)
  console.log(userLibrary)

  useEffect(async()=>{
    let res= await fetch("/api/user/library")
    let data = await res.json()
    dispatch(set_papers(data))
  },[])

  async function save_paper(){
    console.log("Saving paper")
    dispatch(add_paper(paper))
    let res = await fetch('/api/user/save_paper', {
      method: 'POST',
      body: JSON.stringify({
        arxiv_id: arxiv_id,
        id:id
      })
    })

  }
  async function delete_paper(){
    console.log("Saving paper")
    dispatch(remove_paper(paper))
    let res = await fetch('/api/user/remove_paper', {
      method: 'POST',
      body: JSON.stringify({
        arxiv_id: arxiv_id,
        id:id
      })
    })

  }

  function is_paper_saved(){
    let paper_titles = userLibrary.map(paper => paper.title)
    if(paper_titles.includes(title)){
      return true
    }
    else{
      return false
    }
  }
  return (
    <>
          <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='mx-8 mb-24'>
        <div className="flex flex-col mt-10 p-6 max-w-screen" >
          <div className="flex mb-2">
            {categories && categories.map((category, index) =>
              <div className="text-xs font-semibold rounded-xl px-2 py-1 bg-blue-50 mx-2">{category}</div>
            )}
          </div>
          <Link href={"/read/" + arxiv_id}>
            <h1 className="cursor-pointer w-fit text-xl md:text-2xl font-bold">{title}</h1>
          </Link>
          {/* <div onClick={test}>Test</div> */}
          <div className="flex text-base">{authors && authors.map((author, i) =>
            <div className="italic">{author}{authors.length == i ? "" : <span>,&nbsp;</span>}</div>
          )}</div>
          <div>{format_date(date)}</div>
          <div className='flex my-2'>
          <div>
            {is_paper_saved()?<BookmarkIcon onClick={delete_paper} className='h-8 w-8 mt-1 fill-blue-200 cursor-pointer'></BookmarkIcon>:
            <BookmarkIcon onClick={save_paper} className='h-8 w-8 mt-1 hover:fill-blue-200 cursor-pointer'></BookmarkIcon>
          }
          </div>
          <Link href={"/read/" + arxiv_id}>
          <button className='p-2 mx-2 bg-blue-50 text-sm font-medium hover:bg-blue-100 rounded-xl'>Read the paper</button>
          </Link>
          </div>
          <div className=''>
            <h1 className='text-lg font-semibold'>Abstract:</h1>
            <div className="text-sm md:text-lg">{abstract}</div>
          </div>
          {references &&
            <div>
              <div className="flex cursor-pointer" onClick={() => {
                setShowReferences(!showReferences)
              }} >
                <h1 className='bold text-xl font-semibold'>References:</h1>
                {showReferences ?
                  <ChevronUpIcon className='ml-2 w-6 h-6'></ChevronUpIcon>

                  :
                  <ChevronDownIcon className='ml-2 w-6 h-6'></ChevronDownIcon>
                }
              </div>
              {showReferences && references &&
                <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6 xl:gap-x-8">
                  {references.map((reference, index) => (
                    <>
                      <ReferenceCard reference={reference} index={index}></ReferenceCard>
                      {/* {?:
        <ReferenceCard reference={reference} index={index}></ReferenceCard>
        } */}

                    </>
                  ))}
                </ul>
              }
            </div>}
        </div>
        {similar_papers.length >0 &&
          <div className='pl-6'>
            <h1 className='font-semibold text-xl'>Similar Papers:</h1>
            {similar_papers.map((paper, index) =>
              <Link href={`/paper/${paper.arxiv_id}`}>
                <div className='rounded-lg shadow-md p-3 my-2 cursor-pointer hover:bg-gray-50'>
                  <div className='text-lg font-medium'>{paper.title}</div>
                  <div>{format_date(paper.date)}</div>
                </div>
              </Link>
            )}
          </div>}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  // console.log(id)
  try {
    var similar_res = await fetch(process.env.NEXT_PUBLIC_API_URL + "api/similar_papers?id=" + id)
    var similar_papers = await similar_res.json()
  } catch (error) {
    console.log(error)
    var similar_papers = []
  }

  // console.log(Object.keys(similar_papers[0]))
  let res = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/paper?q=" + id)
  let paper = await res.json()
  // console.log(paper)
  return {
    props: {
      paper: paper,
      similar_papers: similar_papers,
    }
  }
}


export default Paper


const ReferenceCard = ({ reference, index }) => {
  let hasID = typeof (reference.ids[0]) != 'undefined'
  if (reference.ids.length > 0) {
    if (typeof (reference.ids[0].id) == 'undefined') {
      console.log(reference.ids[0].id)
    }
    var url = "https://dx.doi.org/" + reference.ids[0].id
    // console.log(url)
  }
  console.log(url)

  // console.log(reference.ids)
  return (
    <>
      {reference.ids.length > 0 ?
        <Link href={url}>

          <li key={index} className="cursor-pointer w-full relative rounded-lg shadow-lg p-2 max-h-64 overflow-hidden hover:bg-blue-50">
            <div className="group w-full aspect-w-10 aspect-h-7 rounded-lg">
              <div className="text-sm font-bold">{reference.title}</div>
              <div className="flex flex-wrap text-ellipsis">{reference.authors.slice(0, 4).map((author, i) =>
                <div className="italic text-xs">{author}{reference.authors.length == i ? "" : <span>,&nbsp;</span>}</div>
              )}</div>
              {/* {reference.ids.map((id,i)=>
    // doi link
    <Link href={`https://dx.doi.org/${id['#text']}`}>
    <div className="text-xs">{id['@type']}: {id['#text']}</div>
    </Link>
    )} */}

            </div>
            {/* <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{reference.title}</p> */}
            {/* <p className="block text-sm font-medium text-gray-500 pointer-events-none">{reference.size}</p> */}
          </li>
        </Link>
        :
        <li key={index} className="w-full relative rounded-lg shadow-lg p-2 max-h-64 overflow-hidden">
          <div className="group w-full aspect-w-10 aspect-h-7 rounded-lg">
            <div className="text-sm font-bold">{reference.title}</div>
            <div className="flex flex-wrap text-ellipsis">{reference.authors.slice(0, 4).map((author, i) =>
              <div className="italic text-xs">{author}{reference.authors.length == i ? "" : <span>,&nbsp;</span>}</div>
            )}</div>
            {reference.ids.map((id, i) =>
              // doi link
              <Link href={`https://dx.doi.org/${id['#text']}`}>
                <div className="text-xs">{id['@type']}: {id['#text']}</div>
              </Link>
            )}

          </div>
          {/* <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{reference.title}</p> */}
          {/* <p className="block text-sm font-medium text-gray-500 pointer-events-none">{reference.size}</p> */}
        </li>
      }
    </>

  )
}