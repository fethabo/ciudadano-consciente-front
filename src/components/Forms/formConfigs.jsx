import * as Yup from 'yup';

export const formConfigs = {

    Activity: {
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
    
    Content: {
        fields: [
            { name: 'activityTypeVersionId', label: 'Tipo de actividad', type: 'select', placeholder: 'Seleccione el tipo de actividad', options: [{value:'multiple-choice', label:'multiple-choice'}] },
            { name: 'creator', label: 'Creador', type: 'text', placeholder: 'Ingrese el creador' },
            { name: 'organization', label: 'Organizacion', type: 'select', placeholder: 'Seleccione la organizacion' },
            { name: 'publicContent', label: 'Público', type: 'checkbox', placeholder: '¿Es público?' },
            { name: 'model', label: 'CONTENIDO', type: 'textArea', placeholder: 'ESTE FIELD DEBE TENER EL MODELO CON DATOS' },
           
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
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
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            // Añadir más validaciones aquí según sea necesario
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
