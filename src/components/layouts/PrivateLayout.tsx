import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context";
import { useAnchor } from "../../hooks";

export type PrivateLayoutProps = {} & PropsWithChildren;

const PrivateLayout = ({ children }: Readonly<PrivateLayoutProps>) => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();
  const { anchorEl, handleOpen, handleClose } = useAnchor();

  const onLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <Box minHeight="100vh" minWidth="100vw">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              To Do
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                  <Avatar alt={user?.username} src={user?.image}>
                    {user?.username[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={onLogout}>
                  <Typography sx={{ textAlign: "center" }}>
                    Cerrar sesión
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        p={3}
        component="main"
        minHeight="calc(100vh - 64px - 48px)"
        sx={{
          gap: 2,
          display: "flex",
          overflow: "hidden",
          alignItems: "end",
          position: "relative",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PrivateLayout;
