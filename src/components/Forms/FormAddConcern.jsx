import { Box, Button, LinearProgress } from "@mui/material";
import FormBase from "./FormBase";
import formConfigs from "./formConfigs";
import PropTypes from "prop-types"

/**
 * @returns 
 */
function FormAddConcern({onSubmit, loading, ...rest}) {

    const config = formConfigs['Concern'];
   
    return (  
      <FormBase
            fields={config.fields}
            validationSchema={config.validationSchema}
            initialValues={ { explanation: "", description: "" }}
            onSubmit={onSubmit}
            disableForm={loading}
            {...rest}
        >
             <Button key="submit" type="submit" disabled={loading}>Enviar</Button>
        {loading && <LinearProgress />}
             <Box display={"flex"} justifyContent={"right"}>
               
            </Box>
        </FormBase> 
    );
}

export default FormAddConcern;

FormAddConcern.propTypes={
    onSubmit: PropTypes.func,
    loading: PropTypes.bool
}