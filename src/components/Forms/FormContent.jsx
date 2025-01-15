import { Box, Button, LinearProgress } from "@mui/material";
import FormBase from "./FormBase";
import PropTypes from "prop-types"
import formConfigs from "./formConfigs";
import { useGetActivityTypeVersion, useGetActivityTypeVersionsOfActivityType } from "../Hooks/requests/ActivityTypeVersion";
import { useEffect, useState } from "react";


/**
 * @todo Cambiar config de opciones de activityType, obtener los activityType de la api
 * @todo agregar skeleton con el fetching de los activityTypeVersion
 * @todo mostrar mensaje de error en el caso de que haya error -.-
 * @todo en el caso de que venga mas de un activityTypeVersion, habilitar la seleccion de aquellos que esten en estado "stashed"
 * @todo revisar validacion de formulario
 * @param {*} param0 
 * @returns 
 */
function FormContent({onSubmit, loading, ...rest}) {

    const config = formConfigs['Content'];

    const [jsonTemplate, setJsonTemplate]= useState(null)
    const [option, setOption] = useState(null)
    const { data, isFetching, isError} = useGetActivityTypeVersionsOfActivityType({activityTypeId: option, enabled: !!option})

    useEffect(() => {
        if (data?.length>0&&data[data.length-1]?.model){
            setJsonTemplate({model: JSON.parse(data[data.length-1].model)})
        }
    }, [data]);

    const handleSelection = (values)=> {
        setOption(values.activityTypeId)
    }

    return (  
      <FormBase
            fields={config.fields}
            initialValues={ { publicContent: false, activityTypeId: "" }}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
            disableForm={loading}
            jsonTemplate={jsonTemplate}
            onFieldChange={handleSelection}
            loading= {isFetching}
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