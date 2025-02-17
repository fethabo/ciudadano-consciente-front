import { Typography, Stack, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function ColorChooser({ content, onResponse }) {
  const [selectedColor, setSelectedColor] = useState(null);
  //console.log("content en colorChooser",content)
  useEffect(() => {
    if (selectedColor !== null) {
      const isCorrect = selectedColor === content.correct_color;
      onResponse(isCorrect); // Evaluate if the selected color is correct
    }
  }, [selectedColor, content, onResponse]);

  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Typography variant="h4">{content?.prompt}</Typography>
      <Stack direction="row" spacing={2}>
        {content?.colors?.map((color, index) => (
          <Button
            key={index}
            onClick={() => setSelectedColor(color)}
            variant="contained"
            style={{
              backgroundColor: color,
              color: "#fff",
              minWidth: "50px",
              minHeight: "50px",
              borderRadius: "50%"
            }}
          >
            {/* Optional: Add color labels */}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}

ColorChooser.propTypes = {
  content: PropTypes.shape({
    prompt: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    correct_color: PropTypes.string
  }),
  onResponse: PropTypes.func
};