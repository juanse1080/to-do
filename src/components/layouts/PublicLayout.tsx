import { Box, Card } from "@mui/material";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context";

export type PublicLayoutProps = {} & PropsWithChildren;

const PublicLayout = ({ children }: Readonly<PublicLayoutProps>) => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <Box
      minHeight="100vh"
      minWidth="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      <Card
        elevation={0}
        sx={{
          width: 500,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 2,
        }}
      >
        {children}
      </Card>
    </Box>
  );
};

export default PublicLayout;
