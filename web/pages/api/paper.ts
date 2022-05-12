import { NextApiRequest, NextApiResponse } from 'next';

import {prisma} from '../../lib/prisma';
const uri =process.env.DATABASE_URL;


export default async (req:NextApiRequest, res:NextApiResponse) => {
    // let body = JSON.parse(req.body)
    console.log(req.query)
    let {q} = req.query
    console.log(q)
    switch (req.method) {
        case 'GET':
            try {
                let paper =await prisma.papers.findFirst({
                    where:{
                        arxiv_id:q
                    }
                })
                try {
                    paper.categories = JSON.parse(paper.categories)
                } catch (error) {
                    console.log(error)
                }
                paper.authors = JSON.parse(paper.authors)
                paper.keywords = JSON.parse(paper.keywords)
                if(paper.num_citations == null && typeof(JSON.parse(paper.s2_paper).citationCount) != 'undefined'){
                    paper.num_citations = JSON.parse(paper.s2_paper).citationCount
                  }
                res.json(paper)
                // db.get(`SELECT * FROM papers WHERE arxiv_id = ${q}`, (err, result) => {
                //     if (err) {
                //       return console.error(err.message);
                //       res.json(err)
                //     } else {
                //         result.categories = JSON.parse(result.categories)
                //         result.authors = JSON.parse(result.authors)
                //     //   console.log(result)
              
                //       res.json(result)
                //       // do something with result
                //     }
                //   })
                // var paper = await extracted_papers.findOne({_id:new ObjectId(q)},{projection:{"grobid": 0,"lookup_results":0}});
                // console.log(paper)
                // res.json(paper)
            } 
            catch(error){
                console.log(error)
                res.status(500).json({error})
            }
            break;
        default:
            res.setHeader('Allow', [])
            res.status(405).end(`Method ${req.method} Not Allowed`)
        break;
        }
    }
