import {Card,Form,Input,Button} from "antd";
 import {LockOutlined, UserOutlined} from "@ant-design/icons";
 import {Link, useSearchParams} from "react-router-dom";
 import oneImg from "./one.png";
 import {useState} from "react";
 import {toast, ToastContainer} from "react-toastify";
 import "react-toastify/dist/ReactToastify.css"; 

import http from "../../../utils/http";

import {useNavigate} from "react-router-dom"
import {useEffect} from "react"


 const {Item}=Form;

 const ForgotPassword=()=>{

    const navigate = useNavigate();
    const[params]=useSearchParams();


    

    const {forgotForm} = Form.useForm();
    const {rePasswordForm} = Form.useForm();

    const [loading,setLoading]=useState(false);
    const [token,setToken]=useState(null);
    useEffect(()=>{
        const tok=params.get("token");
        if(tok){
            checkToken(tok);
        }else{
            setToken(null);
        }
        
    },[params]
    
    )


     const checkToken=async(tok)=>{
        try{
            await http.post("/api/user/verify-token",{},{
                headers:{
                    Authorization : `Bearer ${tok}`
                }
            });

            setToken(tok);

        }catch(err){
            setToken(null);

        }
     }


    const onFinish=async(values)=>{
    try{
         setLoading(true);
await http.post("/api/user/forgot-password",values);
toast.success("Please Check your Email to Forgot Password");



    }catch(err){
toast.error(err.response?err.response.data.message:err.message);
    
    }finally{
        setLoading(false);
    }
}

const onChangePassword =async(values)=>{
    try{
        if(values.password !== values.rePassword)
            return toast.warning("Password & re password do not match")
         setLoading(true);
await http.put("/api/user/change-password",values,
    {
                headers:{
                    Authorization : `Bearer ${params.get("token")}`
                }
            }
);

toast.success("Password updated successfully,pleasw wait...");
setTimeout(()=>{
    navigate("/")
},3000)

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

<img src={oneImg} alt="forgotpass"  className="w-5/5 h-160 object-contain " />

   </div>
   <div className="w-full md:w-1/2 flex item-center justify p-2 md:p-6 bg-white  mt-26 ">
     <Card className="w-full max-w-sm shadow-xl max-h-fit ">
            <h2 className="font-bold text-[#869ECA] text-2xl text-center mb-6">
                {
                    token?
                    "Change Password"
                    :
                    "Forgot Password"
                }
            </h2>


{
    token ?

    <Form
             name="login form"
            layout="vertical"
            onFinish={onChangePassword}
            form={rePasswordForm}
            >
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
   
   <Item 
name="rePassword"
label="Re Enter Password"
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
            Change Password
    </Button>
</Item>

            </Form>
            :
             <Form
             name="login form"
            layout="vertical"
            onFinish={onFinish}
            form={forgotForm}
            >
<Item 
name="email"
label="Email"
rules={[{required:true}]}
>
    <Input
    prefix ={<UserOutlined/>}
    placeholder="Enter your Email"
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
            Submit
    </Button>
</Item>

            </Form>
}
           

            

            <div className="flex items-center justify-between">

                <Link
                style={{textDecoration:"underline"}}
                to="/login"
                className="text-[#869eca]! font-bold!"
                // onClick={handleForget}
                >
                    Sign In

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
export default ForgotPassword;