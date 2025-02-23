import * as Yup from 'yup';

export const formConfigs = {

    Activity: {
        fields: [
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            { name: 'content', label: 'Contenido', type: 'select', placeholder: 'Selecciona el contenido', allowAdditions: true },
        ],
        validationSchema: Yup.object({
            description: Yup.string().required('La descripción es obligatoria'),
            content: Yup.string().required('El contenido es obligatorio'),
        }),
    },
    
   /* 
   Los activityType y ActivityTypeVersion actualmente se crean directo en la bdd
   */
    
    Concern: {
        fields: [
            { name: 'description', label: 'Pregunta', type: 'text', placeholder: 'Ingrese la pregunta' },
            { name: 'explanation', label: 'Desarrollo', type: 'textarea', placeholder: 'Ingrese una aclaración sobre la pregunta' },
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            explanation: Yup.string().required('El desarrollo de la idea es obligatorio'),
            description: Yup.string().required('La pregunta es obligatoria'),
        }),
    },
    
    Content: {
        fields: [
            { name: 'activityTypeId', label: 'Tipo de actividad', type: 'select', placeholder: 'Seleccione el tipo de actividad'},
            { name: 'publicContent', label: 'Público', type: 'checkbox', placeholder: '¿Es público?' },
            { name: 'description', label: 'Descripcion', type: 'text',  placeholder: 'Ingrese una descripción'},
            //   { name: 'model', label: 'Datos del contenido', type: 'textArea', placeholder: 'ESTE FIELD DEBE TENER EL MODELO CON DATOS' }, debe ser un subForm
           
        ],
        validationSchema: Yup.object({
            activityTypeId: Yup.string().required('El tipo de actividad es obligatorio'),
            publicContent: Yup.string().required('Indica si el contenido es público'),
            description: Yup.string().required('Realiza una descripción del contenido para que te sea más sencillo identificarlo'),
        }),
    },
    
    Level: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            { name: 'hidden' , label : 'Oculto', type: 'checkbox', placeholder: '¿Es oculto?' }
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            //hidden no puede ser required, la logica del required para los booleanos es que sea true para que pase la regla. asegurarse de que el checkbox siempre tenga valor false o true y no undefined para que no se rompa la api
        }),
    },
    
    Organization: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            { name: 'email', label: 'Correo', type: 'email', placeholder: 'Ingrese el correo' },
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            email: Yup.string().email('Invalid email').required('Required'),
        }),
    },
    Reference: {
        fields: [
            { name: 'title', label: 'Titulo', type: 'text', placeholder: 'Ingrese la pregunta' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese una aclaración sobre la pregunta' },
            { name: 'url', label: 'URL', type: 'text', placeholder: 'Ingrese una aclaración sobre la pregunta' },
        ],
        validationSchema: Yup.object({
            title: Yup.string().required('El titulo obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
        }),
    },
    
};

export default formConfigs;
