import { Box, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import MapCytoscape from "../../components/MapCytoscape";
import WindowLevel from "../../components/WindowLevel";
import { useGetLevel, useGetLevelChildrens } from "../../components/Hooks/requests/Level";
import { useGetAnswersOfUserFromLevel } from "../../components/Hooks/requests/Answer";
import { useGetActivitiesOfLevels } from "../../components/Hooks/requests/Activity";
import useMap from "../../components/Hooks/useMap";
import { Skeleton } from "@mui/material";
import Vote from "../../components/Vote";
import useUserApi from "@components/Hooks/useUserApi";
import { useGetUserVotes } from "@components/Hooks/requests/Users/Index";
import TagsDisplay from "@components/TagsDisplay";
import ReferencesDisplay from "@components/ReferencesDisplay";

const Map = () => {

  const { idParentLevel } = useParams();
  const {data: path, isFetching: isFetchingPath, isError: isErrorPath}= useGetLevel({levelId: idParentLevel, enabled: !!idParentLevel});
  const {data: childrens, isFetching: isFetchingChildrens, isError: isErrorChildrens}= useGetLevelChildrens({levelId: idParentLevel, enabled:!!idParentLevel})
  const {data: answers, isFetching: isFetchingAnswers, isError: isErrorAnswers, refetch: refetchAnswers}= useGetAnswersOfUserFromLevel({levelId: idParentLevel, enabled:!!idParentLevel})
  const {data: activities, isPending} = useGetActivitiesOfLevels({levels:childrens ?? [], enabled: childrens?.length>0})
  const {activity, setActivity, setLevelSelected} = useMap();
  const [mapElements, setMapElements] = useState([]);

 useEffect(() => {
  refetchAnswers();
 }, []);
 //console.log(answers)

  useEffect(() => {
    if (!!childrens && childrens.length > 0 && !isPending) {
      const elements = [];
      const auxParents = [];
      
      // Función para encontrar la posición de un elemento según su parentId
      const getPosition = (parentId) => {
        const parentElement = elements.find(el => el.data.id === parentId);
        if (parentElement) {
          const childrenAuxSize = [...auxParents].filter(x => x === parentId).length;
          auxParents.push(parentId);
          // Si se encuentra el elemento padre, la posición será un poco más a la derecha
          return { x: parentElement.position.x + 150, y: parentElement.position.y + (childrenAuxSize * 100) };
        } else {
          // Si no hay elemento padre, posición inicial
          return { x: 50, y: 50 };
        }
      };
      
      // Verificar si un nivel tiene respuestas y si tiene alguna respuesta correcta
      const processAnswersForLevel = (levelId) => {
        if (!answers) return { hasAnswers: false, hasCorrectAnswer: false };
        
        const levelAnswers = answers.filter(answer => answer?.level === levelId);
        const hasCorrectAnswer = levelAnswers.some(answer => answer?.status === true);
        
        return {
          hasAnswers: levelAnswers?.length > 0,
          hasCorrectAnswer: hasCorrectAnswer,
          answers: levelAnswers
        };
      };

      // Iterar sobre los childrens
      childrens.forEach(level => {
        // Calcular la posición
        const position = getPosition(level.parent);
        
        // Obtener información de respuestas para este nivel
        const answerInfo = processAnswersForLevel(level.levelId);
        console.log("answers and answer info", answers, answerInfo)
        // Agregar el nuevo elemento
        elements.push({ 
          data: {
            id: level.levelId, 
            label: level.name, 
            activity: activities?.find((act) => act?.level == level.levelId),
            hasActivity:  !!activities?.find((act) => act?.level == level.levelId),
            hasAnswers: answerInfo?.hasAnswers,
            hasCorrectAnswer: answerInfo?.hasCorrectAnswer,
            answers: answerInfo?.answers
          }, 
          position: position, 
          classes: `outline ${answerInfo.hasCorrectAnswer ? 'correct-node' : ''}`
        });
        
        // Si hay parentId, agregar enlace desde el padre
        if (level.parent) {
          // Verificar si el padre tiene respuesta correcta
          const parentAnswerInfo = processAnswersForLevel(level.parent);
          
          elements.push({
            data: { 
              source: level.parent, 
              target: level.levelId 
            },
            classes: parentAnswerInfo.hasCorrectAnswer ? 'correct-edge' : ''
          });
        }
      });

      // Actualizar el estado con los nuevos elementos
      setMapElements(elements);
    }
  }, [childrens, isPending, activities, answers]);

  const [levelSelectedId, setLevelSelectedId] = useState(null);

  const handleSelect = (value) => {
    setLevelSelectedId(value?.data?.id)
    setActivity(value?.data?.activity)  
    setLevelSelected(childrens?.find((level) => level?.levelId === Number(value?.data?.id)))
  }
  
  const { userId } = useUserApi()
  const {data: userVotes, isFetching: isFetchingUserVotes, isError: isErrorUserVotes} = useGetUserVotes({userId: userId, enabled: !!userId})

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom textAlign={"left"}>Mapa</Typography>
      <WindowLevel 
        open={!!activity && !!levelSelectedId} 
        activity={!!activity && activity} 
        level={childrens?.find((level) => level?.levelId === Number(levelSelectedId))} 
        handleClose={() => setActivity(null)} 
      />
      {path ? (
   <Card className="path" sx={{ 
    justifyContent: 'center', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    textAlign: 'center', 
    marginBottom: 2,
    position: 'relative' 
  }}>
    <CardContent sx={{
      width: '100%',
      position: 'relative' 
    }}>
      <Vote 
        entityId={path.levelId} 
        entityType="levels" 
        isLoading={isFetchingUserVotes} 
        isError={isErrorUserVotes} 
        userVotes={userVotes}
        sxButton={{
          position: 'absolute',
          top: "0.5em",
          right: "0.5em"
        }}
      />
      
      <Box sx={{display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
        <Box>
          <Typography variant="h5" className="nombre" gutterBottom>{path.name}</Typography>
          <Typography variant="body1" className="descripcion" gutterBottom>{path.description}</Typography>
        </Box>
      </Box>
      
      <TagsDisplay entityId={path.levelId} entityType="levels" />
      {mapElements && mapElements?.length > 0 && (
        <MapCytoscape 
          elements={mapElements} 
          onSelect={handleSelect} 
          loading={isFetchingPath || isFetchingChildrens || isFetchingAnswers || isPending}
        />
      )}
    </CardContent>
  </Card>
      ) : (
        <Skeleton variant="rectangular" height="50vh" />
      )}
      <Card>
        <CardContent>
          <Typography variant="h6" textAlign={"left"}>Referencias</Typography>
          <Typography variant="body2" textAlign={"left"}>Si quieres aprender más sobre el tema, el creador del nivel compartió las siguientes referencias</Typography>
          <ReferencesDisplay entityId={idParentLevel} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Map;