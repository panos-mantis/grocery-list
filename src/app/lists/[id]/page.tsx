import { Stack, Typography } from "@mui/material"
import  prisma  from "../../../../prisma/client"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import CheckboxList from "./List";
import AddAnItem from "./AddanItem";


interface PageProps{
    params:{
        id: string
    }
}





const Page = async (props: PageProps) =>{
    
    
    
    const listId = parseInt(props.params.id)
    const list = await prisma.list.findUnique({where:{id:listId}, include:{items:true}})
    console.log(list)
    /* The home page should contain the following :
    2 buttons : one that makes a pop up for you to add another list 
                one that give you access to the lists that you have already created */
   
    if(!list){
        return(
            <>
                <p>The list cant be found</p>
            </>

        )

    }
    else{
        return(
            <>
             <Typography variant="h2">{list.label}</Typography>
             <AddAnItem listId={listId}/>
             <CheckboxList list={list}/>
            </>
        )
        
    }

    
   
      
    ;
  }
  
  export default Page