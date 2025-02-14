import {  Card, CardContent, Typography } from '@mui/material';
import { usePostConcern } from '@components/Hooks/requests/Concerns';
import { useEffect, useState } from 'react';
import FormAddConcern from '@components/Forms/FormAddConcern';
import { useQueryClient } from '@tanstack/react-query';

const NewConcern = () => {

    const [concern, setConcern] = useState(null)
    const {data, isFetching, isError, isFetchedAfterMount} = usePostConcern({form: concern, enabled: !!concern});
    
    const queryClient = useQueryClient();

useEffect(() => {
    if (!isFetching && data && isFetchedAfterMount ) {
        queryClient.resetQueries({queryKey:['useGetConcerns']});
    }
}, [data, isFetchedAfterMount, isFetching, queryClient]);

const handleSubmit=(values, { resetForm }) => {
        setConcern(values)
        resetForm();
  
  }
    return (
        <Card  >
            <CardContent >
            <Typography textAlign="left" variant="h5" component="h1" gutterBottom>
                Haz una pregunta:
            </Typography>
            <FormAddConcern onSubmit={handleSubmit} disableForm={isFetching} />
        </CardContent>
        </Card>
    );
};

export default NewConcern;