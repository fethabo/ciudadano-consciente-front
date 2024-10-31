import { Button, Typography, Stack } from "@mui/material";
import PropTypes from "prop-types"
import { useEffect, useState } from "react";
function shuffle(array) {
   //Algoritmo de Fisher-Yates
   const newArray =[ ...array ]
   for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));   
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray
  }

/* 
* EL Content lo define el programador (modelo) para cumplir las necesidades de este componente. 
* El onResponse es una funcion siempre igual que setea un estado true o false 
*/
export default function MultipleChoice ({content, onResponse}) {

   /* TODO: hacer que el orden de opciones sea aleatorio */
    const [response, setResponse] =useState(null);
    
    const optionsKeys= shuffle(Object.keys(content.options))


    useEffect(() => {
        //Evaluo si la respuesta es correcta
        const correctAnswer= content?.correct_answer
        if(!!response){//eslint-disable-line
            if(response===correctAnswer){
                onResponse(true); //EL onResponse siempre debe setearse al responder (true/false)
            }else{
                onResponse(false);
            }
        }
    }, [response, content, onResponse]);
    /* {opciones:{...clave:valor},, question: 'value',correct_answer:''} */
    return ( 
        <Stack direction="column" spacing={2}>
            <Typography variant="h4">{content?.question}</Typography>
            {optionsKeys.map((option, index)=>
                <Button key={index}  onClick={()=> setResponse(option)} variant="text">{index}-{content?.options[option]}</Button>
            )}
           
        </Stack>
     );
}
MultipleChoice.propTypes={
    content:PropTypes.object, //DEPENDE DEL MODELO DEFINIDO DEL ACTIVITYTYPE
    onResponse: PropTypes.func // FUNCION QUE SETEA ESTADO TRUE O FALSE 
}