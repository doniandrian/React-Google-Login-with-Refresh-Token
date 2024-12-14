import { Box, Typography, Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomepageStyle.css"; // Impor file CSS Module

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
    <Box>
      {/* Logo Google */}
      <img
        src="../google-logo.svg"
        alt="Google Logo"
        width="70"
        height="70"
      />

      {/* Foto Profil */}
      <Avatar
        alt={userInfo.name}
        src={userInfo.picture}
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
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
}

export default HomePage;
