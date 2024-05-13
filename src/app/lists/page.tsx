import { Typography } from "@mui/material";
import Image from "next/image";

const Page =()=>{

    
    /* The home page should contain the following :
    2 buttons : one that makes a pop up for you to add another list 
                one that give you access to the lists that you have already created */
    return (
        <>
        <Typography variant="h4" align="center">If you want to access a list you need its id or to select it from the home page</Typography>
        <Typography  align="center" margin="normal" >For now you can chill here </Typography>
        </>
      
    );
  }
  
  export default Page