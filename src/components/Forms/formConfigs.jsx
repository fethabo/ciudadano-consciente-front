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
    
    ActivityType: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
    Answer: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
    Concern: {
        fields: [
            { name: 'description', label: 'Pregunta', type: 'text', placeholder: 'Ingrese la pregunta' },
            { name: 'explanation', label: 'Desarrollo', type: 'textarea', placeholder: 'Ingrese una aclaración sobre la pregunta' },
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            explanation: Yup.string().required('El desarrollo de la idea es obligatorio'),
            description: Yup.string().required('La pregunta es obligatoria'),
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
    Content: {
        fields: [
            { name: 'activityTypeId', label: 'Tipo de actividad', type: 'select', placeholder: 'Seleccione el tipo de actividad', /* options: [{value: 3, label: 'Elección múltiple'},{value: 2, label: 'Selección múltiple'},{value: 5, label: 'Ordenar secuencia'},{value: 4, label: 'Verdadero o falso'}]  */},
            { name: 'publicContent', label: 'Público', type: 'checkbox', placeholder: '¿Es público?' },
            { name: 'description', label: 'Descripcion', type: 'text',  placeholder: 'Ingrese una descripción'},
            //   { name: 'model', label: 'Datos del contenido', type: 'textArea', placeholder: 'ESTE FIELD DEBE TENER EL MODELO CON DATOS' }, debe ser un subForm
           
        ],
        validationSchema: Yup.object({
            activityTypeId: Yup.string().required('El tipo de actividad es obligatorio'),
            publicContent: Yup.string().required('Indica si el contenido es público'),
          
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
    EntityType: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
    Level: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            { name: 'hidden' , label : 'Oculto', type: 'checkbox' }
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
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
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
    Role: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
    Streak: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
    Tag: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
    User: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
    Vote: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre' },
            { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Ingrese la descripción' },
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            // Añadir más validaciones aquí según sea necesario
        }),
    },
    
};

export default formConfigs;
