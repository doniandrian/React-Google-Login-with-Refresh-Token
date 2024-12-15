import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      className="refreshButton"
      onClick={onClick}
    >
      {t("signInWithRefreshToken")}
    </Button>
  );
};

export default SignInButton;
