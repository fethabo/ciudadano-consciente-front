import { useState } from "react";
import { generateForm } from "../../components/Forms/generateForm";
import { usePostContent } from "../../components/Hooks/requests/Content";
import { Button } from "@mui/material";

function FormContent() {

    const [postForm, setPostForm] =useState(null);
    const {data, isFetching, isError} = usePostContent({form: postForm, enabled: !!postForm})

    console.log(data,isFetching,isError)

    const onSubmit = (values) =>{
        setPostForm(values)
    }/* 
    { name: 'activityTypeVersionId', label: 'Tipo de actividad', type: 'select', placeholder: 'Seleccione el tipo de actividad' },
    { name: 'creator', label: 'Creador', type: 'text', placeholder: 'Ingrese el creador' },
    { name: 'organization', label: 'Organizacion', type: 'select', placeholder: 'Seleccione la organizacion' },
    { name: 'publicContent', label: 'Público', type: 'checkbox', placeholder: '¿Es público?' },
    { name: 'model', label: 'CONTENIDO', type: 'textArea', placeholder: 'ESTE FIELD DEBE TENER EL MODELO CON DATOS' }, */
    const Form = generateForm('Content',{activityTypeVersionId:'', creator:'', organization: '', publicContent: '', model: ''}, onSubmit ,<Button type="submit">GUARDAR</Button>)

    return (  
        Form
    );
}

export default FormContent;