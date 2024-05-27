import { useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import PropTypes from 'prop-types'

export default function MapCytoscape({elements, onSelect, ...rest}) {

    //const layout = { name: 'random' };
    const [cy, setCy] = useState();  
    //https://js.cytoscape.org/#cy.on
    cy?.on('tap', function(event){
      var evtTarget = event.target;
    
      if( evtTarget === cy ){
        onSelect(null)
      } else {
        if( evtTarget?.id()){
          onSelect(evtTarget.id());   
        }
     //   console.log('tap on some element');
      }
    });

    const style =[
      {
        "selector": "node[label]",
        "style": {
          "label": "data(label)"
        }
      },
      {
        "selector": ".outline",
        "style": {
          "color": "#fff",
          "text-outline-color": "#888",
          "text-outline-width": 3
        }
      }
    ]

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
            stylesheet={style}

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

MapCytoscape.propTypes={
  elements: PropTypes.array.isRequired,
  onSelect: PropTypes.func
}
