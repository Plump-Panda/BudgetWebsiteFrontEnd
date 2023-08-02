function StartPage(){
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
            <Typography variant='h3' sx={{textAlign: "center", m: 3}}>Login</Typography>
            <LoadingButton loading={loading} variant="outlined" sx={{position: "relative", justifyContent: "center", m: 3}} onClick={() => {setLoading(true);open();}} disabled={!ready}>
              <span>Connect a bank account</span>
            </LoadingButton>
          </Paper>
          
        </Box>
        
        
      </Container>
    );
  }