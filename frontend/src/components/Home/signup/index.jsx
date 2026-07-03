import {Card,Form,Input,Button} from "antd";
 import {LockOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
 import {Link} from "react-router-dom";
import HomeLayout from "../../../Homelayout";
import http from "../../../utils/http";
import oneImg from "./one.png";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 



 const {Item}=Form;

 const Signup=()=>{
// const {signupForm}=Form.userForm();
const [formData,setFormData]=useState(null);
const [otp,setOtp]=useState(null);
const [loading,setLoading]=useState(false);


const onFinish=async(values)=>{
    try{
         setLoading(true);
const{data}=await http.post("/api/user/send-mail",values);
console.log("API RESPONSE:",data)
setOtp(data.otp);
setFormData(values);

    }catch(err){
toast.error(err.response?err.response.data.message:err.message);
        setOtp(null);
        setFormData(null)
    

    }finally{
        setLoading(false);
    }
}


const onSignup=async(values)=>{
    try{
        setLoading(true);
 if (Number(values.otp)!==Number(otp))
    return toast.error("OTP not match");

await http.post("/api/user/signup",formData);
setOtp(null);
setFormData(null);
// signupForm.resetFields();
    
    }catch(err){
        toast.error(err.response?err.response.data.message:err.message);

    }finally{
        setLoading(false);
    }
}

    return(
        
       <HomeLayout>
<ToastContainer/>
        <div className="flex h-full">
        <div className=" w-1.5/2 hidden md:flex item-center justify-center">
        
        {/* <img src="/one.png" alt="Bank"  className="w-5/5 h-160 object-contain " /> */}

        <img src={oneImg} alt="signup"  className="w-5/5 h-160 object-contain " />
        
           </div>
           <div className="w-full md:w-1/2 flex item-center justify p-2 md:p-6 bg-white mt-8 ">
             <Card className="w-full max-w-sm shadow-xl max-h-fit ">
                    <h2 className="font-bold text-[#869ECA] text-2xl text-center mb-6">
                        Track Your Expense
                    </h2>

{
    otp ?
            <Form
             name="login form"
            layout="vertical"
        onFinish={onSignup}
            >

<Item 
name="otp"
label="OTP"
rules={[{required:true}]}
>
    <Input.OTP
    prefix ={<UserOutlined/>}
    placeholder="Enter your OTP"
    />
</Item>



<Item>

    <Button
loading={loading}
        type="text"
        htmlType="submit"
        // className="bg-[#869eca] text-white font-bold"
        block
        style={{ backgroundColor:"#869eca",color:"white",fontWeight:"bold" }}

        >
            Verify Now
    </Button>
</Item>

            </Form>
            :
            <Form
             name="login form"
            layout="vertical"
            onFinish={onFinish}
            >

                <Item 
name="fullname"
label="fullname"
rules={[{required:true}]}
>
    <Input
    prefix ={<UserOutlined/>}
    placeholder="Enter your fullname"
    />
</Item>

<Item 
name="mobile"
label="Mobile"
rules={[{required:true}]}
>
    <Input
    prefix ={<PhoneOutlined/>}
    placeholder="Enter your Mobile Number"
    />
    
</Item>



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
loading={loading}
        type="text"
        htmlType="submit"
        // className="bg-[#869eca] text-white font-bold"
        block
        style={{ backgroundColor:"#869eca",color:"white",fontWeight:"bold" }}

        >
            Signup
    </Button>
</Item>

            </Form>
}

            <div className="flex items-center justify-between">

                <div ></div>
                <Link
                
                style={{textDecoration:"underline"}}
                to="/"
                className="text-[#869eca]! font-bold!"

                >
                    Already have an Account ?
                </Link>

            </div>


        </Card>
</div>
       </div>

       </HomeLayout>
    )
}
export default Signup;