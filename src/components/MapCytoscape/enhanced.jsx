import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { Backdrop, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// register the dagre layout
cytoscape.use(dagre);

export default function MapCytoscape({ elements, onSelect, loading, enableButtonReferences = false, backgroundUrl, ...rest }) {
  const [cy, setCy] = useState(null);
  const containerRef = useRef(null);

  // once cy is initialized, fit, clamp pan, and bind events
  useEffect(() => {
    if (!cy) return;

    // fit all nodes within view
    cy.fit(null, 50);

    // compute bounds
    const bb = cy.elements().boundingBox();
    const minPan = { x: -bb.x1 * cy.zoom(), y: -bb.y1 * cy.zoom() };
    const maxPan = { x: containerRef.current.clientWidth - bb.x2 * cy.zoom(), y: containerRef.current.clientHeight - bb.y2 * cy.zoom() };

    // clamp pan
    cy.on('pan', () => {
      let { x, y } = cy.pan();
      x = Math.max(Math.min(x, minPan.x), maxPan.x);
      y = Math.max(Math.min(y, minPan.y), maxPan.y);
      cy.pan({ x, y });
    });

    // handle node click
    const handleNodeClick = event => {
      const node = event.target;
      const pos = node.renderedPosition();
      const rect = containerRef.current.getBoundingClientRect();
      onSelect({ data: node.data(), positionNode: { x: rect.left + pos.x, y: rect.top + pos.y } });
    };
    const handleBackgroundClick = event => {
      if (event.target === cy) onSelect(null);
    };
    cy.on('tap', 'node', handleNodeClick);
    cy.on('tap', handleBackgroundClick);

    return () => {
      cy.off('pan');
      cy.off('tap', 'node', handleNodeClick);
      cy.off('tap', handleBackgroundClick);
    };
  }, [cy, onSelect]);

  // enhanced layout to reduce crossings
  const layout = {
    name: 'dagre',
    rankDir: 'LR',      // left-to-right tree
    nodeSep: 150,
    edgeSep: 50,
    rankSep: 100,
    animate: false,
    fit: true         // we'll handle fit manually
  };

  // cartoonish style
  const style = [
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
        'color': '#fff',
        'text-outline-color': '#333',
        'text-outline-width': 4,
        'font-size': '14px',
        'width': '100px',
        'height': '100px',
        'shape': 'roundrectangle',
        'background-color': '#FFEB3B',
        'border-width': '4px',
        'border-color': '#F57F17',
        'background-opacity': 0.85
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#8D6E63',
        'target-arrow-color': '#8D6E63',
        'target-arrow-shape': 'triangle',
        'curve-style': 'unbundled-bezier',
        'arrow-scale': 1.5,
        'opacity': 0.75
      }
    },
    {
      selector: 'node[?hasActivity]',
      style: {
        'background-color': '#4CAF50',
        'background-opacity': 0.9,
        'cursor': 'pointer'
      }
    },
    {
      selector: 'node[?hasCorrectAnswer]',
      style: {
        'background-color': '#2196F3',
        'border-color': '#0D47A1',
        'background-opacity': 0.9
      }
    },
    {
      selector: 'edge.correct-edge',
      style: {
        'line-color': '#2196F3',
        'target-arrow-color': '#0D47A1'
      }
    }
  ];

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', maxHeight: '80vh' }}>
      <Backdrop open={loading} sx={theme => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CytoscapeComponent
        cy={instance => setCy(instance)}
        elements={elements}
        layout={layout}
        stylesheet={style}
        headless={true}
        style={{
          width: '100%',
          height: '100%',
          background: backgroundUrl
            ? `url(${backgroundUrl}) center/cover no-repeat`
            : '#fafafa'
        }}
        minZoom={0.5}
        maxZoom={2}
        pan={{ x: 0, y: 0 }}
        zoomingEnabled
        panningEnabled
        boxSelectionEnabled={false}
        {...rest}
      />
    {/*   {enableButtonReferences && (
        <IconButton
          onClick={() => setShowReferences(prev => !prev)}
          color="secondary"
          sx={{ position: 'absolute', bottom: 18, right: 18, zIndex: 20 }}
          size="small"
          disableRipple
        >
          <HelpOutlineIcon />
        </IconButton>
      )} */}
      {/* ... reference legend omitted for brevity ... */}
    </div>
  );
}

MapCytoscape.propTypes = {
  elements: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  loading: PropTypes.bool,
  enableButtonReferences: PropTypes.bool,
  backgroundUrl: PropTypes.string
};
