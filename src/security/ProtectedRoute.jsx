import { Navigate, Route } from 'react-router-dom';
import useObtenerToken from './hooks/useObtenerToken';
import PropTypes from 'prop-types'


export default function ProtectedRoute({ component: Component,  ...rest }) {
  const token = useObtenerToken();

   return (
      <Route
        {...rest}
        element={(props) => {
            return token
                ? <Component {...props} />
                : <Navigate to="/login" replace={true} />
        }}
      />
    )
}
ProtectedRoute.propTypes={
    component: PropTypes.node
}
