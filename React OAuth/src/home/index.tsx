import { Box, Typography, styled, keyframes, Button } from "@mui/material";
import { useState } from "react";

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

// Komponen utama
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
      }}
    >
      {/* Logo */}
      <BounceImage
        src="../google-logo.svg"
        alt="Google Logo"
        width="70"
        height="70"
      />
      
      {/* Nama User */}
      <Typography variant="h5" color="white" gutterBottom>
        Welcome, {userName}!
      </Typography>

      {/* Pesan Logged In */}
      <Typography variant="h6" color="white" gutterBottom>
        You're logged in with Google
      </Typography>

      {/* Tombol Logout */}
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={onLogout}
      >
        Logout
      </Button>
    </Box>
  );
}

// Parent Component (Simulasi Data dan Logout)
function App() {
  const [userName, setUserName] = useState("John Doe"); // Contoh data nama user
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
