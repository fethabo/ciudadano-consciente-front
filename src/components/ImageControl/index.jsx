import { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, CircularProgress, Skeleton } from '@mui/material';
import ImageControlList from './ImageList';

export default function ImageControl({ useUploadImage, useFetchImages, paramsGet, paramsUpload, uploadeable= true }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const { uploadImage, isUploading } = useUploadImage({...paramsUpload, file: selectedFile, enabled: !!paramsUpload && !!selectedFile});
    const { data: images, isFetching: isFetchingImages, isError: isErrorFetch } = useFetchImages({...paramsGet, enabled: !!paramsGet });

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            await uploadImage(selectedFile);
            setSelectedFile(null);

        }
    };

    return (
        <div>
            {uploadeable &&
                <>
                    <input type="file" onChange={handleFileChange} />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleUpload} 
                        disabled={isUploading || !selectedFile}
                    >
                        {isUploading ? <CircularProgress size={24} /> : 'Upload'}
                    </Button>
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