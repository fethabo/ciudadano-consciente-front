import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import PropTypes from "prop-types"

export default function WrapperClientProvider({children}){
  
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          console.log("atrapo el error en el QueryClient")
          enqueueSnackbar(`Error: ${error}`, {variant:"error"})
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