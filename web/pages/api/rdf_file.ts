// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { time } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
const N3 = require('n3');
const fs = require('fs');

type Data = {
  name: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var data = await new Promise((resolve, reject) => {
    const parser = new N3.Parser(),
    rdfStream = fs.createReadStream('components/kg.ttl');

    const quads = [];
    const prefixes = [];
    parser.parse(rdfStream, (e, q, p) => {
        if (e) {
            reject(e);
        }
        if (q) {
            quads.push(q);
        }
        if (p) {
            prefixes.push(p);
        }
        resolve({quads: quads, prefixes: prefixes});
    });
});
res.json(data);
}
