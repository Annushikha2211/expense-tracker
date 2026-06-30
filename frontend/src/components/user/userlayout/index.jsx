  import {Image,Button,Layout,Menu} from "antd";
  import {AppstoreAddOutlined,BarChartOutlined, LogoutOutlined, MenuOutlined} from "@ant-design/icons";
  const {Sider,Header,Content,Footer} = Layout;
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  

  const items=[

{
    key:"/app/user/dashboard",
    label:"Dashboard",
    icon:<AppstoreAddOutlined/>
},

{
    key:"/app/user/report",
    label:"Reports",
    icon:<BarChartOutlined/>
}
  
]

  const Userlayout=()=>{

    const navigate=useNavigate();

    const [open,setOpen] = useState(false);

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

 return(
    <Layout className="min-h-screen!">

<Sider style={siderStyle} collapsible collapsed={open}>
<div className=" flex item-center justify-center my-4">

    <Image
src="/one.png"
width={60}
height={60}
alt="logo"
className="rounded-full mx-auto my-3 mb-3"
/>

</div>
<Menu
defaultSelectedKeys={['/app/user/dashboard']}
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
/>
    </Header>
</Layout>
    </Layout>
 )
}
export default Userlayout;