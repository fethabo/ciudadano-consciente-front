import { Field } from 'formik';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import PropTypes from 'prop-types'

/**
 * 
 * @param {*} key 
 * @param {*} path 
 * @param {*} value 
 * @returns 
 */
const renderField = (key, path, value) => {
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
    console.log(fieldName,value)
    //
    switch(value) {
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
};

export const DynamicSubForm = ({ jsonTemplate }) => {
  console.log("jsonTemplate", jsonTemplate)
  return (
    <>
      {Object.entries(jsonTemplate).map(([key, value]) =>
        renderField(key, '', value)
      )}
    </>
  );
};
DynamicSubForm.propTypes= {
  jsonTemplate: PropTypes.object
}
