import Link from 'next/link'
import dayjs from "dayjs";
import dynamic from 'next/dynamic'

import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

var months= [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]
  var days = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
  ]
  
const Method = ({method,description}) => {

  const router = useRouter()
  const { name } = router.query
  const [data, setData] = useState(null)
  
  // useEffect(async ()=>{
  //   var res = await fetch(`/api/methods?name=${name}`)
  //   // var data = await res.json()
  //   // setData(data)
  // },[])


  return (
    <>
      {method && (
        <div className='m-8'>
          <h1 className='text-2xl font-semibold'>{method.name} - {method.full_name}</h1>
          <main className='' dangerouslySetInnerHTML={{ __html: description }} />
          {/* <p>{method.description}</p> */}
          <div>
            {method.paper && (
              <>
            <h2>Paper:</h2>
            <Link href={method.source_url}>
            <div className='cursor-pointer hover:bg-gray-100 rounded-xl p-1'>{method.paper.title}</div>
            </Link>
            </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

import { markdownToHtml } from '../../lib/markdown';
export async function getServerSideProps(context) {
    const { name } = context.query;
    
    // console.log(id)
    let res = await fetch("http://localhost:3000/api/methods?name="+name)
    let method = await res.json()
    let description = await markdownToHtml(method.description)
    console.log(description)

    // Look into DOMPurify for sanitizing before releasing publicly

    return { props: {
      method: method,
      description:description
    }  }
  }


export default Method

