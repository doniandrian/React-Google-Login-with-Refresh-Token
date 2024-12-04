import { Box, Typography, styled, keyframes } from "@mui/material";

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

function HomePage() {
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
      <BounceImage
        src="../google-logo.svg"
        alt="Google Logo"
        width="70"
        height="70"
      />
      <Typography variant="h4" gutterBottom color="white">
        You're logged in with Google
      </Typography>
    </Box>
  );
}

export default HomePage;
