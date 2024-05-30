import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

export const PUT = async (req: Request) => {
  const item = await req.json();
  console.log(item);

  await prisma.item.update({
    where: { id: item.id },
    data: { text: item.text },
  });

  /* const listWithItems = await prisma.list.findFirst({where:{id:itemId} ,include:{items:true}}) */
  return NextResponse.json("item text updated successfully");
};
