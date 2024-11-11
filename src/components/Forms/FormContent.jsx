import { Box, Button, LinearProgress } from "@mui/material";
import FormBase from "./FormBase";
import PropTypes from "prop-types"
import formConfigs from "./formConfigs";

function FormContent({onSubmit, loading, ...rest}) {

    const config = formConfigs['Content'];
    const jsonTemplate = {model: {"options": {"A": "", "B": "", "C": "", "D": ""}, "question": "", "correct_answer": ""}}
    return (  
      <FormBase
            fields={config.fields}
            initialValues={ { publicContent: false, activityTypeVersionId: "" }}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
            disableForm={loading}
            jsonTemplate={jsonTemplate}
            {...rest}
        >
        {loading && <LinearProgress />}
             <Box display={"flex"} justifyContent={"right"}>
                <Button key="submit" type="submit" disabled={loading}>Guardar</Button>
            </Box>
        </FormBase> 
    );
}


export default FormContent;


FormContent.propTypes={
    onSubmit: PropTypes.func,
    loading: PropTypes.bool
}