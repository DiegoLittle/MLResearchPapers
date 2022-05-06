import React from 'react'
import PaperCard from '../components/paperCard'

type Props = {
    saved_papers: Array<Paper>
}

const Library = ({
    saved_papers
}:Props) => {
  return (
    <div>
      {saved_papers.length>0?
      <>
              {saved_papers.map((paper)=>
        <PaperCard paper={paper}>

        </PaperCard>
        )}
      </>
      
      :
      <>
      <EmptyLibrary></EmptyLibrary>
      </>
      }

    </div>
  )
}

export default Library



export async function getServerSideProps(context) {
    const { id } = context.query;
    // console.log(id)
    // console.log(process.env.NEXT_PUBLIC_HOST+'api/user/library')
    let req = await fetch(process.env.NEXT_PUBLIC_HOST+'api/user/library')
    let res = await req.json()


    return {
      props: {
          saved_papers: res,
      }
    }
  }



function EmptyLibrary() {
    return (
    <div>
        <div className="text-center mt-48">
      {/* <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg> */}
      <h1 className="mt-2 text-base font-medium text-gray-900">You have no saved papers</h1>
        <p className="mt-1 text-base text-gray-500">You can save papers by clicking the save button on the paper page</p>
      <div className="mt-6">
        {/* <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Project
        </button> */}
      </div>
    </div>
    </div>
    )
}