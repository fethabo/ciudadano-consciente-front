import FormBase from './FormBase';
import formConfigs from './formConfigs';
import PropTypes from 'prop-types';

/**
 * @example generateForm('Activity', initialValues, onSubmit)
 * @param {*} entityName 
 * @param {*} initialValues 
 * @param {*} onSubmit 
 * @returns 
 */
export const generateForm = (entityName, initialValues, onSubmit, button) => {
    const config = formConfigs[entityName];
    if (!config) {
      console.error(`No hay configuración de formulario para la entidad: ${entityName}`);
      return null;
    }
  
    return (
      <FormBase
        fields={config.fields}
        initialValues={initialValues}
        validationSchema={config.validationSchema}
        onSubmit={onSubmit}
      >
        {button}
      </FormBase>
    );
  };

generateForm.propTypes={
    entityName: PropTypes.string,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
    button: PropTypes.element
}  
