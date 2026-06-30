 import {Card,Form,Input,Button} from "antd";
 import {LockOutlined, UserOutlined} from "@ant-design/icons";
 import {Link} from "react-router-dom";
 import oneImg from "./one.png";
 import {useState} from "react";
 import {toast, ToastContainer} from "react-toastify";
 import "react-toastify/dist/ReactToastify.css"; 
import axios from "axios";
import {useNavigate} from "react-router-dom"

 const {Item}=Form;

 const Login=()=>{

    const navigate = useNavigate();

    axios.defaults.baseURL= import.meta.env.VITE_BASE_URL

    const {loginForm} = Form.useForm();

    const [loading,setLoading]=useState(false);
     


    const onFinish=async(values)=>{
    try{
         setLoading(true);
const{data}=await axios.post("/api/user/login",values);
const {role}=data;

if(role=="admin")
    return toast.success("Admin try to login");

if(role=="user")
    return navigate("/app/user");


console.log(data);
toast.success("Login Successfull");


    }catch(err){
toast.error(err.response?err.response.data.message:err.message);
    
    }finally{
        setLoading(false);
    }
}



    return(
        <>
         <ToastContainer position="top-right" autoClose={3000} />


       <div className="flex h-full">
<div className=" w-1.5/2 hidden md:flex item-center justify-center">

<img src={oneImg} alt="login"  className="w-5/5 h-160 object-contain " />

   </div>
   <div className="w-full md:w-1/2 flex item-center justify p-2 md:p-6 bg-white  mt-26 ">
     <Card className="w-full max-w-sm shadow-xl max-h-fit ">
            <h2 className="font-bold text-[#869ECA] text-2xl text-center mb-6">
                Track Your Expense
            </h2>


            <Form
             name="login form"
            layout="vertical"
            onFinish={onFinish}
            form={loginForm}
            >
<Item 
name="email"
label="Username"
rules={[{required:true}]}
>
    <Input
    prefix ={<UserOutlined/>}
    placeholder="Enter your Username"
    />
</Item>

<Item 
name="password"
label="Password"
rules={[{required:true}]}
>
    <Input.Password
    prefix ={<LockOutlined/>}
    placeholder="Enter your Password"
    />
</Item>

<Item>

    <Button

        type="text"
        htmlType="submit"
        // className="bg-[#869eca] text-white font-bold"
        block
        style={{ backgroundColor:"#869eca",color:"white",fontWeight:"bold" }}
loading={loading}
        >
            Login
    </Button>
</Item>

            </Form>

            <div className="flex items-center justify-between">

                <Link
                style={{textDecoration:"underline"}}
                to="/forgot-password"
                className="text-[#869eca]! font-bold!"
                // onClick={handleForget}
                >
                    Forgot Password 

                </Link>

                <Link
                
                style={{textDecoration:"underline"}}
                to="/signup"
                className="text-[#869eca]! font-bold!"

                >
                    Don't have an Account ?
                </Link>

            </div>


        </Card>
</div>
       </div>
   </>
   
    )
}
export default Login;