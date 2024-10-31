import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que la próxima renderización muestre la UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de reportes o consola
    console.error("ErrorBoundary capturó un error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza una UI de fallback personalizada
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Oops! Algo salió mal.</h2>
          <p>Me parece que hay que le falta sal.</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
