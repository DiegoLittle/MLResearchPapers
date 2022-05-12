import dayjs from "dayjs";
import Link from "next/link";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import EllipsisText from "react-ellipsis-text";
import { useIntersectionObserver } from 'usehooks-ts'
import { useEffect, useRef } from "react";


export default function PaperCard({ paper, setPapers }) {
  const ref = useRef()
  const entry = useIntersectionObserver(ref, {})
  const isVisible = !!entry?.isIntersecting
  var months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]
  var days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ]
  // console.log(Object.keys(paper))
  const { title, url_abs, authors, abstract, url, image, date, categories, _id, arxiv_id, num_citations } = paper;
  // console.log(authors[0])
  // if (onInView != null) {
  //   // console.log("in view")
  //   onInView()
  // }
  async function fetch_infinit_scroll(){
    let papers_req = await fetch('/api/papers')
    let papers_res = await papers_req.json()
    // console.log("Papers: ", papers)
    console.log(papers_res)
    setPapers((papers)=>{
      return papers.concat(papers_res)
    })
  }
  useEffect(()=>{
    if(isVisible && setPapers){
      // onInView()
      
      console.log("paper visible")
      fetch_infinit_scroll()
    }
    // console.log("isVisible: ", isVisible)
  },[isVisible])
  return (
    <Link href={`/paper/${arxiv_id}`}>
      <div ref={ref} className="flex bg-white flex-col md:mx-6 mt-10 p-6 rounded-lg shadow-lg cursor-pointer overflow-hidden" >

        <div className="mb-3">
        {categories &&
          <div className="flex">
            {categories.map((category, index) =>
              <div className="text-xs font-semibold rounded-xl px-2 py-1 bg-blue-50 mx-2">{category}</div>
            )}
          </div>
        }
        <Link href={url_abs}>
          <h1 className="cursor-pointer text-xl font-bold underline my-2">{title}</h1>
        </Link>

        <div className="flex">{authors.map((author, i) =>
          <div className="italic flex">{author}{authors.length == i ? "" : <span>,&nbsp;</span>}</div>
        )}</div>
        <div>{ }</div>
        <div>{months[dayjs(date).month()] + " " + dayjs(date).date() + ", " + dayjs(date).year()}</div>
        <div className="text-blue-600 text-sm">
          Cited by <span className="font-semibold text-base">{num_citations}</span> papers
        </div>
        </div>

        {/* <h2 className=" font-bold"></h2> */}
        <EllipsisText className="text-sm md:text-base" text={abstract} length={600} />
        {/* <div className="text-sm text-ellipsis max-h-36">{abstract}</div> */}
        <div>{url}</div>

      </div>
    </Link>
  );
}