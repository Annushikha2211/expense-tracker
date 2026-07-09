import { Suspense } from "react";
import Guard from "./guard";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { lazy } from "react";
import Loader from "./components/shared/loader"


const Adminlayout=lazy(()=>import(`./components/Admin/adminlayout`))
const PageNotFound = lazy(()=>import("./components/pagenotfound"));
const Homepage= lazy(()=>import("./components/Home"));
const Login =lazy(()=>import("./components/Home/login"));
const Signup =lazy(()=>import("./components/Home/signup"));
const Userlayout= lazy(()=>import("./components/user/userlayout"));
const ForgotPassword=lazy(()=>import( "./components/Home/forgotpass"));
const Dashboard= lazy(()=>import("./components/shared/dashboard"));
const Report= lazy(()=>import("./components/shared/report")); 
const Transactions= lazy(()=>import("./components/shared/Transactions")); 
const Users =lazy(()=>import("./components/shared/users")) ;



const App =()=>{

  return(
   <BrowserRouter>
   <Suspense fallback={<Loader/>}>
   <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
{/* admin releted */}
    <Route path="/app/admin" 
    element={<Guard
    endpoint="/api/user/session"
    role="admin"
    >
      <Adminlayout/>
    </Guard>}
     >
    
    <Route path="dashboard" element={<Dashboard/>} />   
    <Route path="report" element={<Report/>} />  
    <Route path="users" element={<Users/>} />  

    </Route>


{/* user releted */}
    <Route path="/app/user" 
    element={<Guard
    endpoint="/api/user/session"
    role="user"
    >
      <Userlayout/>
    </Guard>}
     >
    
    <Route path="dashboard" element={<Dashboard/>} />   
    <Route path="report" element={<Report/>} />  
    <Route path="transactions" element={<Transactions/>} />  

    </Route>
    <Route path="/*" element={<PageNotFound/>}/>
    
   </Routes>
   </Suspense>
   <ToastContainer/>
   </BrowserRouter>
  )
}

export default App;