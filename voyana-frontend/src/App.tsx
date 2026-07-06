import { AppProviders } from "./app/providers/AppProviders";
import { AppRouter } from "./app/router/AppRouter";
import { FloatingChatButton } from "./shared/components/FloatingChatButton";

export function App() {
  return (
    <AppProviders>
      <AppRouter />
      <FloatingChatButton />
    </AppProviders>
  );
}

export default App;
