import { Field, Form, Formik } from "formik";



export default function OrganizationForm() {
    
    
    return (  
            <Formik>
                <Form>
                    <Field></Field>
                        
                        <button type="submit" disabled={isSubmitting}>
                            Guardar
                        </button>
            </Form>
            </Formik>
    );
}

 