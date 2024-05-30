import { Typography } from "@mui/material";
import prisma from "../../../../prisma/client";
import CheckboxList from "./List";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async (props: PageProps) => {
  const listId = parseInt(props.params.id);
  const list = await prisma.list.findUnique({
    where: { id: listId },
    include: { items: { orderBy: { id: "desc" } } },
  });
  console.log(list);

  if (!list) {
    return (
      <>
        <p>The list cant be found</p>
      </>
    );
  } else {
    return (
      <>
        <Typography variant="h2">{list.label}</Typography>
        <CheckboxList list={list} />
      </>
    );
  }
};

export default Page;
