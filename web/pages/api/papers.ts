// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
// const uri =process.env.DATABASE_URL
// const client = new MongoClient(uri);
import {prisma} from '../../lib/prisma'
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('../dev.db');

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let papers = await prisma.papers.findMany({
      where:{
        NOT:[
          {
            arxiv_id:null
          }
        ]
      },
      orderBy:{
        date: 'desc'
      },
      take:10
    })
    papers.map((item)=>{
      item.categories = JSON.parse(item.categories)
      item.authors = JSON.parse(item.authors)
      item.methods = JSON.parse(item.methods)
      item.tasks = JSON.parse(item.tasks)

      return item
    })
    res.json(papers)
    // db.all('SELECT * FROM papers', (err, result) => {
    //   if (err) {
    //     res.json(err)

    //     console.error(err.message);
    //   } else {
        // result.map((item)=>{
        //   item.categories = JSON.parse(item.categories)
        //   item.authors = JSON.parse(item.authors)
        //   return item
        // })
    //     res.json(result)
    //     // do something with result
    //   }
    // })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  // finally{
  //   db.close();
  // }
}
