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
            // Añadir más campos aquí según sea necesario
        ],
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
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
