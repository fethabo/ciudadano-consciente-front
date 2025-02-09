import { Alert, Box, Button, Skeleton, Stack } from "@mui/material";
import FormBase from "./FormBase";
import PropTypes from "prop-types"
import formConfigs from "./formConfigs";
import { useGetActivityTypeVersion } from "../Hooks/requests/ActivityTypeVersion";
import { useEffect, useState } from "react";
import { useGetActivityTypes } from "@components/Hooks/requests/ActivityType";
import convertModel from "@components/Utils/convertModel";


/**
 * 
 * @todo revisar validacion de formulario
 * @param {*} param0 
 * @returns 
 */
function FormEditContent({onSubmit, loading, content, ...rest}) {

    const configBase = formConfigs['Content'];
    const [jsonTemplate, setJsonTemplate]= useState(null)
    const { data: activityTypes, isFetching: isFetchingActivityTypes, isError: isErrorActivityTypes } = useGetActivityTypes({enabled: true})
    const { data: activityTypeVersionInicial, isFetching: isFetchingActivityTypeVersionInicial, isError: isErrorActivityTypeVersionInicial} = useGetActivityTypeVersion({activityTypeVersionId: content?.activityTypeVersionId, enabled: !!content})
    const [initialValues, setInitialValues] = useState(null)
    const [config,setConfig] = useState(null)
  
    
    useEffect(() => {
        if(activityTypeVersionInicial&&activityTypes && !isFetchingActivityTypeVersionInicial){
            setJsonTemplate({model: JSON.parse(activityTypeVersionInicial.model)})
           //creo una nueva configuracion para el edit
            const newConfig = { ...configBase, fields: configBase.fields.map(field => 
                field.name === 'activityTypeId' ? { ...field, type: 'info', disabled: true } : { ...field }
            )};
            setConfig(newConfig);
            const activityType = activityTypes?.find(type => type.activityTypeId === activityTypeVersionInicial.activityTypeId);
            const initials = {...content, activityTypeId: activityType?.name};
            initials.model = convertModel(content.model);
            setInitialValues(initials);

        }
    }, [activityTypeVersionInicial, content, isFetchingActivityTypeVersionInicial, activityTypes, configBase ]);//eslint-disable-line
  
   
    return (  
        (loading || isFetchingActivityTypes || isFetchingActivityTypeVersionInicial|| !initialValues )
            ? <Stack spacing={2} display={"flex"}>
                {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} variant="rectangular" width="100%" height={16} />
                ))}
              </Stack>
            : (isErrorActivityTypeVersionInicial|| isErrorActivityTypes)
                ? <Alert severity="error">Hubo un error al obtener los datos del tipo de actividad, vuelve a intentarlo</Alert>
            :
      <FormBase
            fields={config.fields}
            initialValues={ initialValues}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
            disableForm={loading}
            jsonTemplate={jsonTemplate}
            isLoadingTemplate={isFetchingActivityTypeVersionInicial}
          //  onFieldChange={handleSelection}
            loading= {isFetchingActivityTypeVersionInicial}
            {...rest}
        >
       
             <Box display={"flex"} justifyContent={"right"} mt={2}>    
                <Button key="submit" type="submit" disabled={loading}>Guardar</Button>
            </Box>
        </FormBase> 
    );
}


export default FormEditContent;


FormEditContent.propTypes={
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
    content: PropTypes.object
}