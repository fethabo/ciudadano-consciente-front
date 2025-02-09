import { Box, Button, LinearProgress, Skeleton, Stack } from "@mui/material";
import FormBase from "./FormBase";
import PropTypes from "prop-types"
import formConfigs from "./formConfigs";
import { useGetActivityTypeVersion, useGetActivityTypeVersionsOfActivityType } from "../Hooks/requests/ActivityTypeVersion";
import { useEffect, useState } from "react";
import { useGetActivityTypes } from "@components/Hooks/requests/ActivityType";
import convertModel from "@components/Utils/convertModel";


/**@todo: no necesito el OPTIONS, deshabilitar la seleccion del activityType, solo mostrarlo
 * @todo mostrar mensaje de error en el caso de que haya error -.-
 * @todo en el caso de que venga mas de un activityTypeVersion, habilitar la seleccion de aquellos que esten en estado "stashed"
 * @todo revisar validacion de formulario
 * @param {*} param0 
 * @returns 
 */
function FormEditContent({onSubmit, loading, content, ...rest}) {

    const config = formConfigs['Content'];
   // const { initialValues } = rest;
    const [jsonTemplate, setJsonTemplate]= useState(null)
    const [option, setOption] = useState(null)
    const { data: activityTypes, isFetching: isFetchingActivityTypes, isError: isErrorActivityTypes } = useGetActivityTypes({enabled: true})
    const { data: activityTypeVersions, isFetching: isFetchingActivityTypeVersion, isError: isErrorActivityTypeVersion } = useGetActivityTypeVersionsOfActivityType({activityTypeId: option, enabled: !!option})
    const { data: activityTypeVersionInicial, isFetching: isFetchingActivityTypeVersionInicial, isError: isErrorActivityTypeVersionInicial} = useGetActivityTypeVersion({activityTypeVersionId: content?.activityTypeVersionId, enabled: !!content})
    /* TENGO QUE OBTENER EL ACTIVITY TYPE DESDE EL ACTIVITYTYPEVERSION DEL CONTENT 
        para eso: obtener a partir de activityTypeVersionId el version, luego obtener el activityType, ahi dejar como initial value ese tipo

    */
    const [initialValues, setInitialValues] = useState(null)

    useEffect(() => {
        if (activityTypes) {
            const activityTypeOptions = activityTypes.map(type => ({
                label: type.name,
                value: type.activityTypeId
            }));
            console.log(activityTypeOptions)
            config.fields = config.fields.map(field => 
                field.name === 'activityTypeId' ? { ...field, options: activityTypeOptions } : field
            );
        }
    }, [activityTypes,config]);
    
    useEffect(() => {
        console.log("UEF activity inicial")
        if(activityTypeVersionInicial && !isFetchingActivityTypeVersionInicial){
            const initials = {...content, activityTypeId: activityTypeVersionInicial.activityTypeId};
            initials.model = convertModel(content.model);
            setInitialValues(initials);
        }
    }, [activityTypeVersionInicial, content, isFetchingActivityTypeVersionInicial]);
  
    //Obtengo el model del ultimo activityTypeVersion del activityType
    useEffect(() => {
        if (activityTypeVersions?.length>0&&activityTypeVersions[activityTypeVersions.length-1]?.model){
            setJsonTemplate({model: JSON.parse(activityTypeVersions[activityTypeVersions.length-1].model)})
        }
    }, [activityTypeVersions]);

    const handleSelection = (values)=> {
        setOption(values.activityTypeId)
    }

   
    return (  
        (loading || isFetchingActivityTypes || isFetchingActivityTypeVersionInicial|| !initialValues )
            ? <Stack spacing={2} display={"flex"}>
                {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} variant="rectangular" width="100%" height={16} />
                ))}
              </Stack>
            :
      <FormBase
            fields={config.fields}
            initialValues={ initialValues}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
            disableForm={loading}
            jsonTemplate={jsonTemplate}
            isLoadingTemplate={isFetchingActivityTypeVersion}
            onFieldChange={handleSelection}
            loading= {isFetchingActivityTypeVersion}
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