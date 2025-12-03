import { useTheme } from "./hooks/useTheme";
import { AppRoutes } from "./routes";
import "./styles/index.css";

const App = () => {
  useTheme();
  return <AppRoutes />;
};

export default App;
