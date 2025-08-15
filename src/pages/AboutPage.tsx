import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AboutPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 720,
        }}
      >
        <Typography variant="h3" sx={{ mb: 1, textAlign: "left" }}>
          <strong>
            About
          </strong>
        </Typography>
      </Box>
    </Box>
  );
};
