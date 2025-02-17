import { Stack } from '@mui/material';
import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import PublicContents from './PublicContents';
import UserContents from './UserContents';


/**
 * 
 * PAGINA DE CONTENIDOS: 
 * - Permite al usuario Agregar Contenidos
 * - Ver otros contenidos y votarlos
 * - Jugar contenidos de forma aleatoria (o por categoría).
 * @todo: agregar filtrado
*/
function ContentsPage(){
 
   const [tabIndex, setTabIndex] = useState(0);

   const handleTabChange = (event, newValue) => {
     setTabIndex(newValue);
   };
  return (
    <Stack>

      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Aportes de la comunidad" />
        <Tab label="Tus contenidos" />
      </Tabs>

      {tabIndex === 0 && <PublicContents />}
      {tabIndex === 1 && <UserContents />}
    </Stack>
  );
}

export default ContentsPage;