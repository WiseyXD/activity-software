import { Button } from "@/components/ui/button";
import AchievementForm from "./components/shared/AchievementForm";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
    // Add Routing
    const name = "Aryan";

    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <div className="min-h-screen">
                    <ModeToggle />
                    <AchievementForm />
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;
