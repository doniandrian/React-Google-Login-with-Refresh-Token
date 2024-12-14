// src/signin/index.tsx

import { Box, Typography, Button } from "@mui/material"; // Komponen UI dari MUI
import axios from "axios"; // Library untuk HTTP request
import { useNavigate } from "react-router-dom"; // Hook untuk navigasi antar halaman
import { jwtDecode } from "jwt-decode"; // Library untuk decode JWT
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"; // Komponen dan hook untuk Google OAuth
import styles from "./SignInStyles.css"; // Impor style yang dipisahkan

function SignInPage() {
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain

  // Login menggunakan Refresh Token (flow auth-code)
  const LogindenganRefreshToken = useGoogleLogin({
    flow: "auth-code", // Menggunakan Authorization Code flow
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Token Response (Refresh Token):", tokenResponse);

        // Kirim authorization code ke backend untuk mendapatkan access_token
        const response = await axios.post("http://localhost:3000/auth/google", {
          code: tokenResponse.code, // Authorization code dari Google
        });

        const { access_token } = response.data; // Dapatkan access_token dari response backend
        console.log("Access Token (Refresh Token):", access_token);

        // Ambil data user dari Google UserInfo endpoint
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${access_token}`, // Gunakan access_token untuk autentikasi
            },
          }
        );

        const userInfo = userInfoResponse.data; // Data user
        console.log("User Info (Refresh Token):", userInfo);

        // Simpan data pengguna ke sessionStorage untuk keperluan aplikasi
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

        // Redirect ke halaman utama setelah login
        navigate("/homepage");
      } catch (error) {
        console.error("Error during authentication (Refresh Token):", error);
      }
    },
    onError: (errorResponse) => {
      console.error("Login error (Refresh Token):", errorResponse);
    },
  });

  // Login menggunakan credential Google (JWT)
  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
      console.log("Token Response (Google Login):", credentialResponse);

      // Decode JWT credential untuk mendapatkan informasi pengguna
      const userInfo = jwtDecode(credentialResponse.credential);
      console.log("User Info (Google Login):", userInfo);

      // Simpan data pengguna ke sessionStorage untuk keperluan aplikasi
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

      // Redirect ke halaman utama setelah login
      navigate("/homepage");
    } catch (error) {
      console.error("Error decoding credential (Google Login):", error);
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.card}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <Box>
          {/* Login menggunakan Google JWT */}
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess} // Callback ketika login sukses
            onError={() => {
              console.error("Login Failed");
            }} // Callback ketika login gagal
          />

          {/* Login menggunakan Refresh Token */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={styles.refreshButton}
            onClick={() => LogindenganRefreshToken()} // Trigger login dengan refresh token
          >
            SIGN IN WITH GOOGLE (WITH REFRESH TOKEN)
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignInPage;
