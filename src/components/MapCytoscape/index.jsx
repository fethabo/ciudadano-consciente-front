import CytoscapeComponent from 'react-cytoscapejs';


export default function MapCytoscape({elements, ...rest}) {


    return ( 
            <CytoscapeComponent elements={elements} style={ {background:'white', width:'600px', height:'600px' } }  {...rest}/>
     );
}
