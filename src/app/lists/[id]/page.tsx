import { prisma } from "../../../../prisma/client"

interface PageProps{
    params:{
        id: string
    }
}



const Page = async (props: PageProps) =>{
   /*  await prisma.item.create({
        data:{
             text:"this is a test item",
             listId :1
        }
    }) */
    const listId = parseInt(props.params.id)
    console.log(listId)
    const list = await prisma.list.findUnique({where:{id:listId}})
    
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
            <p>The list exists with an id of {list.id} {list.label}</p>
        )
        
    }

    
   
      
    ;
  }
  
  export default Page