
import {Layout,theme} from "antd";

const { Header,Footer,Content}=Layout;



const HomeLayout = ({children})=>{

    const{
    token:{colorBgContainer,borderRadiusLG},
} = theme.useToken();

    return(

<Layout>
<header className="bg-[#869eca] flex item-center justify-center">
<h1 className='text-white text-lg md:text-3xl font-bold text-center'>
    Expense Tracker
</h1>
</header>
<Content
 style={{
    margin :'24px 16px',
    paddind:24,
    minHeight:280,
    background:colorBgContainer,
    borderRadius:borderRadiusLG,
 }}
    >
        {children}
    </Content>

    <footer className=" bg-[#869eca] p-8 text-center text-white">
        
        <h1 className='text-white text-lg md:text-3xl font-bold text-center'>
    Footer
</h1>

    </footer>

</Layout>
    )

}

export default HomeLayout;