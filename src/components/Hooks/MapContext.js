import { useReducer, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';


export const MapContext = createContext({});

const initialState = {
    actualMap: null,
    childrens: [],
    answers: [],
    levelSelected: null,
    activityTypeVersion: null,
    activity: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ACTUAL_MAP':
            return { ...state, actualMap: action.payload };
        case 'SET_CHILDRENS':
            return { ...state, childrens: action.payload };
        case 'SET_ANSWERS':
            return { ...state, childrens: action.payload }; 
        case 'SET_LEVEL_SELECTED':
            return { ...state, levelSelected: action.payload };
        case 'SET_ACTIVITY_TYPE_VERSION':
            return { ...state, activityTypeVersion: action.payload, };
        case 'SET_ACTIVITY':
            return { ...state, activity: action.payload };
        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
}

export function MapProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <MapContext.Provider value={contextValue}>
            {children}
        </MapContext.Provider>
    );
}

MapProvider.propTypes = {
    children: PropTypes.node,
};