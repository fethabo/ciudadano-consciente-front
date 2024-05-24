import { useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';


export default function MapCytoscape({elements, ...rest}) {

    //const layout = { name: 'random' };
    const [cy, setCy] = useState();  
    const [selectedNode, setSelectedNode] = useState(null)
    console.log("selectedNode",selectedNode);

    cy?.on('tap','node',(evt) => {
      var node = evt.target;
      console.log("evt", evt, node.id())
      setSelectedNode(node.id());        
    })
    cy?.on('unselect', function(evt){
      setSelectedNode(null)
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
