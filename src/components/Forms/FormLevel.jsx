import { Box, Button, Divider, LinearProgress } from "@mui/material";
import FormBase from "./FormBase";
import formConfigs from "./formConfigs";
import PropTypes from "prop-types"
import TagsControl from "@components/TagsControl";
import ReferencesControl from "@components/ReferencesControl";

function FormLevel({onSubmit, loading, ...rest}) {

    const config = formConfigs['Level'];
    const {initialValues} = rest
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
        
        <Divider />
        <br />
         {!!initialValues?.levelId &&
            <TagsControl entityId={initialValues.levelId} entityType="levels"/>
         }   
         
         {!!initialValues?.levelId &&
            <ReferencesControl entityId={initialValues.levelId} entityType="levels"/>
         }
        </FormBase> 
    );
}

export default FormLevel;

FormLevel.propTypes={
    onSubmit: PropTypes.func,
    loading: PropTypes.bool
}