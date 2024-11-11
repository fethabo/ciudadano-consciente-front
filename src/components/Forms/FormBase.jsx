import { MenuItem, TextField } from '@mui/material';
import { Formik, Form, Field, /* ErrorMessage */ } from 'formik';
import PropTypes from "prop-types"

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { DynamicSubForm } from './DynamicSubForm';

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
          jsonTemplate // Agregamos el template JSON como prop adicional
        }) {
          const combinedInitialValues = { ...initialValues };
        
          return (
            <Formik
              initialValues={combinedInitialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formState) => (
                <Form>
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
                          disabled={disableForm}
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
                          disabled={disableForm}
                          {...field.props}
                        />
                      )}
                    </div>
                  ))}
        
                  {/* Renderizar el subformulario dinámico */}
                  {jsonTemplate && <DynamicSubForm jsonTemplate={jsonTemplate} />}
        
                  {/* Renderizar los elementos hijos, como los botones de submit */}
                  {children}
                </Form>
              )}
            </Formik>
          );
        }
        
/* export default function FormBase({ fields, initialValues, validationSchema, onSubmit, children, disableForm, onAddition }){

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      
    >
      {(formState) => (
          <Form>
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
                 disabled={disableForm}
                 {...field.props}
               >
                 {field.options?.map((option) => (
                   <MenuItem key={option.value} value={option.value} sx={{gap:"1em"}}>
                     {option.icon && option.icon}{option.label}

                   </MenuItem>
                 ))}
                 {field?.allowAdditions &&
                 <MenuItem key={"create"} value={""} onClick={()=>onAddition()} sx={{gap:"1em"}}>
                   <LibraryAddIcon /> Agregar
                 </MenuItem>
                 }
               </Field>
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
                  disabled={disableForm}
                  {...field.props}
                />
              )}
            </div>
          ))}
          {children}
        </Form>
      )}
    </Formik>
  );
}
*/
FormBase.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object),
    initialValues: PropTypes.object,
    validationSchema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    disableForm: PropTypes.bool,
    onAddition: PropTypes.func,
    jsonTemplate: PropTypes.object
}
 