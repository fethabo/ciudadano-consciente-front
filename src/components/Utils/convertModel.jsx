/**
             * Converts a JSON string model into an object with nested arrays converted to strings.
             *
             * @param {string} model - The JSON string representing the model to be converted.
             * @returns {Object} The converted model with nested arrays as strings.
             */
export default function convertModel(model) {
    const parsedModel = JSON.parse(model);
    const convertedModel = {};

    const convertNested = (obj, path = '') => {
        const result = {};
        Object.keys(obj).forEach(key => {
            const currentPath = path ? `${path}.${key}` : key;
            if (typeof obj[key] === 'string' && obj[key].startsWith('[') && obj[key].endsWith(']')) { //si es un arreglo como string lo parseo
                try {
                    result[key] = JSON.parse(obj[key]);
                } catch (e) {
                    result[key] = obj[key];
                }
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = convertNested(obj[key], currentPath); // si es un objeto lo sigo convirtiendo
            } else {
                result[key] = obj[key];
                //si es arreglo se mantiene TODO: DECLARAR RESTRICCION EN CREACION DE MODELS, SI SE USA UN ARREGLO SUS ELEMENTOS DEBEN SER PRIMITIVOS (AL MENOS POR AHORA).
            }
        });
        return result;
    };

    Object.keys(parsedModel).forEach(key => {
       if (typeof parsedModel[key] === 'string' && parsedModel[key].startsWith('[') && parsedModel[key].endsWith(']')) { // si es un arreglo como string lo parseo
            try {
                convertedModel[key] = JSON.parse(parsedModel[key]);
            } catch (e) {
                convertedModel[key] = parsedModel[key];
            }
        } else if (typeof parsedModel[key] === 'object' && parsedModel[key] !== null) { // si es un objeto convierto el nested
            convertedModel[key] = convertNested(parsedModel[key], key);
            } 
            else {
                convertedModel[key] = parsedModel[key];// en caso de primitivos o arreglos mantengo el valor
            }
    });

    return convertedModel;
}