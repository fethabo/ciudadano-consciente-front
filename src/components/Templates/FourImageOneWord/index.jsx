import  { useState, useEffect } from 'react';
import {  TextField, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

//model:
// {"imagesQuantity": "number", "hints": "boolean", "correct_answer": "string"}

export default function FourImageOneWord({ content, onResponse, images }) {
        const [answer, setAnswer] = useState('');
        const [hints, setHints] = useState([]);
       // console.log("PROPS DEL TEMPLATE", content, images);

        useEffect(() => {
            if (content.hints && content.correct_answer?.length>2) {
                const correctAnswer = content.correct_answer.trim();
                const hintIndices = [];
                while (hintIndices.length < 2) {
                    const index = Math.floor(Math.random() * correctAnswer.length);
                    if (!hintIndices.includes(index)) {
                        hintIndices.push(index);
                    }
                }
                setHints(hintIndices);
            }
        }, [content.hints, content.correct_answer]);

        const renderHint = (index) => {
            if (hints.includes(index)) {
                return content.correct_answer.trim()[index];
            }
            return '';
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            const filledAnswer = answer.map((char, index) => (char === '' && hints.includes(index) ? content.correct_answer[index] : char));
            const joinedAnswer = filledAnswer.join('');
            console.log(joinedAnswer);
            onResponse(joinedAnswer.toLowerCase() === content.correct_answer.toLowerCase());};

            useEffect(() => {
                setAnswer(new Array(content.correct_answer.length).fill(''));
            }, [content.correct_answer]);

        const handleChange = (event, index) => {
            const newAnswer = [...answer];
            newAnswer[index] = event.target.value;
            setAnswer(newAnswer);

            if (event.target.value === '') {
            let prevIndex = index - 1;
            while (prevIndex >= 0 && document.querySelector(`input[name=char-${prevIndex}]`).disabled) {
                prevIndex--;
            }
            if (prevIndex >= 0) {
                document.querySelector(`input[name=char-${prevIndex}]`).focus();
            }
            } else {
            let nextIndex = index + 1;
            while (nextIndex < content.correct_answer.length && document.querySelector(`input[name=char-${nextIndex}]`).disabled) {
                nextIndex++;
            }
            if (nextIndex < content.correct_answer.length) {
                document.querySelector(`input[name=char-${nextIndex}]`).focus();
            }
            }
        };

        return (
            <Box component="form" onSubmit={handleSubmit}>
                <Box display="flex" flexWrap="wrap" justifyContent="space-between" padding="2em">
                    {images && (
                    images?.map((image, index) => (
                        <Box key={index} width="48%" mb={2}>
                        <img
                            key={index} 
                            src={image.data}
                            alt={image?.image?.imageName}
                            loading="lazy"
                            style={{ 
                                maxWidth: '100%', 
                                maxHeight: '100%',
                                display: 'block', 
                                marginLeft: 'auto', 
                                marginRight: 'auto' 
                            }}
                        />
                        </Box>
                    ))
                    )}
                </Box>
                <Box mt={2}>
                    <Typography variant="h6">Ingrese la palabra:</Typography>
                    <Box display="flex" justifyContent="center" mt={1}>
                    {content.correct_answer.trim().split('').map((char, index) => (
                        <TextField
                        key={index}
                        name={`char-${index}`}
                        value={answer[index] || renderHint(index)}
                        onChange={(event) => handleChange(event, index)}
                        slotProps={{htmlInput:{ maxLength: 1, style: { textAlign: 'center' } }}}
                        style={{ width: 40, margin: '0 5px' }}
                        disabled={renderHint(index)}
                        />
                    ))}
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" mt={2}>
                    <button type="submit">Probar</button>
                </Box>
            </Box>
        );
    }

FourImageOneWord.propTypes={
    content:PropTypes.object, //DEPENDE DEL MODELO DEFINIDO DEL ACTIVITYTYPE
    onResponse: PropTypes.func,// FUNCION QUE SETEA ESTADO TRUE O FALSE 
    images: PropTypes.array
}
