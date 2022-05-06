import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '../../lib/prisma';


export default async (req:NextApiRequest, res:NextApiResponse) => {
    let {q} = req.query
    console.log(q)
    req.statusCode = 200
    try {
      // const result = await prisma.papers.findMany({
      //   where:{
      //     NOT:{
      //       arxiv_id: null
      //     }
      //   },
      //   orderBy: {
      //       _relevance: {
      //         fields: ['title'],
      //         search: q,
      //         sort: 'asc'
      //       },
      //   },
      //   take:10
      // })
      const result = await prisma.papers.findMany({
        where:{
          NOT:{
            arxiv_id: null
          },
          title:{
            search: q
          }
        },
        // orderBy: {
        //     _relevance: {
        //       fields: ['title'],
        //       search: q,
        //       sort: 'asc'
        //     },
        // },
        take:10
      })
      result.map((item)=>{
        item.categories = JSON.parse(item.categories)
        item.authors = JSON.parse(item.authors)
        item.methods = JSON.parse(item.methods)
        item.tasks = JSON.parse(item.tasks)
        return item
      })
      // res.json(result)
      // console.log(result)
    // res.json({"Test":"Message"})
    res.json(result)
    } catch (error) {
      console.log(error)
      res.json(error)
    }

}
