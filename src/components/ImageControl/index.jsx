import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, CircularProgress, Skeleton, Tooltip, Typography } from '@mui/material';
import ImageControlList from './ImageList';
import { useDeleteContentImage, useGetContentImages, useGetImagesFilesOfContent, usePostContentImage } from '@components/Hooks/requests/Content';
import { useQueryClient } from '@tanstack/react-query';
import TagsControl from '@components/TagsControl';
import { useGetTagged } from '@components/Hooks/requests/Tags';

export default function ImageControl({ contentId, uploadeable }) {
    const ref= useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formPost, setFormPost] = useState(null);
    const [deleteImage, setDeleteImage] = useState(null);
   
    const queryClient = useQueryClient()
   
    const { data: uploaded, isFetching: isUploading, isError: isErrorUpload } = usePostContentImage({contentId:contentId, form: formPost, enabled: !!contentId && !!formPost});
    const { data: images, isFetching: isFetchingImages, isError: isErrorFetch } = useGetContentImages({contentId:contentId, enabled: !!contentId });
    const { data: imagesFiles, isPending } = useGetImagesFilesOfContent({images: images || [], enabled: !!images && images?.length>0});
    const { data: deleted, isFetching: isDeleting, isError: isErrorDelete } = useDeleteContentImage({contentId: deleteImage?.contentId, imageId: deleteImage?.imageId, enabled: !!deleteImage});

    useEffect(() => {
        if(deleted || isErrorDelete){
            setDeleteImage(null)
            queryClient.resetQueries({ queryKey: ['useGetContentImages', contentId], exact: true })
        }
    }, [deleted, isErrorDelete, contentId, queryClient]);

    useEffect(() => {
        if(!isUploading){
            setFormPost(null)
            setSelectedFile(null)
            queryClient.resetQueries({ queryKey: ['useGetContentImages', contentId], exact: true })
        }
    }, [uploaded, isUploading, isErrorUpload, contentId, queryClient]);

    const handleFileChange = (event) => {
        const f = Array.from(event?.target?.files);
        const form= {content: contentId, image: f[0], imageName: event.target.files[0].name}
        setFormPost(form)
    };

    return (
        <div>
            <Typography variant="h6" >Images</Typography>
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
            {isFetchingImages || isPending || isDeleting ? (
                <div>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width={210} height={118} style={{ margin: '10px' }} />
                    ))}
                </div>
            ) : isErrorFetch
                ? <Alert severity='error' >Hubo un error al obtener las imagenes</Alert>
                : 
                (
                    <ImageControlList images={imagesFiles} handleDeleteImage={setDeleteImage} deletable={true}/>
                )}
        </div>
    );
}

ImageControl.propTypes = {
    contentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    uploadeable: PropTypes.bool
};