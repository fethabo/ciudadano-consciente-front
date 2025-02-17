import { Box, Button, LinearProgress } from "@mui/material";
import FormBase from "./FormBase";
import formConfigs from "./formConfigs";
import PropTypes from "prop-types"

function FormLevel({onSubmit, loading, ...rest}) {

    const config = formConfigs['Level'];
    return (  
      <FormBase
            fields={config.fields}
            initialValues={ { name: null, description: null, hidden: false }}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
            disableForm={loading}
            {...rest}
        >
        {loading && <LinearProgress />}
             <Box display={"flex"} justifyContent={"right"}>
                <Button key="submit" type="submit" disabled={loading}>Guardar</Button>
            </Box>
        </FormBase> 
    );
}

export default FormLevel;

FormLevel.propTypes={
    onSubmit: PropTypes.func,
    loading: PropTypes.bool
}