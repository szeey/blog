import Box from '@mui/material/Box';

import mainImage from './assets/main.jpg';



export default function MainPage() {

  return (

    <Box

      sx={{

        position: 'fixed',

        top: 0,

        left: 0,

        height: '100vh',

        width: '100vw',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        minHeight: 'calc(100vh - 120px)',

        p: 3,

      }}

    >

      <Box

        component="img"

        src={mainImage}

        alt="Main image"

        sx={{

          width: '100%',

          maxWidth: { xs: '300px', md: '500px' },

          height: 'auto',

          aspectRatio: '1 / 1',

          objectFit: 'cover',

          borderRadius: '24px',

          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',

        }}

      />

    </Box>

  );

};