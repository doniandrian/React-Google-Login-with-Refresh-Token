import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

// Define props type
interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const { t } = useTranslation(); // Untuk teks multibahasa

  return (
    <Button variant="contained" color="error" onClick={onLogout}>
      {t("logout")}
    </Button>
  );
};

export default LogoutButton;
