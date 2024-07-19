import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { URL_API } from '../../constants';
import { useGetActivityTypeVersion } from '../Hooks/requests/ActivityTypeVersion';
import useMap from '../Hooks/useMap';


function Campo ({field, value}){    
    return(
        <>
            {field}
           { (typeof value === 'string' || value instanceof String)
            ?
                <div>
                    <Field type={value} name={field}  />
                    <ErrorMessage name={field} component="div" />
                </div>
            : Object.keys(value).map((f, index)=>
                <Campo key={index} field={f} value={value[f]} />
            )
}
        </>
        )
}


export default function FormActivityContent() {
    //const {activityTypeVersionId}= useMap();
      /* TODO: cambiar id, que lo obtenga del contexto? */
      
    const activityTypeVersionId= 57;
    const [data,isFetching,isError] = useGetActivityTypeVersion({activityTypeVersionId: activityTypeVersionId, enabled:!!activityTypeVersionId})
    const [activityTypeVersionModel, setActivityTypeVersionModel] = useState(null);
    
    useEffect(() => {
        if (!!data){
            const model = JSON.parse(data.model)
            setActivityTypeVersionModel(model)
        }
    }, [data]);
    //const [fields, setFields] = useState([]);
    /* useEffect(() => {
            axios.get(`${URL_API}/activity-type-version/57`)
              .then((response)=>{
                const model = JSON.parse(response.data.model)
                setActivityTypeVersionModel(model)
                console.log("ActivityTypeVersion:", response.data)
              }
              )
       }, []); */
console.log(activityTypeVersionModel)


    
return(
    <div>
        <h1>Form activity</h1>
      {activityTypeVersionModel &&
        <Formik
       /*  initialValues={{ email: '', password: '' }} */
       /*  validate={values => {
            const errors = {};
            if (!values.email) {
            errors.email = 'Required';
            } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
            errors.email = 'Invalid email address';
            }
            return errors;
        }} */
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            }, 400);
        }}
        >
        {({ isSubmitting }) => (
            <Form>
              {Object.keys(activityTypeVersionModel).map((field, index)=>
                    <Campo key={index} field={field} value={activityTypeVersionModel[field]} />
            )}
                
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </Form>
        )}
        </Formik>}
    </div>
    );

    }