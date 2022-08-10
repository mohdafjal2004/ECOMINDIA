import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store/store";
import ViewProduct from "./components/ViewProduct";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/viewproduct/:productId" element={<ViewProduct />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
