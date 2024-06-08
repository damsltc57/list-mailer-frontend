import "../style/App.css";
import Routes from "../routes";
import ThemeCustomization from "../themes";
import { SnackbarProvider } from "notistack";

function App() {
	return (
		<ThemeCustomization>
			<SnackbarProvider maxSnack={3}>
				<Routes />
			</SnackbarProvider>
		</ThemeCustomization>
	);
}

export default App;
