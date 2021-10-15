import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YouTube from './youtube.js';
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#FFE159',
      contrastText: '#fff',
    },
  },
});

function refreshPage() {
  window.location.reload(false);
}

var selected = false

var twoVideoData = [
  {
    video: "video1",
    views: 19191919,
    higher: false,
    selected: false
  },
  
  {
    video: "video2",
    views: 0,
    higher: false,
    selected: false
  },

  {
    Win: false
  }
]


ReactDOM.render(
  <div>
    <YouTube/>
      <ThemeProvider theme={theme}>
      <Button style={{margin: '0 auto', display: "flex"}} 
      onClick = {refreshPage}
      color="neutral" variant="contained" sx={ { borderRadius: 28 } }>
        Randomize
      </Button>
      </ThemeProvider>


  </div>,
  document.querySelector("#root")
);
