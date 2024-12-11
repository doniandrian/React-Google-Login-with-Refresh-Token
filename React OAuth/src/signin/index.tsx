import { Box, Typography, Button } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

function SignInPage() {
  const navigate = useNavigate();

  const LogindenganRefreshToken = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Token Response:", tokenResponse);

        // Kirim authorization code ke backend untuk mendapatkan access_token
        const response = await axios.post("http://localhost:3000/auth/google", {
          code: tokenResponse.code,
        });

        const { access_token } = response.data; // Dapatkan access_token
        console.log("Access Token:", access_token);

        // Ambil data user dari Google UserInfo endpoint
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const userInfo = userInfoResponse.data; // Informasi user
        console.log("User Info:", userInfo);

        // Simpan data pengguna ke sessionStorage
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

        // Redirect ke halaman /homepage
        navigate("/homepage");
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    },
    onError: (errorResponse) => {
      console.error("Login error:", errorResponse);
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