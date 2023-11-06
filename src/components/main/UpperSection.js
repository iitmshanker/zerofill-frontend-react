import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CustomizedTables from './CustomizedTables';
import PieColor from './PieColor';

const UpperSection = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <CustomizedTables {...props}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <PieColor {...props}/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UpperSection;
