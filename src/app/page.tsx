import { Stack } from "@mui/material";
import prisma from "../../prisma/client";
import AutocompleteComponent from "./lists/Autocomplete";
import NewListModal from "./lists/NewListModal";

const Page = async () => {
  const lists = await prisma.list.findMany();

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <NewListModal />
        <AutocompleteComponent lists={lists} />
      </Stack>
    </>
  );
};

export default Page;
