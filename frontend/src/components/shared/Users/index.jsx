import { DeleteOutlined, EditOutlined, EyeInvisibleFilled, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import {Card,Button,Input,Popconfirm, Table, Modal,Select, Form} from "antd";
import { useState} from "react";
import { toast } from "react-toastify";
import http from "../../../utils/http";
import useSWR, { mutate } from "swr";
import fetcher from "../../../utils/fetcher";
import { formatDate } from "../../../../../backend/src/utils/date";
// import UserModel from "../../../../../backend/src/user/user.model";
 

const {Item} = Form;

const Users = () =>{



const [loading,setLoading] = useState(false);

    const columns=[

{
            title:"Role",
            dataIndex:"role",
            key:"role",
            className:"capitalize"
        },


{
            title:"Full name",
            dataIndex:"fullname",
            key:"fullname",
            className:"capitalize"
        },

{
            title:"Mobile",
            dataIndex:"mobile",
            key:"Mobile",
            className:"capitalize"
        },

        {
            title:"Email",
            dataIndex:"email",
            key:"Email",
            className:"capitalize"
        },


         
         {
            title:"Date",
            dataIndex:"createdAt",
            key:"createdAt",
            render:(date)=>formatDate(date)
           
        },

        {
            title:"Status",
            dataIndex:"status",
            key:"Status",
            className:"capitalize",
            render:(status,obj)=>(
                status?
                <Button
                shape="circle"
                icon={<EyeOutlined/>}
                className="bg-green-500! text-white!"
                onClick={()=>onStatus(obj)}
                loading={loading}
                />
                :
                <Button
                shape="circle"
                icon={<EyeInvisibleFilled/>}
                className="bg-rose-400! text-white!"
                onClick={()=>onStatus(obj)}
                 loading={loading}
                />
            )
        },


    ]

const {data:users,error,isLoading}=useSWR(
    "/api/user/get",
    fetcher
)





const onStatus = async (obj)=>{
    try{
    setLoading(true);
    await http.put(`/api/user/status/${obj._id}`,{status:!obj.status})
    toast.success("Status Updated Succesfully");
    mutate("/api/user/get");

}catch(err){
    toast.error(err?.response?.data?.message||err.message);
}finally{
    setLoading(false);
}
}



    return(
     <div>
        <div className="grid">
            <Card
            title="Transaction List"
            style={{overflowX:"auto"}}
            extra={
<div className="mt-2 md:mt-0 flex flex-col md:flex-row gap-3">
    <Input 
    placeholder="Search by all"
prefix={<SearchOutlined/>}
    />

    

</div>
            }
            >

                <Table
                columns={columns}
                dataSource={users}
                scroll={{x:"max-content"}}
                loading={isLoading}
                />
            </Card>
        </div>
        
     </div>
    )
}

export default Users;