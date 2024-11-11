import React from 'react';
import { Field } from 'formik';
import { TextField } from '@mui/material';

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
    return (
      <div key={fieldName} style={{ marginBottom: '16px' }}>
        <Field
          as={TextField}
          name={fieldName}
          label={key}
          placeholder={`Ingrese ${key}`}
          fullWidth
          variant="outlined"
        />
      </div>
    );
  }
};

export const DynamicSubForm = ({ jsonTemplate }) => {
  return (
    <>
      {Object.entries(jsonTemplate).map(([key, value]) =>
        renderField(key, '', value)
      )}
    </>
  );
};
