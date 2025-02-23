import { Button, Typography, Stack, CardContent, Card } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

/**
 * 
 * @param {*} content: {
  "statement": "El Sol es una estrella.",
  "correct_answer": true }
  @param onResponse: function setea estado true/false  
 * @returns 
 */
export default function TrueOrFalse({ content, onResponse }) {
  const [response, setResponse] = useState(null);
console.log(content)
  useEffect(() => {
    if (response !== null) {
      console.log("onResponse",response === content.correct_answer)
      onResponse(response === content.correct_answer);
    }
  }, [response, content, onResponse]);

  return (
   
    <Stack
      direction="column"
      spacing={4}
      alignItems="center"
      justifyContent="center"
     //sx={{ minHeight: "100vh" }}
    >
     <Card>
      <CardContent>
      <Typography variant="h4" align="center">
        {content?.statement}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button onClick={() => setResponse(true)} variant="contained" color="success">
          Verdadero
        </Button>
        <Button onClick={() => setResponse(false)} variant="contained" color= "error">
          Falso
        </Button>
      </Stack>
      </CardContent>
      </Card>
    </Stack>
  
  );
}

TrueOrFalse.propTypes = {
  content: PropTypes.shape({
    statement: PropTypes.string,
    correct_answer: PropTypes.bool
  }),
  onResponse: PropTypes.func
};