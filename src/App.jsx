import Home from "./routes/home/home.components";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import ShopData from "./routes/shop/shop-component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<ShopData />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>

  );
}

export default App;
