  import {Image,Button,Layout,Menu} from "antd";
  import logo from "./one.png";
  import {AppstoreAddOutlined,BarChartOutlined, DollarOutlined, LogoutOutlined, MenuOutlined, UserOutlined} from "@ant-design/icons";
  const {Sider,Header,Content,Footer} = Layout;
  import { useState } from "react";
  import { useNavigate,useLocation ,Outlet,Navigate} from "react-router-dom";
  import { toast } from "react-toastify";
  import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import Loader from "../../shared/loader";
import http from "../../../utils/http";
import { theme } from "antd";
// import SelectedKeys from ""


  const items=[

{
    key:"/app/admin/dashboard",
    label:"Dashboard",
    icon:<AppstoreAddOutlined/>
},

{
    key:"/app/admin/report",
    label:"Reports",
    icon:<BarChartOutlined/>
},
  
{
    key:"/app/admin/users",
    label:"Users",
    icon:<UserOutlined/>
}
  
]

  const adminlayout=()=>{

    const navigate=useNavigate();
    const {pathname} =useLocation();

    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);

    const handleNavigate=(menu)=>{
        navigate(menu.key);

    }

   


    const siderStyle={
        overflow:'auto',
      height:'100vh',
        position:'sticky',
        insetInlinerStart:'0',
        top:'0',
        bottom:'0',
        scrollbarWidth:'thin',
        scrollbarGtuuer:'stable',

    };

    const headerStyle={
        
        position:'sticky',
        top:0,
        zIndex:1,
        width:'100%',
        display:'flex',
        alignItem:'center',
        padding:16,
        insetInlinerStart:'0',
        
        
    };


const logout=async()=>{
    try{
        setLoading(true);
await http.get("/api/user/logout");
navigate("/")
setLoading(false);
    }catch(err){
        setLoading(false);
        toast.error(err.response?err.response.data.message:err.message)

    }
}

const {
    token:{colorBgContainer,borderRadiusLG}
} =theme.useToken();

 return(
    <Layout className="min-h-screen!">

<Sider style={siderStyle} collapsible collapsed={open}>
<div className=" flex item-center justify-center my-4">

    <Image
src={logo}
width={60}
height={60}
alt="logo"
className="rounded-full mx-auto my-3 mb-3"
/>

</div>
<Menu
selectedKeys={[pathname]}
theme="dark"
items={items}
onClick={handleNavigate}
/>
</Sider>

<Layout>
    <Header style={headerStyle} className="flex item-center justify-between px-5! bg-white! shadow!">
<Button
onClick={()=>setOpen(!open)}
icon={<MenuOutlined/>}
/>

<Button
icon={<LogoutOutlined/>}
onClick={logout}
loading={loading}
/>
    </Header>
    <Content
   style={
    {
    margin:'4px 8px',
    padding:4,
    minHeight:280,
    background:colorBgContainer,
    borderRadius:borderRadiusLG,
   }
   }
    >
        <Outlet />

    {/* <h1>hjguygbhugy</h1> */}
    </Content>
</Layout>
    </Layout>
 )
}
export default adminlayout;