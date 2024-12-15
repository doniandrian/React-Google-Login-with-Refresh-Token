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
import { useTranslation } from "react-i18next"; // Import hook i18n

function SignInPage() {
  const { t } = useTranslation(); // hook untuk mengambil string terjemahan
  const navigate = useNavigate();

  const LogindenganRefreshToken = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Token Response (Refresh Token):", tokenResponse);

        // Kirim authorization code ke backend untuk mendapatkan access token
        const response = await axios.post("http://localhost:3000/auth/google", {
          code: tokenResponse.code,
        });

        const { access_token } = response.data; // mendapatkan access token
        console.log("Access Token (Refresh Token):", access_token);

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
        console.log("User Info (Refresh Token):", userInfo);

        // Simpan data pengguna ke sessionStorage
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

        // Redirect ke halaman /homepage
        navigate("/homepage");
      } catch (error) {
        console.error("Error during authentication (Refresh Token):", error);
      }
    },
    onError: (errorResponse) => {
      console.error("Login error (Refresh Token):", errorResponse);
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
          {t("signIn")} {/* Gunakan string dari i18n */}
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
            onClick={() => LogindenganRefreshToken()}
          >
            {t("signInWithRefreshToken")} {/* Gunakan string dari i18n */}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignInPage;
