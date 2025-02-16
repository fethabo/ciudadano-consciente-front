import { Box, Card, CardContent, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import MapCytoscape from "../../components/MapCytoscape";
import WindowLevel from "../../components/WindowLevel";
import { useGetLevel, useGetLevelChildrens } from "../../components/Hooks/requests/Level";
import {  useGetAnswersOfUserFromLevel } from "../../components/Hooks/requests/Answer";
import { useGetActivitiesOfLevels, useGetActivityByLevel } from "../../components/Hooks/requests/Activity";
import useMap from "../../components/Hooks/useMap";
import { Skeleton } from "@mui/material";
import Vote from "../../components/Vote";
import useUserApi from "@components/Hooks/useUserApi";
import { useGetUserVotes } from "@components/Hooks/requests/Users/Index";
import TagsDisplay from "@components/TagsDisplay";

/* TODO: 
* cambiar estilo de nodo si tiene respuesta correcta 
* agregar estilo a conexiones entre nodos si existe respuesta correcta en el parent,
* vincular answers
*/

const Map = () => {

  const { idParentLevel } = useParams();
  const {data: path, isFetching: isFetchingPath, isError: isErrorPath}= useGetLevel({levelId: idParentLevel, enabled: !!idParentLevel});
  const {data: childrens, isFetching: isFetchingChildrens, isError: isErrorChildrens}= useGetLevelChildrens({levelId: idParentLevel, enabled:!!idParentLevel})
  const {data: answers, isFetching: isFetchingAnswers, isError: isErrorAnswers}= useGetAnswersOfUserFromLevel({levelId: idParentLevel, enabled:!!idParentLevel})
  const {data: activities, isPending} = useGetActivitiesOfLevels({levels:childrens ?? [], enabled: childrens?.length>0})
  console.log(activities)
  const {activity, setActivity, setLevelSelected} = useMap();
const [mapElements,setMapElements]=useState([]);

useEffect(() => {
  if (!!childrens && childrens.length > 0 && !isPending) {
    const elements = [];
    const auxParents=[];
    // Función para encontrar la posición de un elemento según su parentId
    const getPosition = (parentId) => {
      console.log("parentId",parentId);
      const parentElement = elements.find(el => el.data.id === parentId);
      if (parentElement) {
        const childrenAuxSize= [...auxParents].filter(x => x===parentId).length;
       // console.log(childrenAuxSize)
        auxParents.push(parentId);
        // Si se encuentra el elemento padre, la posición será un poco más a la derecha
        return { x: parentElement.position.x + 150, y: parentElement.position.y+ (childrenAuxSize*100) };
      } else {
        // Si no hay elemento padre, posición inicial
        return { x: 50, y: 50 };
      }
    };

    // Iterar sobre los childrens
    childrens.forEach(level => {
      // Calcular la posición
      const position = getPosition(level.parent);
      // Agregar el nuevo elemento
      elements.push({ data:{id:level.levelId, label: level.name, activity: activities?.find((act)=> act?.level==level.levelId) }, position:position, classes: 'outline' });
      // Si hay parentId, agregar enlace desde el padre
      //falta reubicar los niveles inferiores en una linea (conviene armar una matriz?)
      if (level.parent) {
        elements.push({
          data: { source: level.parent, target: level.levelId }
        });
      }
    });

    // Actualizar el estado con los nuevos elementos
    setMapElements(elements);
  }
}, [childrens, isPending, activities]);


const [levelSelectedId, setLevelSelectedId] = useState(null);

const handleSelect= (value)=>{
  setLevelSelectedId(value?.data?.id)
  setActivity(value?.data?.activity)  
  setLevelSelected(childrens?.find((level)=>level?.levelId===Number(levelSelectedId)))
}
const { userId } = useUserApi()
const {data: userVotes, isFetching: isFetchingUserVotes, isError: isErrorUserVotes} = useGetUserVotes({userId: userId, enabled: !!userId})

    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom textAlign={"left"}>Mapa</Typography>
        <WindowLevel open={!!activity && !!levelSelectedId} activity={!!activity && activity} level={childrens?.find((level) => level?.levelId === Number(levelSelectedId))} handleClose={() => setActivity(null)} />
        {path ? (
         
         <Card className="path" sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 2 }}>
           <CardContent>
            <Typography variant="h5" className="nombre" gutterBottom>{path.name}</Typography>
            <Typography variant="body1" className="descripcion" gutterBottom>{path.description}</Typography>
            <Vote entityId={path.levelId} entityType="levels" isLoading={isFetchingUserVotes} isError={isErrorUserVotes} userVotes={userVotes} />
            <TagsDisplay  entityId={path.levelId} entityType="levels" />
            {mapElements && mapElements?.length > 0 && <MapCytoscape elements={mapElements} onSelect={handleSelect} />}
            </CardContent>
          </Card>
        ) : (
          <Skeleton variant="rectangular" height="50vh" />
        )}
      </Box>
    );
  };
  
  export default Map;
