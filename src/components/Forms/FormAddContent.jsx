import { Alert, Box, Button, Skeleton, Stack } from "@mui/material";
import FormBase from "./FormBase";
import PropTypes from "prop-types"
import formConfigs from "./formConfigs";
import { useGetActivityTypeVersionsOfActivityType } from "../Hooks/requests/ActivityTypeVersion";
import { useEffect, useState } from "react";
import { useGetActivityTypes } from "@components/Hooks/requests/ActivityType";


/**
 * @todo en el caso de que venga mas de un activityTypeVersion, habilitar la seleccion de aquellos que esten en estado "stashed"
 * @todo revisar validacion de formulario
 * @param {*} param0 
 * @returns 
 */
function FormAddContent({onSubmit, loading, isPublic, ...rest}) {

    const config = formConfigs['Content'];
    const { initialValues } = rest;
    const [jsonTemplate, setJsonTemplate]= useState(null)
    const [option, setOption] = useState(null)
    const { data: activityTypes, isFetching: isFetchingActivityTypes, isError: isErrorActivityTypes} = useGetActivityTypes({enabled: true})
    const { data: activityTypeVersions, isFetching: isFetchingActivityTypeVersion, isError} = useGetActivityTypeVersionsOfActivityType({activityTypeId: option, enabled: !!option})

    useEffect(() => {
        if (activityTypes) {
            const activityTypeOptions = activityTypes.map(type => ({
                label: type.name,
                value: type.activityTypeId
            }));
            config.fields = config.fields.map(field => 
                field.name === 'activityTypeId' ? { ...field, options: activityTypeOptions } : field
            );
        }
    }, [activityTypes,config]);
    useEffect(() => {
        if (activityTypeVersions?.length>0&&activityTypeVersions[activityTypeVersions.length-1]?.model){
            setJsonTemplate({model: JSON.parse(activityTypeVersions[activityTypeVersions.length-1].model)})
        }
    }, [activityTypeVersions]);

    const handleSelection = (values)=> {
        setOption(values.activityTypeId)
    }

    const handleSubmit = (values) => {
        const form = {...values, activityTypeVersionId: activityTypeVersions[activityTypeVersions.length-1].activityTypeVersionId}
        onSubmit(form)
    }
    return (  
        (loading || isFetchingActivityTypes )
            ? <Stack spacing={2} display={"flex"}>
                {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} variant="rectangular" width="100%" height={16} />
                ))}
              </Stack>
            : (isError || isErrorActivityTypes)
                ?<Alert severity="error" >Hubo un error al obtener los tipos de actividad</Alert>
      :<FormBase
            fields={config.fields}
            initialValues={ initialValues  || { publicContent: isPublic ?? false, activityTypeId: "" }}
            validationSchema={config.validationSchema}
            onSubmit={handleSubmit}
            disableForm={loading}
            jsonTemplate={jsonTemplate}
            isLoadingTemplate={isFetchingActivityTypeVersion}
            onFieldChange={handleSelection}
            loading= {isFetchingActivityTypeVersion || loading}
            {...rest}
        >
       
             <Box display={"flex"} justifyContent={"right"} mt={2}>    

                <Button key="submit" type="submit" disabled={loading}>Guardar</Button>
            </Box>
        </FormBase> 
    );
}


export default FormAddContent;


FormAddContent.propTypes={
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
    isPublic: PropTypes.bool
}