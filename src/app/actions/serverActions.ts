"use server";

import prisma from "../../../prisma/client";

export async function potato() {
  const allLists = await prisma.list.findMany();

  console.log("this is a log from the server actions");
  console.log(allLists);
  return allLists;
}

export async function createNewList(label: string) {
  const newList = await prisma.list.create({
    data: {
      label: label,
    },
  });
  return newList;
}

export async function createListItem(text: string, listId: number) {
  const newListItem = await prisma.item.create({
    data: {
      text: text,
      listId: listId,
    },
  });
  console.log(newListItem);
  return newListItem;
}

export async function toggleItem(id: number, checked: boolean) {
  await prisma.item.update({ where: { id: id }, data: { checked: checked } });
}

export async function deleteItem(id: number) {
  await prisma.item.delete({ where: { id: id } });
  console.log("deleted");
}
