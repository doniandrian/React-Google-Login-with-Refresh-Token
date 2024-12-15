import React from "react";
import { Button } from "@mui/material";

// Define props type
interface RefreshTokenButtonProps {
  onClick: () => void; // Function untuk klik tombol
  label: string;       // Label dari tombol
}

const RefreshTokenButton: React.FC<RefreshTokenButtonProps> = ({
  onClick,
  label,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={onClick} // Callback saat tombol diklik
    >
      {label}
    </Button>
  );
};

export default RefreshTokenButton;
