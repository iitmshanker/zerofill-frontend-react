import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function ImagesModal(props) {
  const { isModalOpen, closeModal, session_id } = props;
  const [imageData, setImageData] = useState([]);
  const [isImagesLoading, setIsImagesLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchImageData(session_id) {
    const url = `https://zerofill-webapp02.azurewebsites.net/api/images/?limit=1000000000&session_id=${session_id}`;
    const token = '97906891eae54f1478f808e6e313cabaae773fc8';
    setIsImagesLoading(true);
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
      })
      .then(data => {
        setImageData(data?.results);
        setIsImagesLoading(false);
      })
      .catch(error => {
        setIsImagesLoading(false);
        setError(error);
        console.error(error);
      });
  }

  useEffect(() => {
    fetchImageData(session_id);
  }, [session_id]);

  return (
    <Modal
      open={isModalOpen}
      onClose={() => closeModal()}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '70%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
        }}
      >
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Machine Images
          </Typography>
        </div>
        <div style={{ maxHeight: '80%', overflowY: 'scroll' }}>
          {isImagesLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </div>
          ) : error ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
              <p>Something bad happened. Please reload the page.</p>
            </div>
          ) : (
            <Grid container spacing={2}>
              {imageData.map((image, index) => (
                <Grid item xs={3} key={index} style={{justifyContent:'center',alignItems:'center',display:'flex',border: '2px solid #ddd'}}>
                  <img src={image['Image Url']} alt={`Image ${index}`} style={{ width: '55%', border: '3px solid #000'  }} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', position: 'absolute', bottom: 50, right: '50%' }}>
          <Button variant="contained" color="primary" onClick={() => closeModal()}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
