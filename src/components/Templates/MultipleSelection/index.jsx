import { Button, Typography, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 * 
 * @param {*} content: {
  "question": "¿Cuáles de los siguientes animales son mamíferos?",
  "options": ["Tiburón", "Delfín", "Gato", "Águila"],
  "correct_answers": ["Delfín", "Gato"]
} 
 * @returns 
 */
export default function MultipleSelection({ content, onResponse }) {
  const [selected, setSelected] = useState([]);
console.log("contenido en multiplesleccion", content)
  const toggleSelection = (option) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleSubmit = () => {
    const corrects = JSON.parse(content.correct_answers);
    const isCorrect = JSON.stringify(selected.sort()) === JSON.stringify(corrects.sort());
    onResponse(isCorrect);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h4">{content?.question}</Typography>
      <Stack direction="column" spacing={1}>
        {JSON.parse(content?.options)?.map((option, index) => (
          <Button
            key={index}
            onClick={() => toggleSelection(option)}
            variant={selected.includes(option) ? "contained" : "outlined"}
          >
            {option}
          </Button>
        ))}
      </Stack>
      <Button onClick={handleSubmit} variant="contained">
        Verificar
      </Button>
    </Stack>
  );
}

MultipleSelection.propTypes = {
  content: PropTypes.shape({
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    correct_answers: PropTypes.arrayOf(PropTypes.string)
  }),
  onResponse: PropTypes.func
};