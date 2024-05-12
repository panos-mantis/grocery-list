import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/client'


export const POST =async(req:Request)=>{

    const item = await req.json()
    console.log(item)
   
     await prisma.item.create({
     data:{
       text:item.text,
       listId:item.listId
     }
    })

    const listWithItems = await prisma.list.findFirst({where:{id:item.listId} ,include:{items:true}})
     return NextResponse.json( listWithItems)
}

export const DELETE = async(req:Request)=>{

    const itemId = await req.json()
    console.log(itemId)
   
     await prisma.item.delete({where:{id:itemId.id}
    })

    /* const listWithItems = await prisma.list.findFirst({where:{id:itemId} ,include:{items:true}}) */
     return NextResponse.json( "item deleted successfully")
}