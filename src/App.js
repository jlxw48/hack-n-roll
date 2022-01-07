import NavigationBar from "./components/navigationBar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about"
import Summary from "./pages/summary";

function App() {
    return (
		<Router>
			<div style={{backgroundColor:"rgb(249,249,249)", minHeight:"100vh"}}>
				<NavigationBar />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/about" element={<About />}/>
					<Route path='/summary' element={<Summary />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App;
