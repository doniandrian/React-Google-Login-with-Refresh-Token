import { Box, Typography, Button } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

function SignInPage() {
  const navigate = useNavigate();

  const LogindenganRefreshToken = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (tokenResponse) => {
      try {
        console.log(tokenResponse);
        const response = await axios.post('http://localhost:3000/auth/google', {
          code: tokenResponse.code,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    },
    onError: errorResponse => {
      console.error('Login error:', errorResponse);
    },
  });


  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "32px",
          width: "400px",
        }}
        boxShadow={2}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <Box>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log('Token Response:', credentialResponse);
            }}
            onError={() => {
              console.error('Login Failed');
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "16px" }}
            onClick={() => LogindenganRefreshToken()}
          >
            SIGN IN WITH GOOGLE (WITH REFRESH TOKEN)
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignInPage;
