import { Alert, Box, Card, CardContent, Fade, IconButton, Menu, MenuItem,  Skeleton,  Stack,  Typography } from "@mui/material";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import MapCytoscape from "../../components/MapCytoscape";
import { useDeleteLevel, useGetLevel, useGetLevelChildrens } from "../../components/Hooks/requests/Level";
import AddLevelDialog from "../../components/Dialogs/AddLevelDialog";
import ConfirmDialog from "../../components/Dialogs/ConfirmDialog";
import { useQueryClient } from "@tanstack/react-query";
import EditLevelDialog from "../../components/Dialogs/EditLevelDialog";
import { useDeleteActivity, useGetActivitiesOfLevels } from "../../components/Hooks/requests/Activity";
import ActivityInfo from "./ActivityInfo";
import AddActivityDialog from "../../components/Dialogs/AddActivityDialog";
import EditActivityDialog from "../../components/Dialogs/EditActivityDialog";
import EditLevelPermissionsDialog from "../../components/Dialogs/EditLevelPermissionsDialog";
import EditIcon from "@mui/icons-material/Edit";
import TagsDisplay from "@components/TagsDisplay";
import ReferencesDisplay from "@components/ReferencesDisplay";

/**
 * CONFIGURACION DE MAPA DE LA ORGANIZACION.
 * @todo: AGREGAR ACA, al seleccionar el level, que muestre el crud de referencias
 * @returns 
 */
