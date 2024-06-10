import { useContext, useCallback } from 'react';
import { MapContext } from './MapContext';

// Hook personalizado para obtener los procesos por módulo
export default function useMap() {

    const { state, dispatch } = useContext(MapContext);

    const setActualMap = useCallback((map) => (
        dispatch({ type: 'SET_ACTUAL_MAP', payload: map }) //Guardo el objeto del level map (no el id, eso lo tengo en la URL)
    ), [dispatch]);

    const setChildrens = useCallback((childrens) => (
        dispatch({ type: 'SET_CHILDRENS', payload: childrens })
    ), [dispatch]);

    const setAnswers = useCallback((answers) => (
        dispatch({ type: 'SET_CHILDRENS', payload: answers })
    ), [dispatch]);

    const setLevelSelected = useCallback((level) => (
        dispatch({ type: 'SET_LEVEL', payload: level })
    ), [dispatch]);

    const setActivityTypeVersion = useCallback((activityTypeVersion) => (
        dispatch({ type: 'SET_INSTANCIAR_PROCESO', payload: activityTypeVersion })
    ), [dispatch]);

    const setActivity = useCallback((activity) => (
        dispatch({ type: 'SET_ACTIVITY', payload: activity })
    ), [dispatch]);

   

    return {
        ...state,
        setActualMap,
        setChildrens,
        setLevelSelected,
        setActivityTypeVersion,
        setActivity,
        setAnswers
    };

}
