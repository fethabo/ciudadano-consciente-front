import { Box, Fade, LinearProgress, Menu, MenuItem,  Typography } from "@mui/material";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import MapCytoscape from "../../components/MapCytoscape";
import { useDeleteLevel, useGetLevel, useGetLevelChildrens } from "../../components/Hooks/requests/Level";
import AddLevelDialog from "../../components/Dialogs/AddLevelDialog";
import ConfirmDialog from "../../components/Dialogs/ConfirmDialog";
import { useQueryClient } from "@tanstack/react-query";
import EditLevelDialog from "../../components/Dialogs/EditLevelDialog";
import { useGetActivitiesOfLevels } from "../../components/Hooks/requests/Activity";
import ActivityInfo from "./ActivityInfo";
import AddActivityDialog from "../../components/Dialogs/AddActivityDialog";


/**
 * CONFIGURACION DE MAPA DE LA ORGANIZACION.
 * @returns 
 */
export default function MapConfig() {

  const { idParentLevel, idOrganization } = useParams();
  const {data: path, isFetching: isFetchingPath, isError: isErrorPath}= useGetLevel({levelId: idParentLevel, enabled: !!idParentLevel});
  const {data: childrens, isFetching: isFetchingChildrens, isError: isErrorChildrens}= useGetLevelChildrens({levelId: idParentLevel, enabled:!!idParentLevel})
  //TODO: OBTENER ACTIVITIES DE TODOS LOS CHILDRENS...
  const {data: activities, isPending} = useGetActivitiesOfLevels({levels:childrens ?? [], enabled: childrens?.length>0})
  const [levelSelectedId, setLevelSelectedId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: null, y: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapElements,setMapElements]=useState([]);
  const [activity,setActivity]= useState(null);
  
  useEffect(() => {
    if (!!childrens && childrens.length > 0) {
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
      elements.push({ data:{id:level.levelId, label: level.name, activity: activities?.find((act)=> act?.level==level.levelId)}, position:position, classes: 'outline' });
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
}, [childrens]);

const handleSelect= (value)=>{
  setLevelSelectedId(value?.data?.id)
  setActivity(value?.data?.activity)
  setMenuPosition(value?.positionNode ??{x:null, y:null})
  if (value?.data?.id) { setMenuOpen(true)}
}
const handleClose = () => {
  setMenuOpen(false);
};

//handling add level
const [openAddLevel, setOpenAddLevel]= useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient()

const handleAddLevel=()=>{
  setOpenAddLevel(true)
  handleClose();
}

//Handling delete action
const [deleteLevel, setDeleteLevel] = useState(null);
const {data: responseDelete, isFetching: isFetchingDelete, isError: isErrorDelete} = useDeleteLevel({levelId: deleteLevel, enabled: !!deleteLevel});
useEffect(() => {
  if (responseDelete && !isFetchingDelete){
    setDeleteLevel(null)
    queryClient.resetQueries({ queryKey: ['useDeleteLevel', levelSelectedId], exact: true })   //la reseteo para que me permita borrar otro
    setOpenDelete(false);
    queryClient.resetQueries({ queryKey: ['useGetLevelChildrens', idParentLevel], exact: true }) 

  }
}, [responseDelete, isFetchingDelete]);

const handleDelete=()=>{
  setOpenDelete(true)
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
  console.log("DEBO AGREGAR ACTIVIDAD")
  setOpenAddActivity(true);
  handleClose();
}

//handling edit Activity
const handleEditActivity = ()=>{
  console.log("DEBO Editar ACTIVIDAD", activity)
}

    return (
    <Box>
      <Typography className="nombre">Mapa: {path?.name}</Typography>
      <Typography className="descripcion">{path?.description}</Typography>   
     SELECCIONADO: {levelSelectedId}
            {
            path
             ? <div className="path" style={{background:'darkred'}}>
                    
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
                     :<MenuItem onClick={() => handleEditActivity()}>Editar Actividad</MenuItem>
                     }
                      <MenuItem onClick={() => handleAddLevel()}>Agregar Level</MenuItem>
                      <MenuItem onClick={() => handleDelete()}>Eliminar</MenuItem>
                      <MenuItem onClick={() => handleEdit()}>Editar</MenuItem>
                    </Menu>
                      <AddLevelDialog open={openAddLevel} idParent={levelSelectedId} handleClose={()=> setOpenAddLevel(false)} path={idParentLevel}/>
                      <EditLevelDialog open={openEditLevel} level={childrens?.find((c)=>levelSelectedId==c?.levelId)} handleClose={()=> setOpenEditLevel(false)} path={idParentLevel} />
                      <ConfirmDialog   open={openDelete} onClose={()=>setOpenDelete(false)} onConfirm={()=>setDeleteLevel(levelSelectedId)} title="Eliminar el nivel" message={`Eliminando el nivel ${levelSelectedId}. ¿Está seguro?`} loading={isFetchingDelete}/>
                      <AddActivityDialog open={openAddActivity} idLevel={levelSelectedId} handleClose={()=> setOpenAddActivity(false)} path={idParentLevel}/>
                      {activity &&
                        <ActivityInfo activity={activity} />
                      }
                      
                    
                    </>
                    }
                </div>            
                  :<LinearProgress color={'secondary'}/>
            }
                
    </Box>
    )
  }