import { Box, Button } from "@mui/material";
import FormBase from "./FormBase";
import formConfigs from "./formConfigs";
import PropTypes from "prop-types"
import { useState } from "react";
import ContentChooser from "@components/ContentChooser/index.";
import SkeletonFormActivity from "./SkeletonFormActivity";

/**
 * @param {*} param0 
 * @returns 
 */
function FormActivity({onSubmit, loading, ...rest}) {

    const {initialValues} = rest
    const config = formConfigs['Activity'];
    
    const [contentSelected, setContentSelected] = useState(initialValues?.content)
    const handleSubmit = (v) =>{
        const form = {...v, content: contentSelected ?? initialValues?.content}
        onSubmit(form);
     //   console.log("form",form)
    }
   // console.log("contentSelected",contentSelected)

    return (  
        <>
        {loading ? 
        <SkeletonFormActivity/>
        : 
        <FormBase
            fields={config.fields}
            initialValues={ { description: '' }}
            validationSchema={config.validationSchema}
            onSubmit={handleSubmit}
            disableForm={loading }
            {...rest}
        >
             <ContentChooser onSelectContent={setContentSelected} initialContentId={initialValues?.content}/>
            <Box display={"flex"} justifyContent={"right"}>
                <Button key="submit" type="submit" disabled={!contentSelected}>Guardar</Button>
            </Box>
        </FormBase> 
        }
                  
        </>
    );
}

export default FormActivity;

FormActivity.propTypes={
    onSubmit: PropTypes.func,
    loading: PropTypes.bool
}