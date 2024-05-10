import type { NextApiRequest, NextApiResponse } from 'next'
import  prisma  from '../../../../prisma/client'
import { NextRequest, NextResponse } from 'next/server'
 
type ResponseData = {
  message: string
}
 
/* export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  res.status(200).json({ message: 'Hello from Next.js!' })
} */

export const GET =async()=>{
 const lists= await prisma.list.findMany({where:{label:{not:null}}})

 return NextResponse.json({lists})
}
export const POST =async(req:Request)=>{

 const label = await req.json()
 console.log(label)

 /* const potato= req.body */
 const lists= await prisma.list.create({
  data:{
    label:label
  }
 })

 return NextResponse.json("potato")
}