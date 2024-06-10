import { Button, Typography, Stack } from "@mui/material";
import PropTypes from "prop-types"
import { useEffect, useState } from "react";

export default function MultipleChoice ({content, onResponse}) {

   /* TODO: hacer que el orden de opciones sea aleatorio */
    const [response, setResponse] =useState(null);

    useEffect(() => {
        //Evaluo si la respuesta es correcta
        const correctAnswer= content?.correct_answer
        if(!!response){//eslint-disable-line
            if(response===correctAnswer){
                onResponse(true);
            }else{
                onResponse(false);
            }
        }
    }, [response, content, onResponse]);
    /* {opciones:{...clave:valor},, question: 'value',correct_answer:''} */
    return ( 
        <Stack direction="column" spacing={2}>
            <Typography variant="h4">{content?.question}</Typography>
            {Object.keys(content?.options).map((option, index)=>
                <Button key={index}  onClick={()=> setResponse(option)} variant="text">{content?.options[option]}</Button>
            )}
           
        </Stack>
     );
}
MultipleChoice.propTypes={
    content:PropTypes.object,
    onResponse: PropTypes.func
}