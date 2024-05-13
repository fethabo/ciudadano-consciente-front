import CytoscapeComponent from 'react-cytoscapejs';


export default function MapCytoscape({elements, ...rest}) {

    const layout = { name: 'random' };
    return ( 
            <CytoscapeComponent 
            elements={elements} 
            style={ {display: 'flex', background:'white', width:'600px', height:'600px' } } 
            layout={layout}
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
