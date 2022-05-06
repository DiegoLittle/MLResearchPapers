import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {prisma} from '../../../lib/prisma';

export default async (req:NextApiRequest, res:NextApiResponse) => {
    const session = await getSession({ req })
    let user = await prisma.user.findFirst({
        where:{
            email: session?.user?.email
        },
        include:{
            saved_papers:true
        }
    })
    user?.saved_papers.map((paper)=>{
        paper.authors = JSON.parse(paper.authors)
        paper.keywords = JSON.parse(paper.keywords)
        paper.methods = JSON.parse(paper.methods)
        return paper
    })
    // console.log(user?.saved_papers)
    res.json(user?.saved_papers)
}