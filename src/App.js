import RtlLayout from "./components/RtlLayout";
import ScrollToTop from "./components/ScrollToTop";
import ThemeColorPresets from "./components/ThemeColorPresets";
import ThemeLocalization from "./components/ThemeLocalization";
import MainRouter from "./routes";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <ThemeLocalization>
          <RtlLayout>
            <ScrollToTop />
            <MainRouter />
          </RtlLayout>
        </ThemeLocalization>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}

export default App;
