import {
  Alert,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { LoadingButton, PublicLayout, RenderIf } from "../../components/";
import { useFetch, useForm } from "../../hooks";
import { LoginInput, User } from "../../types";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUserContext();

  const {
    reset,
    value: user,
    handleChange,
  } = useForm<LoginInput>({
    username: "",
    password: "",
  });

  const { error, fetchData, loading } = useFetch<User>("user/login", {
    lazy: true,
    method: "POST",
  });

  const onLogin = async (user: LoginInput) => {
    const result = await fetchData(`user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, expiresInMins: 30 }),
    });

    if (!result) return;

    login(result!);
    navigate("/");
    reset();
  };

  return (
    <PublicLayout>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Iniciar sesión
      </Typography>

      <RenderIf render={!!error}>
        <Alert severity="error">Credenciales incorrectas</Alert>
      </RenderIf>

      <TextField
        required
        autoFocus
        name="username"
        size="small"
        label="Nombre de usuario"
        value={user.username}
        onChange={handleChange}
      />

      <TextField
        required
        size="small"
        name="password"
        type="password"
        label="Contraseña"
        value={user.password}
        onChange={handleChange}
      />
      <FormControlLabel
        label="¿Desea recordar la sesión?"
        control={<Switch defaultChecked={false} />}
      />
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        gap={1}
      >
        <LoadingButton
          color="primary"
          variant="contained"
          loading={loading}
          onClick={() => onLogin(user!)}
        >
          Iniciar
        </LoadingButton>
      </Box>
    </PublicLayout>
  );
};

export default Login;
