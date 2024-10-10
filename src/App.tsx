import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import router from "./pages";
import theme from "./theme";
import { UserContextProvider } from "./context";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
