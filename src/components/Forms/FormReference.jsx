import FormBase from "./FormBase";
import formConfigs from "./formConfigs";
import { Button, LinearProgress } from "@mui/material";
import PropTypes from "prop-types"

function FormReference({ levelId, loading, ...rest }) {
    
    const config = formConfigs['Reference'];
    
    const {initialValues} = rest

    return ( 
        <FormBase
        fields={config.fields}
        validationSchema={config.validationSchema}
        initialValues={ initialValues ?? { title: "", description: "", url: "", level: levelId } }
        disableForm={loading}
        {...rest}
    >
         <Button key="submit" type="submit" disabled={loading}>{initialValues? "guardar":"Agregar"}</Button>
         {loading && <LinearProgress />}
    </FormBase> 
     );
}

export default FormReference;

FormReference.propTypes={
    levelId: PropTypes.number,
    loading: PropTypes.bool
}