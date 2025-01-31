import { Field, FieldArray } from 'formik';
import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import PropTypes from 'prop-types'
import { useCallback } from 'react';

/**
 * 
 * @param {*} key 
 * @param {*} path 
 * @param {*} value 
 * @returns 
 */


export const DynamicSubForm = ({ jsonTemplate, formState }) => {
//  console.log("jsonTemplate", jsonTemplate)
const renderField = useCallback((key, path, value ) => {
  const { values } = formState;
  const fieldName = path ? `${path}.${key}` : key;
  if (typeof value === 'object' && !Array.isArray(value)) {
    // Si el valor es un objeto, renderiza los campos de forma recursiva
    return (
      <div key={fieldName} style={{ paddingLeft: '20px', borderLeft: '1px solid #ccc', marginBottom: '10px' }}>
        <h4>{key}</h4>
        {Object.entries(value).map(([subKey, subValue]) =>
          renderField(subKey, fieldName, subValue)
        )}
      </div>
    );
  } else {
    // Si el valor es un campo simple, renderiza el campo de texto
    console.log(fieldName,value, values,values[fieldName], values["options"])
   
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

   // const nestedValue = getNestedValue(values, fieldName);
    //
    switch(value) {
      case "string[]":
      {        
        const nestedValue = getNestedValue(values, fieldName);
        console.log(nestedValue)
        return  <FieldArray
                  label={fieldName}
                  name={fieldName}
                  render={arrayHelpers => (
                    <div>
                      {nestedValue && nestedValue?.length > 0 ? (
                        nestedValue.map((unit, index) => (
                          <div key={index}>
                            <Field  as={TextField} name={`${fieldName}.${index}`} />
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a unit from the list
                            >
                              -
                            </Button>
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                            >
                              +
                            </Button>
                          </div>
                        ))
                      ) : (
                        <Button type="button" onClick={() => arrayHelpers.push('')}>
                            Add
                        </Button>
                      )}
                    </div>
                  )}
                />
      }     
       case "boolean": 
        return  (<div key={fieldName} style={{ marginBottom: '16px' }}>
                <FormControlLabel  name={fieldName} fullWidth control={<Switch />} label={key}/>
         </div>)
      case "number":return  (<div key={fieldName} style={{ marginBottom: '16px' }}>
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
      return  (<div key={fieldName} style={{ marginBottom: '16px' }}>
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
