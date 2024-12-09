import { Box, Typography, Avatar, Button, styled, keyframes } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Animasi bounce untuk logo
const Bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Styled component untuk logo
const BounceImage = styled("img")`
  animation: ${Bounce} 1s ease-in-out infinite;
`;

function HomePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Ambil data pengguna dari sessionStorage
    const storedUserInfo = sessionStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // Redirect ke halaman login jika tidak ada data pengguna
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Hapus data pengguna dari sessionStorage
    sessionStorage.clear();
    // Redirect ke halaman login
    navigate("/");
  };

  if (!userInfo) {
    return null; // Bisa tambahkan spinner loading di sini
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#87CEEB",
      }}
    >
      {/* Logo Google */}
      <BounceImage
        src="../google-logo.svg"
        alt="Google Logo"
        width="70"
        height="70"
      />

      {/* Foto Profil */}
      <Avatar
        alt={userInfo.name}
        src={userInfo.picture}
        sx={{ width: 100, height: 100, marginBottom: "16px" }}
      />

      {/* Nama User */}
      <Typography variant="h5" color="white" gutterBottom>
        Welcome, {userInfo.name}!
      </Typography>

      {/* Email User */}
      <Typography variant="body1" color="white" gutterBottom>
        Email: {userInfo.email}
      </Typography>

      {/* Tombol Logout */}
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
}

export default HomePage;
