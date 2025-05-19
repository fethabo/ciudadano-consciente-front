import { Button, Typography, Stack, Badge } from "@mui/material";
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


  const handleSubmit = () => {
    const isCorrect = JSON.stringify(userSequence) === JSON.stringify(content?.correct_sequence);
    onResponse(isCorrect);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h4">{content?.instruction}</Typography>
      <Stack direction="row" spacing={2}>
        {content?.options?.map((option, index) => {
          const selectedIndex = userSequence.indexOf(option);
          const isSelected = selectedIndex !== -1;
          return (
            <Button
              key={index}
              onClick={() => {
                if (isSelected) {
                  setUserSequence(userSequence.filter((item) => item !== option));
                } else {
                  setUserSequence([...userSequence, option]);
                }
              }}
              variant={isSelected ? "contained" : "outlined"}
              sx={{ textTransform: "none", position: "relative" }}
            >
              {isSelected ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>{option}</span>
                  <Badge
                    badgeContent={selectedIndex + 1}
                    color="secondary"
                    sx={{
                      "& .MuiBadge-badge": {
                        right: -8,
                        top: 8,
                        minWidth: 22,
                        height: 22,
                        borderRadius: "50%",
                        fontSize: 14,
                      },
                    }}
                  />
                </Stack>
              ) : (
                option
              )}
            </Button>
          );
        })}
      </Stack>
      <Button
        onClick={handleSubmit}
        variant="contained"
        disabled={userSequence?.length !== content?.options?.length}
      >
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