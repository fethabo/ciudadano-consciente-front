import { Box, Button, LinearProgress } from "@mui/material";
import FormBase from "./FormBase";
import formConfigs from "./formConfigs";
import PropTypes from "prop-types"
import { useGetContents, useGetContentsOfOrganization } from "../Hooks/requests/Content";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddContentDialog from "../Dialogs/AddContentDialog";

/**
 * @todo agregar search en seleccion de content
 * @param {*} param0 
 * @returns 
 */
function FormActivity({onSubmit, loading, ...rest}) {

    const {idOrganization} = useParams();
    const {data, isFetching, isError} = useGetContentsOfOrganization({organizationId: idOrganization, enabled: !!idOrganization})
    const config = formConfigs['Activity'];
    useEffect(() => {
        const field = config?.fields?.find((f) => f?.name === 'content');
        
        if (field) {
            if (data) {
                const options = [];
                data.map(item =>{if((item.organization==idOrganization) || (item.publicContent===false) ){ // me quedo solo con los contenidos de la orgnaizacion o los publicos
                    options.push({
                    value: item.contentId,        
                    label: item.description
                     })}});    
                     console.log(options)
                     field.options = options
            }
        }
    }, [data, config, idOrganization]);
    const [initialContent, setInitialContent] = useState('')

    const [openAddContent, setOpenAddContent] = useState(false)
    const handleAddContent = () =>{
        setOpenAddContent(true);
    }

   
    return (  
        <>
      <FormBase
            fields={config.fields}
            initialValues={ { content: initialContent, description: '' }}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
            disableForm={loading || isFetching}
            onAddition={handleAddContent}
            {...rest}
        >
        {loading|| isFetching && <LinearProgress />}
             <Box display={"flex"} justifyContent={"right"}>
                <Button key="submit" type="submit" disabled={loading || isFetching}>Guardar</Button>
            </Box>
        </FormBase> 
        <AddContentDialog resultContent={setInitialContent} open={openAddContent} handleClose={()=>{setOpenAddContent(false)} }/>
        </>
    );
}

export default FormActivity;

FormActivity.propTypes={
    onSubmit: PropTypes.func,
    loading: PropTypes.bool
}