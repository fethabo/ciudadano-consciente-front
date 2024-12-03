import CytoscapeComponent from 'react-cytoscapejs';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
  //https://js.cytoscape.org/#cy.on
export default function MapCytoscape({ elements, onSelect,loading, ...rest }) {
  const [cy, setCy] = useState();
  const containerRef = useRef(null);

/*   // Maneja el evento de clic en el nodo
  cy?.on('tap', 'node', function (event) {
    const node = event.target;
    const position = node.renderedPosition();
    // Obtén la posición del contenedor en la pantalla
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calcula la posición absoluta del nodo en la pantalla
    const absoluteX = containerRect.left + position.x;
    const absoluteY = containerRect.top + position.y;

   
    onSelect({data: node.data(), positionNode: {x:absoluteX, y: absoluteY}});
  });

  // Oculta el menú cuando se hace clic en el fondo del gráfico
  cy?.on('tap', function (event) {
    if (event.target === cy) {
      onSelect(null);
    }
  }); */
  useEffect(() => {
    if (!cy) return; // Salir si cy no está inicializado aún
    // Función para manejar el clic en el nodo
    const handleNodeClick = (event) => {
      const node = event.target;
      const position = node.renderedPosition();
      // Obtenemos la posición del contenedor en la pantalla
      const containerRect = containerRef.current.getBoundingClientRect();
      // Calculamos la posición absoluta del nodo en la pantalla
      const absoluteX = containerRect.left + position.x;
      const absoluteY = containerRect.top + position.y;
      onSelect({ data: node.data(), positionNode: { x: absoluteX, y: absoluteY } });
    };
    // Deseleccionamos cuando hacemos click fuera
    const handleBackgroundClick = (event) => {
      if (event.target === cy) {
        onSelect(null);
      }
    };
    

    cy.on('tap', 'node', handleNodeClick);
    cy.on('tap', handleBackgroundClick);

    // Limpieza de los eventos al desmontar el componente o al cambiar cy
    return () => {
      cy.off('tap', 'node', handleNodeClick);
      cy.off('tap', handleBackgroundClick);
    };
  }, [cy, onSelect]);

  const layout = {
    name: 'breadthfirst',
    directed: true, // Asegura que el árbol respete direcciones (padre-hijo)
    spacingFactor: 1.5, // Ajusta la separación entre nodos
    avoidOverlap: true, // Evita que los nodos se superpongan
    animate: true, // Anima el reordenamiento
    fit: true, // Ajusta el gráfico al contenedor
  };/* 
  useEffect(() => {
    if (cy) {
      cy.layout(layout).run(); // Ejecuta el layout en los elementos actuales
    }
  }, [cy, elements]); // Recalcula cuando cambien los nodos o el grafo
  
 */
  const style = [
    {
      selector: 'node[label]',
      style: {
        label: 'data(label)',
     //   color: '#000',
        'text-outline-color': '#888',
        'text-outline-width': 3,
        //"cursor": "pointer",
      },
    },
    {
      selector: '.outline',
      style: {
        color: '#fff',
       // "cursor": "pointer",
       // 'background-color': '#666',
        'text-outline-color': '#888',
        'text-outline-width': 3,
      },
    },
    {
      selector: '.highlight',
      style: {
      //  'background-color': '#ff0',
        'border-width': 2,
     //   "cursor": "pointer",
        'border-color': '#333',
      },
    },
  ];
 
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '80vh', // Opcional, para limitar el alto en pantallas grandes
    //  overflow: 'hidden', // Oculta cualquier desbordamiento
    }} ref={containerRef}>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
  <CircularProgress color="inherit" />
</Backdrop>
      <CytoscapeComponent
      layout={layout}
        elements={elements}
        style={{ display: 'flex', background: 'white', width:"100%",minWidth: '300px',height:'100%', minHeight: '300px' }}
        minZoom={0.5}
        maxZoom={2}
        zoomingEnabled
        panningEnabled={false}
        className="cytoscape-map"
        boxSelectionEnabled={false}
        cy={(cyInstance) => setCy(cyInstance)}
        stylesheet={style}
        {...rest}
      />
    </div>
  );
}

MapCytoscape.propTypes = {
  elements: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  loading: PropTypes.bool
};