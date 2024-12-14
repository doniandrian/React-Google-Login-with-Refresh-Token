import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  GoogleLogin,
  useGoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
// Define type data
interface UserInfo {
  name: string;
  email: string;
  picture?: string;
  sub?: string;
}

interface GoogleTokenResponse {
  code: string;
}

function SignInPage() {
  const navigate = useNavigate();

  const handleRefreshTokenLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse: GoogleTokenResponse) => {
      try {
        console.log("Token Response (Refresh Token):", tokenResponse);

        // Kirim authorization code ke backend untuk mendapatkan accessToken
        const response = await axios.post<{ accessToken: string }>(
          "http://localhost:3000/auth/google",
          { code: tokenResponse.code },
        );

        const { accessToken } = response.data;
        console.log("Access Token (Refresh Token):", accessToken);

        // Ambil data user dari Google UserInfo endpoint
        const userInfoResponse = await axios.get<UserInfo>(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const userInfo = userInfoResponse.data;
        console.log("User Info (Refresh Token):", userInfo);

        // Simpan data pengguna ke sessionStorage
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

        // Redirect ke halaman /homepage
        navigate("/homepage");
      } catch (error) {
        // More detailed error handling
        if (axios.isAxiosError(error)) {
          console.error(
            "Authentication Error:",
            error.response?.data || error.message,
          );
        } else {
          console.error("Unexpected error during authentication:", error);
        }

        alert("Login failed. Please try again.");
      }
    },
    onError: (errorResponse) => {
      console.error("Login error (Refresh Token):", errorResponse);
      alert("Google login failed. Please try again.");
    },
  });

  const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    try {
      console.log("Token Response (Google Login):", credentialResponse);

      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }

      // Decode credential untuk mendapatkan informasi pengguna
      const userInfo = jwtDecode<UserInfo>(credentialResponse.credential);
      console.log("User Info (Google Login):", userInfo);

      // Validasi data pengguna
      if (!userInfo.email) {
        throw new Error("Invalid user information");
      }

      // Simpan data pengguna ke sessionStorage
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

      // Redirect ke halaman /homepage
      navigate("/homepage");
    } catch (error) {
      console.error("Error during Google Login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5", // Tambahkan background color
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "32px",
          width: "400px",
          textAlign: "center", // Tambahkan text alignment
          boxShadow: 3, // Gunakan predefined boxShadow
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            marginBottom: "24px",
            color: "#333", // Tambahkan warna yang lebih kontras
            fontWeight: "bold",
          }}
        >
          Sign In
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Login biasa */}
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.error("Login Failed");
              alert("Google login failed. Please try again.");
            }}
          />

          {/* Login dengan refresh token */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleRefreshTokenLogin()}
          >
            Sign In with Google (Refresh Token)
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignInPage;