export default function MapConfig() {

  const { idParentLevel } = useParams();
  //Obtengo el path y los childrens del nivel padre
  const {data: path, isFetching: isFetchingPath, isError: isErrorPath}= useGetLevel({levelId: idParentLevel, enabled: !!idParentLevel});
  const {data: childrens, isFetching: isFetchingChildrens, isError: isErrorChildrens}= useGetLevelChildrens({levelId: idParentLevel, enabled:!!idParentLevel})
  //obtengo activities de todos los childrens. (ojo con la key de la query, es activityByLevel)
  const {data: activities, isPending} = useGetActivitiesOfLevels({levels:childrens ?? [], enabled: childrens?.length>0&&!isFetchingChildrens})
  const queryClient = useQueryClient()
  
  const [levelSelectedId, setLevelSelectedId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: null, y: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapElements,setMapElements]=useState([]);
  const [activity,setActivity]= useState(null);
  
  //useEffect para construir el mapa
  useEffect(() => {
    if (!!childrens && childrens.length > 0 && !isPending) {
      const elements = [];
      const childrenCountMap = new Map(); // Para contar los hijos procesados por cada nodo
      // Función para encontrar la posición de un nodo según su parentId
      const getPosition = (parentId) => {
        if (!parentId) {
          // Nodo raíz: posición inicial
          return { x: 50, y: 50 };
        }  
        const parentElement = elements.find(el => el.data.id === parentId);
        if (parentElement) {
          // Si ya tiene hijos, calcular posición en línea recta hacia abajo
          const count = childrenCountMap.get(parentId) || 0;
          const newPosition = {
            x: parentElement.position.x + 150, // Desplazamiento horizontal por rama
            y: parentElement.position.y + count * 100 // Desplazamiento vertical incremental
          };
  
          // Actualiza el contador de hijos procesados para este nodo
          childrenCountMap.set(parentId, count + 1);
          return newPosition;
        } else {
          // Si el padre no está encontrado (caso borde), posición inicial
          return { x: 50, y: 50 };
        }
      };
  
      // Construye los elementos del mapa
      childrens.forEach(level => {
        const position = getPosition(level.parent);
        elements.push({
          data: {
            id: level.levelId,
            label: level.name,
            activity: activities?.find(act => act?.level === level.levelId)
          },
          position,
          classes: 'outline'
        });
  
        // Agregar transiciones
        if (level.parent) {
          elements.push({
            data: { source: level.parent, target: level.levelId }
          });
        }
      });
  
      setMapElements(elements);
    }
  }, [childrens, activities, isPending]);
    
//Handling select nodo
const handleSelect= (value)=>{
  setLevelSelectedId(value?.data?.id)
  setActivity(value?.data?.activity ?? null)
  setMenuPosition(value?.positionNode ?? {x:null, y:null})
  if (value?.data?.id) { setMenuOpen(true)}
}

//handling close del menu de seleccion de nodo
const handleClose = () => {
  setMenuOpen(false);
};

//handling add level
const [openAddLevel, setOpenAddLevel]= useState(false);
const handleAddLevel=()=>{
  setOpenAddLevel(true)
  handleClose();
}

//Handling delete action
const [deleteLevel, setDeleteLevel] = useState(null);
const [openDeleteLevel, setOpenDeleteLevel] = useState(false);
const {data: responseDelete, isFetching: isFetchingDelete,isFetchedAfterMount: isFetchedAfterMountDelete } = useDeleteLevel({levelId: deleteLevel, enabled: !!deleteLevel});
useEffect(() => {
  if (responseDelete && !isFetchingDelete && isFetchedAfterMountDelete){
    console.log("RESPUESTA DELETE uef", responseDelete)
    setDeleteLevel(null)
    queryClient.resetQueries({ queryKey: ['useDeleteLevel', levelSelectedId], exact: true })   //la reseteo para que me permita borrar otro
    setOpenDeleteLevel(false);
    queryClient.resetQueries({ queryKey: ['useGetLevelChildrens', idParentLevel], exact: true }) 
  }
}, [responseDelete, isFetchingDelete, queryClient, levelSelectedId, idParentLevel, isFetchedAfterMountDelete]);

const handleDeleteLevel=()=>{
  setOpenDeleteLevel(true)
  handleClose();
}


//Handling edit action
const [openEditLevel, setOpenEditLevel] = useState(false);
const handleEdit=()=>{
  setOpenEditLevel(true),
  handleClose();
}

//handling add Activity
const [openAddActivity, setOpenAddActivity] = useState(false);
const handleAddActivity = ()=>{
  setOpenAddActivity(true);
  handleClose();
}

//handling edit Activity
const [openEditActivity, setOpenEditActivity] = useState(false);
const handleEditActivity = () => {
  setOpenEditActivity(true);
  handleClose();
}

//handling delete Activity
const [openDeleteActivityDialog, setOpenDeleteActivityDialog] = useState(false);
const [ deleteActivity, setDeleteActivity ] = useState(null);
const { data: responseDeleteActivity, isFeching: isFetchingDeleteActivity, isFetchedAfterMount: isFetchedAfterMountDeleteActivity } = useDeleteActivity({activityId: deleteActivity, enabled: !!deleteActivity});

const handleDeleteActivity = () => {
  setOpenDeleteActivityDialog(true);
  handleClose();
}
useEffect(() => {
  if (responseDeleteActivity && !isFetchingDeleteActivity &&isFetchedAfterMountDeleteActivity){
    console.log("RESPUESTA DELETE ACTIVITY", responseDeleteActivity)
    setDeleteActivity(null)
    queryClient.resetQueries({ queryKey: ['useDeleteActivity', activity?.activityId], exact: true })   //la reseteo para que me permita borrar otro
    setOpenDeleteActivityDialog(false);
    queryClient.resetQueries({ queryKey: ['useGetLevelChildrens', idParentLevel], exact: true }) 
    setActivity(null)
  }
}, [ queryClient, levelSelectedId, idParentLevel, responseDeleteActivity, isFetchingDeleteActivity, activity, isFetchedAfterMountDeleteActivity]);

//Apertura de permisos
const [openEditPermissions, setOpenEditPermissions] = useState(false);
const handleEditPermissions = () => {
  setOpenEditPermissions(true);
  handleClose();
}

const [openEditPath, setOpenEditPath] = useState(false);

    return (
    <Box>
      <Card>
        <CardContent gap="1em">
        <Stack justifyContent={"space-between"} flexWrap={"wrap"} display="flex" width="100%" alignItems="center" flexDirection={"row"}>
          <Typography variant="h6" className="nombre">Configuración de mapa: </Typography>
          <Box>
            <IconButton onClick={()=>setOpenEditPath(true)}  variant="contained" color="secondary" size="small">
              <EditIcon />
            </IconButton>
          </Box>
        </Stack> 
        <EditLevelDialog open={openEditPath} level={childrens?.find((c)=>idParentLevel==c?.levelId)} handleClose={()=> setOpenEditPath(false)} path={idParentLevel} />
        <Stack textAlign="left">
          <Typography variant="body1" >{path?.name}</Typography>
          <Typography variant="body1" >Descripción: {path?.description}</Typography>
          <Typography variant="body1" >Etiquetas:</Typography><TagsDisplay entityId={idParentLevel} entityType="levels" />    
          <Typography variant="body1" >Referencias:</Typography><ReferencesDisplay entityId={idParentLevel} entityType="levels" />    
        </Stack>
        </CardContent>
      </Card>
        {
            (isFetchingPath||isFetchingChildrens) ? <Skeleton variant="rectangular" width="100%" height={400} /> :
            (isErrorPath||isErrorChildrens)? <Alert severity="error">Hubo un error al obtener el mapa</Alert>:
            path
             && <div className="path" >
                    {mapElements&&mapElements?.length>0
                    &&<> <MapCytoscape elements={mapElements} onSelect={handleSelect} loading={isFetchingChildrens} />
                     <Menu
                      open={menuOpen}
                      TransitionComponent={Fade}
                      onClose={handleClose}
                      anchorReference="anchorPosition"
                      anchorPosition={
                        menuOpen && (menuPosition.x !== (null || undefined)) && (menuPosition.y !== (null || undefined))
                          ? { top: menuPosition?.y, left: menuPosition?.x }
                          : undefined
                      }
                    >
                     {!activity ? <MenuItem onClick={() => handleAddActivity()}>Agregar Actividad</MenuItem>
                     :([<MenuItem key="edit-activity" onClick={() => handleEditActivity()}>Editar Actividad</MenuItem>,
                     <MenuItem key="delete-activity"onClick={() => handleDeleteActivity()}>Eliminar Actividad</MenuItem>])
                     }
                      <MenuItem onClick={() => handleAddLevel()}>Agregar Level</MenuItem>
                      <MenuItem onClick={() => handleDeleteLevel()} disabled={!!activity}>Eliminar</MenuItem>
                      <MenuItem onClick={() => handleEdit()}>Editar</MenuItem>
                      <MenuItem onClick={() => handleEditPermissions()}>Editar permisos</MenuItem>
                    </Menu>
                      <AddLevelDialog open={openAddLevel} idParent={levelSelectedId} handleClose={()=> setOpenAddLevel(false)} path={idParentLevel}/>
                      <EditLevelDialog open={openEditLevel} level={childrens?.find((c)=>levelSelectedId==c?.levelId)} handleClose={()=> setOpenEditLevel(false)} path={idParentLevel} />
                      <ConfirmDialog   open={openDeleteLevel} onClose={()=>setOpenDeleteLevel(false)} onConfirm={()=>setDeleteLevel(levelSelectedId)} title="Eliminar el nivel" message={`Eliminando el nivel ${levelSelectedId}. ¿Está seguro?`} loading={isFetchingDelete}/>
                      <AddActivityDialog open={openAddActivity} idLevel={levelSelectedId} handleClose={()=> setOpenAddActivity(false)} path={idParentLevel}/>
                      <ConfirmDialog   open={openDeleteActivityDialog} onClose={()=>setOpenDeleteActivityDialog(false)} onConfirm={()=>setDeleteActivity(activity?.activityId)} title="Eliminar la actividad" message={`Eliminando la actividad ${activity?.activityId} del level ${levelSelectedId}. Esta acción no borrará el contenido que ejecuta la actividad de este nivel ¿Está seguro?`} loading={isFetchingDeleteActivity}/>
                      <EditActivityDialog open={openEditActivity} activity={activity} handleClose={()=> {setOpenEditActivity(false); setActivity(null)}} path={idParentLevel}/>
                      <EditLevelPermissionsDialog open={openEditPermissions} level={childrens?.find((c)=>levelSelectedId==c?.levelId)} handleClose={()=> setOpenEditPermissions(false)} path={idParentLevel} />
                                       
                      {
                        (isPending|| isFetchingChildrens) ? (
                          <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
                        ):activity &&
                        <ActivityInfo activity={activity} />
                      }
                    </>
                    }
                </div>            
            }
                
    </Box>
    )
  }