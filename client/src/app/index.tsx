import { AppProvider } from "./main-provider";
import { AppRouter } from "./routes/router";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
