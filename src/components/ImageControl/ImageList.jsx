import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types'
import  DeleteOutlineIcon  from '@mui/icons-material/DeleteOutline';


export default function ImageControlList({images, handleDeleteImage, deletable}) {
  /*Tomado del ejemplo de MUI*/

  return (
    <ImageList
      sx={{
        width: 500,
        height: 450,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
      }}
      rowHeight={200}
      gap={1}
    >
      {images.map((item, index) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;
        return (
          <ImageListItem key={index} cols={cols} rows={rows}>
            <img
              src={item.data}
              alt={item?.image?.imageName}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.image.imageName}
              position="top"
              actionIcon={deletable &&
                <IconButton
                  onClick={() => handleDeleteImage(item.image)}
                  sx={{ color: 'white' }}
                  aria-label={`delete ${item.image.imageName}`}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              }
              actionPosition="right"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

ImageControlList.propTypes = {
    images: PropTypes.array,
    handleDeleteImage: PropTypes.func,
    deletable: PropTypes.bool
}