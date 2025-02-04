import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, CircularProgress, Skeleton, Tooltip } from '@mui/material';
import ImageControlList from './ImageList';

export default function ImageControl({ useUploadImage, useFetchImages, paramsGet, paramsUpload, uploadeable= true }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const { data: uploaded, isFetching: isUploading, isError: isErrorUpload } = useUploadImage({...paramsUpload, file: selectedFile, enabled: !!paramsUpload && !!selectedFile});
    const { data: images, isFetching: isFetchingImages, isError: isErrorFetch } = useFetchImages({...paramsGet, enabled: !!paramsGet });

    const ref= useRef(null);
    
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
            if(!isUploading){
                if(uploaded){
                    setSelectedFile(null)
                    console.log("limpia el campo")
                }else{
                    if(isErrorUpload){
                        console.log("error al subir, debo limpiar el POST?")
                        setSelectedFile(null)
                    }
                }
                
            }

    }, [uploaded, isUploading, isErrorUpload]);

  

    return (
        <div>
            {uploadeable &&
                <>
                    <input ref={ref} hidden type="file"  onChange={handleFileChange} />
                    <Tooltip title="Add image" arrow >
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={()=>ref?.current?.click()} 
                            disabled={isUploading || !selectedFile}
                        >
                            {isUploading ? <CircularProgress size={24} /> : '+'}
                        </Button>
                    </Tooltip>
                </>
            }
            {isFetchingImages ? (
                <div>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width={210} height={118} style={{ margin: '10px' }} />
                    ))}
                </div>
            ) : isErrorFetch
                ? <Alert severity='error' >Hubo un error al obtener las imagenes</Alert>
                : 
                (
                    <ImageControlList images={images} />
                )}
        </div>
    );
}

ImageControl.propTypes = {
    useUploadImage: PropTypes.func,
    useFetchImages: PropTypes.func.isRequired,
    paramsGet: PropTypes.object,
    paramsUpload: PropTypes.object,
    uploadeable: PropTypes.bool
};