import { Field, FieldArray } from 'formik';
import { Box, Button, FormControlLabel, Switch, TextField, Typography, IconButton, List, ListItem, Stack } from '@mui/material';
import PropTypes from 'prop-types'
import { useCallback } from 'react';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
/**
 * 
 * @param {*} key 
 * @param {*} path 
 * @param {*} value 
 * @returns 
 */


export const DynamicSubForm = ({ jsonTemplate, formState }) => {
  const initialValues = formState.values.model;
 console.log("jsonTemplate",initialValues, jsonTemplate)
 //del formState-values-model puedo obtener los initialValues

const renderField = useCallback((key, path, value ) => {
  const { values } = formState;
 // console.log("formState en renderField subform", formState)
  const fieldName = path ? `${path}.${key}` : key;
  if (typeof value === 'object' && !Array.isArray(value)) {
    // Si el valor es un objeto, renderiza los campos de forma recursiva
    return (
      <Stack key={key} style={{ paddingLeft: '20px', borderLeft: '1px solid #ccc', marginBottom: '10px', gap:'1em' }}>
        <h4>{key}</h4>
        {Object.entries(value).map(([subKey, subValue]) =>
          renderField(subKey, fieldName, subValue)
        )}
      </Stack>
    );
  } else {
    // Si el valor es un campo simple, renderiza el campo de texto
    
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    switch(value) {
      case "string[]":
      {        
        const nestedValue = getNestedValue(values, fieldName);
        return  <FieldArray
                  label={fieldName}
                  name={fieldName}
                  render={arrayHelpers => (
                    <Box sx={{ border: "solid", borderRadius: 1, borderWidth:'thin', borderColor: 'gray', '&:hover':{borderColor:'white'}, padding: '1em' }} >
                       <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} >
                        <Typography variant="body2">{fieldName.split(".")[fieldName.split(".")?.length-1]}</Typography>
                        <Button startIcon={<PlaylistAddIcon />} type="button" onClick={() => arrayHelpers.push('')}>
                              Agregar
                          </Button>
                        </Box>
                    
                      {nestedValue && nestedValue?.length > 0 && (
                         <List>
                          {console.log("nestedValue",nestedValue)}
{                        nestedValue?.map((unit, index) => (
                          <ListItem key={index}>
                            <Field  as={TextField} variant="outlined" name={`${fieldName}.${index}`} placeholder="placeholder" size={"small"} fullWidth/>
                            <IconButton
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a unit from the list
                            >
                              <PlaylistRemoveIcon />
                            </IconButton>
                           
                          </ListItem>
                        ))
                      }
                        </List>
                      ) }
                      
                    </Box>
                  )}
                />
      }     
       case "boolean": 
        return  (<div key={fieldName} style={{ marginBottom: '16px' }}>
                <FormControlLabel  name={fieldName} fullWidth control={<Switch />} label={key}/>
         </div>)
      case "number":return  (<div key={fieldName}>
        <Field
          as={TextField}
          type="number"
          name={fieldName}
          label={key}
          placeholder={`Ingrese ${key}`}
          fullWidth
          variant="outlined"
        />
      </div>)
      default : 
      return  (<div key={fieldName} >
        <Field
          as={TextField}
          name={fieldName}
          label={key}
          placeholder={`Ingrese ${key}`}
          fullWidth
          variant="outlined"
        />
      </div>)
      
    }
  }
},[formState]);

return (
    <>
      {Object.entries(jsonTemplate).map(([key, value]) =>
        renderField(key, '', value,formState.values)
      )}
    </>
  );
};
DynamicSubForm.propTypes= {
  jsonTemplate: PropTypes.object,
  formState: PropTypes.object
}
