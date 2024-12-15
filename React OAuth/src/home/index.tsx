import React, { useEffect, useState } from "react";
import { Box, styled, keyframes } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AvatarSection from "./avatar-section"; // Import AvatarSection
import LogoutButton from "./logout-button";   // Import LogoutButton
import "./homepage-style.css"; // Impor file CSS Module

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
      <BounceImage
        src="../google-logo.svg"
        alt="Google Logo"
        width="70"
        height="70"
      />

      {/* Avatar Section */}
      <AvatarSection
        name={userInfo.name}
        email={userInfo.email}
        picture={userInfo.picture}
        defaultProfilePicture={defaultProfilePicture}
      />

      {/* Logout Button */}
      <LogoutButton onLogout={handleLogout} />
    </Box>
  );
}

// Default props
HomePage.defaultProps = {
  defaultProfilePicture: "/default-avatar.png",
};

export default HomePage;
