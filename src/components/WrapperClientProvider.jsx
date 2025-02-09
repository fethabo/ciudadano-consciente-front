import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import PropTypes from "prop-types"


/**
 * @todo: agregar mensaje en metadatos de query
 * @param {*} param0 
 * @returns 
 */
export default function WrapperClientProvider({children}){
  
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
      queryCache: new QueryCache({
        onError: (error) => {
          console.log(error)
          enqueueSnackbar(`Error: ${error?.response?.data?.detail || error}`, {variant:"error"})
        }
      }),}
    )
    return(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )}
  WrapperClientProvider.propTypes={
    children: PropTypes.element
  }