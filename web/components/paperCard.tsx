import dayjs from "dayjs";
import Link from "next/link";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import EllipsisText from "react-ellipsis-text";


export default function PaperCard({ paper }) {
    var months= [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
      ]
      var days = [
        "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
      ]
    console.log(Object.keys(paper))
    const { title,url_abs, authors, abstract, url, image,date,categories,_id,arxiv_id } = paper;
    console.log(authors[0])
    return (
        <Link href={`/paper/${arxiv_id}`}>
    <div className="flex bg-white flex-col mx-6 md-mx-12 mt-10 p-6 rounded-lg shadow-lg cursor-pointer overflow-hidden" >
      {categories&&
                <div className="flex">
            {categories.map((category,index)=>
            <div className="text-xs font-semibold rounded-xl px-2 py-1 bg-blue-50 mx-2">{category}</div>
            )}
        </div>
        }
        <Link href={url_abs}>
        <h1 className="cursor-pointer text-xl font-bold underline my-2">{title}</h1>
        </Link>

        <div className="flex">{authors.map((author,i)=>
        <div className="italic flex">{author}{authors.length ==i?"":<span>,&nbsp;</span>}</div>
        )}</div>
        <div>{}</div>
        <div>{months[dayjs(date).month()]+" "+dayjs(date).date()+ ", " + dayjs(date).year()}</div>
        <EllipsisText text={abstract} length={600}/>
        {/* <div className="text-sm text-ellipsis max-h-36">{abstract}</div> */}
        <div>{url}</div>
        
    </div>
    </Link>
    );
}