/**
 * FormBase Component
 * 
 * A reusable form component built with Formik, designed to handle dynamic fields, validation, and submission.
 * 
 * @component
 * 
 * @param {Object[]} fields - Array of field configurations for the form. Each field object can include:
 *   @param {string} fields[].name - The name of the field (used as the key in the form values).
 *   @param {string} [fields[].type="text"] - The type of the field (e.g., "text", "select", "checkbox", "textarea").
 *   @param {string} [fields[].label] - The label for the field.
 *   @param {string} [fields[].placeholder] - Placeholder text for the field.
 *   @param {boolean} [fields[].disabled=false] - Whether the field is disabled.
 *   @param {Object[]} [fields[].options] - Options for select fields. Each option object can include:
 *     @param {string|number} fields[].options[].value - The value of the option.
 *     @param {string} fields[].options[].label - The label for the option.
 *     @param {ReactNode} [fields[].options[].icon] - An optional icon to display alongside the option.
 *   @param {boolean} [fields[].allowAdditions=false] - Whether to allow adding new options to select fields.
 *   @param {Object} [fields[].props] - Additional props to pass to the field component.
 * 
 * @param {Object} initialValues - Initial values for the form fields.
 * 
 * @param {Object} validationSchema - A Yup validation schema for the form.
 * 
 * @param {Function} onSubmit - Callback function to handle form submission.
 * 
 * @param {ReactNode|ReactNode[]} children - Child components to render inside the form, such as submit buttons.
 * 
 * @param {boolean} [disableForm=false] - Whether to disable the entire form.
 * 
 * @param {Function} [onAddition] - Callback function triggered when a new option is added to a select field with `allowAdditions`.
 * 
 * @param {Object} [jsonTemplate] - A JSON template for rendering a dynamic subform.
 * 
 * @param {Function} [onFieldChange] - Callback function triggered whenever a field value changes. Receives the updated form values as an argument.
 * 
 * @param {boolean} [isLoadingTemplate=false] - Whether the dynamic subform template is currently loading.
 * 
 * @param {string} [formTitle] - An optional title to display at the top of the form.
 */
import { MenuItem, Skeleton, Switch, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, useFormikContext } from 'formik';
import PropTypes from "prop-types"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { DynamicSubForm } from './DynamicSubForm';
import { useEffect } from 'react';

const ValuesListener = ({ onFieldChange = ()=>console.log("sin funcion") }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    onFieldChange(values); // Notifica los cambios al padre
  }, [values, onFieldChange]);
}
// Este componente recibirá una lista de campos y otras propiedades de Formik
/**
 * @todo Agregar control de POST, que reciba la funcion por props
 * Si los campos selectores tienen el "allowAdditions" en true se agrega la opcion de agregado y se llama al callback onAddition
 * @description children debe contener el button submit
 * @param {*} param0 
 * @example: 
 *      <FormBase
            fields={config.fields}
            initialValues={ { name: organization?.name, description: organization?.description, email: organization?.email }}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
        >
        {isFetchingPatch && <LinearProgress />}
             <Box display={"flex"} justifyContent={"space-around"}>
                <Button key="volver" onClick={()=>navigate(`/organizations/${idOrganization}`)} disabled={isFetchingPatch}>Volver</Button>
                <Button key="submit" type="submit" disabled={isFetchingPatch||isFetchingOrganization}>GUARDAR</Button>
            </Box>
        </FormBase> 
 * @returns 
 */

        export default function FormBase({
          fields,
          initialValues,
          validationSchema,
          onSubmit,
          children,
          disableForm,
          onAddition,
          jsonTemplate, // Agregamos el template JSON como prop adicional
          onFieldChange,
          isLoadingTemplate,
          formTitle
        }) {
          
           
        
            return (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}

            >
             
              {(formState) => (
              <Form style={{marginTop:'1em'}}>
                 {formTitle && <Typography variant='h6' align='left' marginBottom={"1em"}>{formTitle}</Typography>}
                <ValuesListener onFieldChange={onFieldChange} />
                {fields.map((field) => (
                <div key={field.name} style={{ marginBottom: '16px' }}>
                  {field.type === 'select' ? (
                  <Field
                    name={field.name}
                    as={TextField}
                    select
                    label={field.label || field.name}
                    fullWidth
                    variant="outlined"
                    error={formState.touched[field.name] && Boolean(formState.errors[field.name])}
                    helperText={formState.touched[field.name] && formState.errors[field.name]}
                    disabled={disableForm || field.disabled}
                    {...field.props}
                  >
                    {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={{ gap: "1em" }}>
                      {option.icon && option.icon}{option.label}
                    </MenuItem>
                    ))}
                    {field?.allowAdditions && (
                    <MenuItem key={"create"} value={""} onClick={() => onAddition()} sx={{ gap: "1em" }}>
                      <LibraryAddIcon /> Agregar
                    </MenuItem>
                    )}
                  </Field>
                  ) : field.type === 'checkbox' ? (
                   <>
                    <Typography variant='body1'>{field.label || field.name}</Typography>
                    <Field
                      name={field.name}
                      type="checkbox"
                      as={Switch}
                      label={field.label || field.name}
                      disabled={disableForm || field.disabled}
                      fullWidth
                      defaultChecked={false}
                      {...field.props}
                    />
                  </>
                  ) : field.type === 'textarea' ? (
                  <Field
                  as={TextField}
                  name={field.name}
                  type="text"
                  label={field.label || field.name}
                  placeholder={field.placeholder}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  error={formState.touched[field.name] && Boolean(formState.errors[field.name])}
                  helperText={formState.touched[field.name] && formState.errors[field.name]}
                  disabled={disableForm || field.disabled}
                  {...field.props}
                  />
                  ) : (
                  <Field
                    as={TextField}
                    name={field.name}
                    type={field.type}
                    label={field.label || field.name}
                    placeholder={field.placeholder}
                    fullWidth
                    variant="outlined"
                    error={formState.touched[field.name] && Boolean(formState.errors[field.name])}
                    helperText={formState.touched[field.name] && formState.errors[field.name]}
                    disabled={disableForm || field.disabled}
                    {...field.props}
                  />
                  )}
                </div>
                ))}
               { /* Renderizar el subformulario dinámico */}
                {
                isLoadingTemplate ? (
                  <div>
                  {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} variant="rectangular" width="100%" height={56} style={{ marginBottom: '16px' }} />
                  ))}
                  </div>
                ) : (
                  jsonTemplate && <DynamicSubForm jsonTemplate={jsonTemplate} formState={formState} />
                )
                }

              {  /* Renderizar los elementos hijos, como los botones de submit */}
                {children}
              </Form>
              )}
            </Formik>
            );
        }
        
FormBase.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object),
    initialValues: PropTypes.object,
    validationSchema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    disableForm: PropTypes.bool,
    onAddition: PropTypes.func,
    jsonTemplate: PropTypes.object,
    onFieldChange: PropTypes.func,
    isLoadingTemplate: PropTypes.bool,
    formTitle: PropTypes.string
}
 