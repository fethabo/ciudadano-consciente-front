import { Button } from "@mui/material";
import { generateForm } from "../../components/Forms/generateForm";
import { usePostOrganization } from "../../components/Hooks/requests/Organizations";
import { useState } from "react";


/**
 * 
 * @returns 
 * @todo: get de datos iniciales para la edicion (o crear otro form para edicion)
 */
export default function OrganizationForm() {
    
    const [postForm, setPostForm] =useState(null);
    const {data, isFetching, isError} = usePostOrganization({form: postForm, enabled: !!postForm})
   
    console.log(data,isFetching,isError)

    const onSubmit = (values) =>{
        setPostForm(values)
    }
    const Form = generateForm('Organization',{name:'', description:''}, onSubmit ,<Button type="submit">GUARDAR</Button>)
    
    return (  
        Form
    );
}

 