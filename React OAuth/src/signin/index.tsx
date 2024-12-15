import { Box, Typography} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./signin-styles.css"; // Impor style yang dipisahkan
import SignInButton from "./signin-button";
import GoogleLoginButton from "./login-button";
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

  // Login menggunakan Refresh Token (flow auth-code)
  const LogindenganRefreshToken = useGoogleLogin({
    flow: "auth-code", // Menggunakan Authorization Code flow
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Token Response (Refresh Token):", tokenResponse);

        // Kirim authorization code ke backend untuk mendapatkan access token
        const response = await axios.post("http://localhost:3000/auth/google", {
          code: tokenResponse.code, // Authorization code dari Google
        });

        const { access_token } = response.data; // mendapatkan access token

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

      // Redirect ke halaman utama setelah login
      navigate("/homepage");
    } catch (error) {
      console.error("Error during Google Login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Box className="container">
      <Box className="card">
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <Box>
          <GoogleLoginButton
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.error("Login Failed");
              alert("Google login failed. Please try again.");
            }}
          />
          <SignInButton onClick={() => LogindenganRefreshToken()} />
        </Box>
      </Box>
    </Box>
  );
}

export default SignInPage;
