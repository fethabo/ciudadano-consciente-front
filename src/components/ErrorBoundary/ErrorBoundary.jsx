import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import errorHistery from '@animations/ErrorHistery.lottie';
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) { //eslint-disable-line
    // Actualiza el estado para que la próxima renderización muestre la UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary capturó un error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza una UI de fallback personalizada
      return (
        <div style={{ padding: '20px', textAlign: 'center', gap:'1em' }}>
          <h2>¡Oops! Algo salió mal.</h2>
          <p>Me parece que hay que le falta sal.</p>
          <DotLottieReact
              src={errorHistery}
              loop
              autoplay
              />
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;

ErrorBoundary.propTypes={
  children: PropTypes.any
}
