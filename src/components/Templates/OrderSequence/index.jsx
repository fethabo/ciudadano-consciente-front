import { Button, Typography, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 * 
 * @param {*} content: {
  "instruction": "Ordena los planetas desde el más cercano al Sol hasta el más lejano.",
  "options": ["Venus", "Marte", "Tierra", "Mercurio"],
  "correct_sequence": ["Mercurio", "Venus", "Tierra", "Marte"]
} 
 * @returns 
 */
export default function OrderSequence({ content, onResponse }) {
  const [userSequence, setUserSequence] = useState([]);

  const handleOptionClick = (option) => {
    setUserSequence([...userSequence, option]);
  };

  const handleSubmit = () => {
    const isCorrect = JSON.stringify(userSequence) === JSON.stringify(content.correct_sequence);
    onResponse(isCorrect);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h4">{content?.instruction}</Typography>
      <Stack direction="row" spacing={2}>
        {content.options.map((option, index) => (
          <Button key={index} onClick={() => handleOptionClick(option)} variant="outlined" sx={{ textTransform: "none" }}>
            {option}
          </Button>
        ))}
      </Stack>
      <Button onClick={handleSubmit} variant="contained" disabled={userSequence.length !== content.options.length}>
        Verificar
      </Button>
    </Stack>
  );
}

OrderSequence.propTypes = {
  content: PropTypes.shape({
    instruction: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    correct_sequence: PropTypes.arrayOf(PropTypes.string)
  }),
  onResponse: PropTypes.func
};