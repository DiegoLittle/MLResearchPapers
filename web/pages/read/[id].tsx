import React from 'react'
import react_parse from 'html-react-parser';
import fs from 'fs';
import Script from 'next/script'

import { Html, Head, Main, NextScript } from 'next/document'



const ReadPaper = ({html}) => {
  return (
    <div className=' text-sm'>
      {/* <Script src="https://media.arxiv-vanity.com/render-output/5981414/index.js" /> */}
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></Script> */}
 {react_parse(html)}
 
    </div>
  )
}

export default ReadPaper

import { cwd } from 'process';
import { parse } from 'node-html-parser';

export async function getServerSideProps(context) {
  const { id } = context.query;
  // console.log(id)
  console.log(`Current directory: ${cwd()}`);
  let res = await fetch(`https://www.arxiv-vanity.com/papers/${id}`);
  let data = await res.text()
  let dom = parse(data);
  let a_tags = dom.getElementsByTagName('a')
  a_tags.forEach((a)=>{
    if(a.attributes.href.startsWith('#')){
      a.removeAttribute('target')
    }
  })
  dom.querySelector('head > link:nth-child(26)')?.remove()
  // console.log(dom.querySelector('head > link:nth-child(29)')?.remove())
  dom.querySelector('body > div:nth-child(1)')?.setAttribute('class','arxiv-vanity-wrapper text-center text-center mx-4 mt-4')
  dom.querySelector('body > div:nth-child(4)')?.remove()
  dom.querySelector('body > div:nth-child(5)')?.remove()
  let html = dom.toString()

  // let html = await fs.readFileSync('12/index.html', 'utf8');
  // let res = await fetch("http://localhost:3000/api/paper?q="+id)
  // let paper = await res.json()
  // try {
  //   let kg_res = await fetch("http://localhost:3000/api/rdf_string",{
  //     method: 'POST',
  //     body: JSON.stringify(paper.kg_turtle)
  //   })
  //   let kg = await kg_res.json()
  //   var elements = rdf2cytoscape(kg)

  // } catch (error) {
  //   var elements = null

  // }

  // console.log(kg)
  // Fetch data from external API
  // const res = await fetch(``)
  // const data = await res.json()

  // Pass data to the page via props
  return { props:  {
    html:html
  } }
}