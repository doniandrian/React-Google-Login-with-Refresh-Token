import { Box, Typography, styled, keyframes, Button } from "@mui/material";
import { useState } from "react";

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

const BounceImage = styled("img")`
  animation: ${Bounce} 1s ease-in-out infinite;
`;

// Styled Box untuk Header Kanan Atas
const HeaderRight = styled(Box)`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px; /* Jarak antara nama user dan tombol */
`;

function HomePage({ userName, onLogout }: { userName: string; onLogout: () => void }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#87CEEB",
        position: "relative",
      }}
    >
      {/* Header Kanan Atas */}
      <HeaderRight>
        <Typography variant="body1" color="navy">
          {userName}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={onLogout}
          sx={{
            minWidth: 0, // Hapus padding default
            padding: 1,
          }}
        >
          Logout
        </Button>
      </HeaderRight>

      {/* Logo */}
      <BounceImage
        src="../google-logo.svg"
        alt="Google Logo"
        width="70"
        height="70"
      />

      {/* Pesan Selamat Datang */}
      <Typography variant="h5" color="navy" gutterBottom>
        Welcome, {userName}!
      </Typography>

      <Typography variant="h6" color="navy" gutterBottom>
        You're logged in with Google
      </Typography>
    </Box>
  );
}

// Parent Component (Simulasi Data dan Logout)
function App() {
  const [userName, setUserName] = useState("John Doe"); // Contoh nama user
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Status login

  const handleLogout = () => {
    // Logika logout, misalnya menghapus token
    setIsLoggedIn(false);
    console.log("User has logged out!");
  };

  return (
    <>
      {isLoggedIn ? (
        <HomePage userName={userName} onLogout={handleLogout} />
      ) : (
        <Typography variant="h4" align="center" sx={{ mt: 5 }}>
          You have logged out.
        </Typography>
      )}
    </>
  );
}

export default App;
