import Homepage from "./components/Home";
import Login from "./components/Home/login";
import Signup from "./components/Home/signup";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import PageNotFound from "./components/pagenotfound"
import Userlayout from "./components/user/userlayout";
import ForgotPassword from "./components/Home/forgotpass";
import Dashboard from "./components/user/dashboard";
import Report from "./components/user/report";

const App =()=>{

  return(
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/app/user" element={<Userlayout/>} >
    <Route path="dashboard" element={<Dashboard/>} />   
    <Route path="report" element={<Report/>} />    
    </Route>
    <Route path="/*" element={<PageNotFound/>}/>
    
   </Routes>
   </BrowserRouter>
  )
}

export default App;