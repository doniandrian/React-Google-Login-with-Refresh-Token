
import {
  Box,
  Typography,
  Avatar,
  Button,
  styled,
  keyframes,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import hook i18n
import "./HomepageStyle.css"; // Impor file CSS Module

// Define an interface for UserInfo
interface UserInfo {
  name: string;
  email: string;
  picture?: string;
}


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



// Define props interface for HomePage
interface HomePageProps {
  defaultProfilePicture?: string;
}

function HomePage({
  defaultProfilePicture = "/default-avatar.png",
}: HomePageProps) {
  const { t } = useTranslation(); // Gunakan hook i18n
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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

        src={userInfo.picture || defaultProfilePicture}
        sx={{ width: 100, height: 100, marginBottom: "16px" }}

      />

      {/* Nama User */}
      <Typography variant="h5" color="white" gutterBottom>
        {t("welcome")}, {userInfo.name}!
      </Typography>

      {/* Email User */}
      <Typography variant="body1" color="white" gutterBottom>
        {t("email")}: {userInfo.email}
      </Typography>

      {/* Tombol Logout */}
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
      >
        {t("logout")} {/* Gunakan string dari i18n */}
      </Button>
    </Box>
  );
}

// Default props
HomePage.defaultProps = {
  defaultProfilePicture: "/default-avatar.png",
};

export default HomePage;
