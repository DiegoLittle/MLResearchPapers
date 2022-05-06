import { NextApiRequest, NextApiResponse } from 'next';
// Replace the uri string with your MongoDB deployment's connection string.
const uri =process.env.DATABASE_URL


export default async (req:NextApiRequest, res:NextApiResponse) => {
    // let body = JSON.parse(req.body)
    let {name} = req.query
    switch (req.method) {
        case 'GET':
            try {
                console.log(name)
                await client.connect();
                const database = client.db('research_papers');
                const methods = database.collection('methods');
                try {
                    var method = await methods.findOne(
                        {"name":{$regex: `^${name}$`, $options:"i"}}
                        );
                } catch (error) {
                    
                }
                

                // console.log(paper)
                console.log(method)
                res.json(method)
            } 
            catch(error){
                console.log(error)
                res.json(error)
            }
            finally {
                // Ensures that the client will close when you finish/error
                await client.close();
            }
            break;
        default:
            res.setHeader('Allow', [])
            res.status(405).end(`Method ${req.method} Not Allowed`)
        break;
        }
    }
