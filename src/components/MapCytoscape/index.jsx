import { useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';


export default function MapCytoscape({elements, ...rest}) {

    //const layout = { name: 'random' };
    const [cy, setCy] = useState();  
    console.log("selected",cy);
  
    var timeout;
    cy?.on('select', 'node', function(event){
      clearTimeout( timeout );
      timeout = setTimeout(function(){
        window["selectedNodes"] = cy.$('node:selected');
   
        // and so on...
      }, 100); // may have to adjust this val
   
    });
    return ( 
            <CytoscapeComponent 
            elements={elements} 
            style={ {display: 'flex', background:'white', width:'600px', height:'300px' } } 
            minZoom={0.5}
            maxZoom={2}
            zoomingEnabled
            panningEnabled={false}
            className="cytoscape-map" 
            cy={(cy) => { setCy(cy) }} 
      //      layout={layout}
            /* stylesheet={[
                {
                  selector: 'node',
                  style: {
                    width: 20,
                    height: 20,
                    shape: 'rectangle'
                  }
                },
                {
                  selector: 'edge',
                  style: {
                    width: 15
                  }
                }
              ]} */ 
              {...rest}/>
     );
}
