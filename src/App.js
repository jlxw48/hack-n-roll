import NavigationBar from "./components/navigationBar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about"
function App() {
    return (
		<Router>
			<div className="App">
				<NavigationBar />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/about" element={<About />}/>
				</Routes>
			</div>
		</Router>
	)
}

export default App;
