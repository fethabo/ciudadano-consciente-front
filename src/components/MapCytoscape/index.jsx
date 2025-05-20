import CytoscapeComponent from 'react-cytoscapejs';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


/**
 * OBSERVACION: TENER EN CUENTA DE QUE LOS ESTILOS DE LOS SELECTORES SE DETERMINAN POR ORDEN, SIENDO EL ULTIMO EL DE MAYOR PRIORIDAD
 * @param {*} param0 
 * @returns 
 */
export default function MapCytoscape({ elements, onSelect, loading, enableButtonReferences = false, ...rest }) {
  const [cy, setCy] = useState();
  const containerRef = useRef(null);

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
      console.log("nodo", node)
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
  };

  const style = [
    // Estilo base para nodos con etiqueta
    {
      selector: 'node[label]',
      style: {
        'label': 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
        'color': '#fff',
        'text-outline-color': '#888',
        'text-outline-width': 3,
        'font-size': '12px',
        'text-wrap': 'wrap',
        'text-max-width': '80px',
        'width': '100px',
        'height': '60px',
        'shape': 'roundrectangle',
        'background-color': '#666',
        'border-width': '1px',
        'border-color': '#444'
      },
    },
    // Estilo para nodos con clase outline
    {
      selector: '.outline',
      style: {
        'color': '#fff',
        'text-outline-color': '#888',
        'text-outline-width': 3,
        'background-color': '#666',
      },
    },
    // Estilo para nodos destacados
    {
      selector: '.highlight',
      style: {
        'border-width': 2,
        'border-color': '#333',
      },
    },
    {
      selector: 'node[?hasActivity]',
      style: {
        'background-color': 'rgba(254, 167, 4, 0.92)',
        'cursor': 'pointer',
      },
    },
    {
      selector: 'node[?hasAnswers]',
      style: {
        'background-color': 'indianred',
        'text-outline-color': '#b28500',
      },
    },
    // Estilo para nodos con respuesta correcta
 
    {
      selector: 'node[?hasCorrectAnswer]',
      style: {
        'background-color': '#82b366',
        'text-outline-color': '#6a994e',
        'border-color': 'green',
      },
    },
   
    
    // Estilo para las aristas
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': 'lightgray',
        'target-arrow-color': 'lightgray',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'arrow-scale': 1.5
      }
    },
    // Estilo para las aristas desde nodos con respuesta correcta
    {
      selector: 'edge.correct-edge',
      style: {
        'line-color': '#82b366',
        'target-arrow-color': '#82b366',
      }
    }
  ];
 
  const [showReferences, setShowReferences] = useState(false);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '80vh',
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
        zoom={1} 
        zoomingEnabled
        panningEnabled={true}
        className="cytoscape-map"
        boxSelectionEnabled={false}
        cy={(cyInstance) => setCy(cyInstance)}
        stylesheet={style}
        {...rest}
      />
     {enableButtonReferences && <IconButton
        onClick={() => setShowReferences((prev) => !prev)}
        color="secondary"
        sx={{
          position: 'absolute',
          bottom: 18,
          right: 18,
        //  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 20,
        }}
        size="small"
        aria-label="Mostrar referencias"
        disableRipple
      >
        <HelpOutlineIcon />
      </IconButton>}
      {showReferences && (
        <div style={{
          position: 'absolute',
          bottom: 60,
          right: 10,
          background: 'rgba(5, 4, 4, 0.95)',
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: '12px 18px',
          fontSize: 13,
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
          zIndex: 10,
          maxWidth: 260
        }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Referencias:</div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <span style={{
              display: 'inline-block',
              width: 18,
              height: 18,
              background: '#666',
              borderRadius: 4,
              marginRight: 8,
              border: '1px solid #444'
            }} />
            Nodo
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <span style={{
              display: 'inline-block',
              width: 18,
              height: 18,
              background: 'rgba(254, 167, 4, 0.92)',
              borderRadius: 4,
              marginRight: 8,
              border: '1px solid #b28500'
            }} />
            Actividad
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <span style={{
              display: 'inline-block',
              width: 18,
              height: 18,
              background: 'indianred',
              borderRadius: 4,
              marginRight: 8,
              border: '1px solid #b28500'
            }} />
            Incorrecta
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <span style={{
              display: 'inline-block',
              width: 18,
              height: 18,
              background: '#82b366',
              borderRadius: 4,
              marginRight: 8,
              border: '2px solid green'
            }} />
            Correcta
          </div>
          {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
            <span style={{
              display: 'inline-block',
              width: 24,
              height: 4,
              background: '#82b366',
              borderRadius: 2,
              marginRight: 8
            }} />
            Arista desde nodo correcto
          </div> */}
        </div>
      )}
    </div>
  );
}

MapCytoscape.propTypes = {
  elements: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  loading: PropTypes.bool,
  enableButtonReferences: PropTypes.bool,
};