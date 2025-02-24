import { Box, Button, LinearProgress, Skeleton } from "@mui/material";
import FormBase from "./FormBase";
import formConfigs from "./formConfigs";
import PropTypes from "prop-types"
import { useGetContentsOfOrganization } from "../Hooks/requests/Content";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddContentDialog from "../Dialogs/AddContentDialog";
import ContentChooser from "@components/ContentChooser/index.";

/**
 * @todo agregar search en seleccion de content
 * @param {*} param0 
 * @returns 
 */
function FormActivity({onSubmit, loading, ...rest}) {

    const {idOrganization} = useParams();
    const {data, isFetching, isError} = useGetContentsOfOrganization({organizationId: idOrganization, enabled: !!idOrganization})
    const config = formConfigs['Activity'];
    const [optionsContent, setOptionsContent] = useState([])
    useEffect(() => {
        const field = config?.fields?.find((f) => f?.name === 'content');
        if (field) {
            if (data && data?.length > 0 ) {
                const options = data.map(item => ({
                    value: item.contentId,
                    label: item.description
                }));
                field.options = options;
            }
        }
    }, [data, config, idOrganization, isFetching]);
    const [initialContent, setInitialContent] = useState('')

    const [openAddContent, setOpenAddContent] = useState(false)
    const handleAddContent = () =>{
        setOpenAddContent(true);
    }

   
    return (  
        <>
        {loading || isFetching ? 
        <Box>
            <Skeleton variant="text" width={210} height={40} />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="text" width={210} height={40} />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="text" width={210} height={40} />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="text" width={210} height={40} />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="rectangular" width={100} height={40} />
        </Box>
        : 
        <FormBase
            fields={config.fields}
            initialValues={ { content: initialContent, description: '' }}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
            disableForm={loading || isFetching}
            onAddition={handleAddContent}
            {...rest}
        >
            <Box display={"flex"} justifyContent={"right"}>
                <Button key="submit" type="submit" disabled={loading || isFetching}>Guardar</Button>
            </Box>
        </FormBase> 
        }
        <AddContentDialog resultContent={setInitialContent} open={openAddContent} handleClose={()=>{setOpenAddContent(false)} }/>
        <ContentChooser />
           
        </>
    );
}

export default FormActivity;

FormActivity.propTypes={
    onSubmit: PropTypes.func,
    loading: PropTypes.bool
}