import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {prisma} from '../../../lib/prisma';
export default async (req:NextApiRequest, res:NextApiResponse) => {
    const session = await getSession({ req })

    let body = JSON.parse(req.body)
    switch (req.method) {
        case 'POST':
            // prisma.papers
            console.log(body.id)
           
            // let updateUser = await prisma.user.update({
            //     where: {
            //         email: session.user.email
            //     },
            //     data:{
            //         saved_papers: {
            //             disconnect:{
            //                 id: body.id
            //             }
            //         }
            //     }
            //     })
            let updateUser = await prisma.user.update({
                where: {
                    email: session.user.email
                },
                data:{
                    saved_papers: {
                        disconnect: {
                            id: body.id
                        }
                    }
                }
                })
            let user = await prisma.user.findFirst({
                where:{
                    email: session.user.email
                },
                include:{
                    saved_papers:true
                }
            })
                // console.log(user)
            res.json(user)
            break;
        default:
            res.setHeader('Allow', [])
            res.status(405).end(`Method ${req.method} Not Allowed`)
        break;
        }
    }
