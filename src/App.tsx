import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import NewBooksPage from "./Pages/newbook/p-newbook";
import Author from "./Pages/author/p-author";
import Categories from "./Pages/category/p-Categories";
import Introdution from "./Pages/introduction/p-introduce";
import RegisterPage from "./Pages/register/p-register";
import LoginPage from "./Pages/login/p-login";
import ForgotPasswordPage from "./Pages/forgot-password/p-forgotpassword";
import ProfilePage from "./Pages/profile/p-profile"
import SearchPage from "./Pages/search/p-search"
import AuthSuccess from "./Pages/AuthSuccess";
import PaymentPage from "./Pages/payment/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newbook" element={<NewBooksPage/>} />
        <Route path="/category" element={<div><Categories/></div>} />
        <Route path="/author" element={<div><Author/></div>} />
        <Route path="/introduction" element={<div><Introdution/></div>} />
        <Route path="/login" element={<div><LoginPage/></div>} />
        <Route path="/register" element={<div><RegisterPage/></div>} />
        <Route path="/forgot-password" element={<div><ForgotPasswordPage/></div>} />
        <Route path="/profile" element={<div><ProfilePage/></div>} />
        <Route path="/search" element = {<div> <SearchPage/></div>}/>
        <Route path="/auth/success" element={<AuthSuccess/>} />
        <Route path="/payment" element = {<div> <PaymentPage/></div>}/>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}
export default App;
