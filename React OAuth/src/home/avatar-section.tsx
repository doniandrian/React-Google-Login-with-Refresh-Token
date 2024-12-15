import React from "react";
import { Avatar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// Define props type
interface AvatarSectionProps {
  name: string;
  email: string;
  picture?: string;
  defaultProfilePicture?: string;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
  name,
  email,
  picture,
  defaultProfilePicture = "/default-avatar.png",
}) => {
  const { t } = useTranslation(); // Untuk teks multibahasa

  return (
    <>
      {/* Foto Profil */}
      <Avatar
        alt={name}
        src={picture || defaultProfilePicture}
        sx={{ width: 100, height: 100, marginBottom: "16px" }}
      />

      {/* Nama User */}
      <Typography variant="h5" color="white" gutterBottom>
        {t("welcome")}, {name}!
      </Typography>

      {/* Email User */}
      <Typography variant="body1" color="white" gutterBottom>
        {t("email")}: {email}
      </Typography>
    </>
  );
};

export default AvatarSection;
