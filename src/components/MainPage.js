import { Container, Paper, Typography, Box } from '@mui/material';

function MainPage(){
    return(
      <Container>
        <Typography
          variant='h1'
          sx={{my: 4, textAlign: "center", color: "primary.main"}}
        >
          Budget App
        </Typography>
        <Box sx={{display: "flex", flexDirection: {xs: "column", sm:"column"}, m:3}}>
          <Paper elevation={3}>
            Hello world!
          </Paper>
          
        </Box>
        
        
      </Container>
    );
  }

  export default MainPage;