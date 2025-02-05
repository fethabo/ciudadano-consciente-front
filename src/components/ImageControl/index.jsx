import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, CircularProgress, Skeleton, Tooltip } from '@mui/material';
import ImageControlList from './ImageList';
import { useGetImagesFilesOfContent } from '@components/Hooks/requests/Content';

export default function ImageControl({ useUploadImage, useFetchImages, paramsGet, paramsUpload, uploadeable= true }) {
    console.log(paramsGet,paramsUpload  )
    const [selectedFile, setSelectedFile] = useState(null);
    const [formPost, setFormPost] = useState(null);
    const { data: uploaded, isFetching: isUploading, isError: isErrorUpload } = useUploadImage({...paramsUpload, form: formPost, enabled: !!paramsUpload && !!formPost});
    const { data: images, isFetching: isFetchingImages, isError: isErrorFetch } = useFetchImages({...paramsGet, enabled: !!paramsGet });
    const ref= useRef(null);
    const { data: imagesFiles, isPending } = useGetImagesFilesOfContent({images: images || [], enabled: !!images && images?.length>0});
  
    const handleFileChange = (event) => {
        const f = Array.from(event?.target?.files);
        const form= {content: paramsUpload.contentId, image: f[0], imageName: event.target.files[0].name}
        console.log(f[0])
        setFormPost(form)
        //setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        if(!isUploading){
            setFormPost(null)
        }
    }, [uploaded, isUploading, isErrorUpload]);

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
                            disabled={isUploading || selectedFile}
                        >
                            {isUploading ? <CircularProgress size={24} /> : '+'}
                        </Button>
                    </Tooltip>
                </>
            }
            {isFetchingImages || isPending ? (
                <div>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width={210} height={118} style={{ margin: '10px' }} />
                    ))}
                </div>
            ) : isErrorFetch
                ? <Alert severity='error' >Hubo un error al obtener las imagenes</Alert>
                : 
                (
                    <ImageControlList images={imagesFiles} />
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