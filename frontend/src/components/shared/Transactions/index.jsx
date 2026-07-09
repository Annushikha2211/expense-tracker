import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import {Card,Button,Input,Popconfirm, Table, Modal,Select, Form} from "antd";
import { useState,useForm } from "react";
import { toast } from "react-toastify";
import http from "../../../utils/http";
import useSWR, { mutate } from "swr";
import fetcher from "../../../utils/fetcher";
import { formatDate } from "../../../../../backend/src/utils/date";
 

const {Item} = Form;

const Transactions = () =>{

const [transactionForm] = Form.useForm();

const [edit,setEdit] = useState(null);
const [modal,setModal] = useState(false);
const [loading,setLoading] = useState(false);

    const columns=[

{
            title:"Transaction Type",
            dataIndex:"transactionType",
            key:"transactionType",
            className:"capitalize"
        },
// {
//             title:"Mobile",
//             dataIndex:"mobile",
//             key:"Mobile",
//             className:"capitalize"
//         },

//         {
//             title:"Email",
//             dataIndex:"email",
//             key:"Email",
//             className:"capitalize"
//         },
        
        {
            title:"Title",
            dataIndex:"title",
            key:"title",
            className:"capitalize"
        },

        {
            title:"Amount",
            dataIndex:"amount",
            key:"amount",
            className:"capitalize"
        },

        {
    title: "Category",
    dataIndex: "category",
    key: "category",
    className: "capitalize"
},

         {
            title:"PaymentMethod",
            dataIndex:"paymentMethod",
            key:"paymentMethod",
            className:"capitalize"
        },

         {
            title:"Notes",
            dataIndex:"notes",
            key:"notes",
            className:"capitalize"
        },

         {
            title:"Date",
            dataIndex:"createdAt",
            key:"createdAt",
            render:(date)=>formatDate(date)
           
        },

         {
            title:"Action",
            key:"action",
        fixed:"right",
        render:(_,obj)=>(
            <div className="flex gap-1">
                <Popconfirm
                title="Are you sure ?"
                description="Once you update,You can also re-update"
                onCancel={()=>toast.info("No change ocuur!")}
            onConfirm={()=>onEditTransaction(obj)}
                
                >
                    <Button
                    type="text"
                    className="bg-green-100! text-green-500!"
                    icon={<EditOutlined/>}/>
                </Popconfirm>

                <Popconfirm
                title="Are you sure ?"
                description="Once you deleted,You can also re-store!"
                onCancel={()=>toast.info("Your data is safe!")}
                 onConfirm={()=>onDelete(obj._id)}
                >
                    <Button
                    type="text"
                    className="bg-green-100! text-green-500!"
                    icon={<DeleteOutlined/>}/>
                    
                </Popconfirm>

            </div>
        )
        },



    ]

const {data:transaction,error,isLoading}=useSWR(
    "/api/transaction/get",
    fetcher
)

const onFinish=async(values)=>{
try{
    setLoading(true);
    await http.post("/api/transaction/create",values)
    toast.success("Transaction credited successfully");
    mutate("/api/transaction/get");
    setModal(false);
    transactionForm.resetFields();

}catch(err){
    toast.error(err?.response?.data?.message||err.message);
}finally{
    setLoading(false);
}
}

const onUpdate=async(values)=>{
try{
    setLoading(true);
    await http.put(`/api/transaction/update/${edit._id}`,values)
    toast.success("Transaction updated successfully");
    mutate("/api/transaction/get");
    setModal(false);
    setEdit(null)
    transactionForm.resetFields();

}catch(err){
    toast.error(err?.response?.data?.message||err.message);
}finally{
    setLoading(false);
}
}

const onDelete = async (id)=>{
    try{
    setLoading(true);
    await http.delete(`/api/transaction/delete/${id}`)
    toast.success("Transaction deleted successfully");
    mutate("/api/transaction/get");

}catch(err){
    toast.error(err?.response?.data?.message||err.message);
}finally{
    setLoading(false);
}
}

const onEditTransaction = (obj) => {
    setEdit(obj);
    transactionForm.setFieldsValue(obj);
    setModal(true);
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

    <Button
   type="text"
   className="font-bold! bg-blue-500! text-white!"
   onClick={()=>setModal(true)}
    >
Add new Transaction
    </Button>

</div>
            }
            >

                <Table
                columns={columns}
                dataSource={transaction}
                scroll={{x:"max-content"}}
                loading={isLoading}
                />
            </Card>
        </div>
        <Modal
        open={modal}
        onCancel={()=>
           {
             setModal(false)
             setEdit(null)
             transactionForm.resetFields();
           }}
        title="Add new Transaction"
        footer={null}
        >
<Form
layout="vertical"
form={transactionForm}
onFinish={edit? onUpdate : onFinish}
>
<div className="grid md:grid-cols-2 gap-x-3">
    <Item
    label="Transaction Type"
    name="transactionType"
    rules={[{required:true}]}
    >
        <Select
        placeholder="Transation Type"
        options={[
            {label:"CR",value:"cr"},
            {label:"DR",value:"dr"}
        ]}
        />

        

    </Item>

     <Item
    label="Amount"
    name="amount"
    rules={[{required:true}]}
    >
        <Input
        placeholder="Enter Amount"
        type="number"
        />

        

    </Item>

 <Item
    label="Title"
    name="title"
    rules={[{required:true}]}
    >
        <Input
        placeholder="Enter title"
       
        />

        

    </Item>

<Item
    label="Category"
    name="category"
    rules={[{ required: true, message: "Please select category" }]}
>
    <Select
        placeholder="Select Category"
        options={[
            { label: "Salary", value: "salary" },
            { label: "Food", value: "food" },
            { label: "Shopping", value: "shopping" },
            { label: "Travel", value: "travel" },
            { label: "Bills", value: "bills" },
            { label: "Medical", value: "medical" },
            { label: "Entertainment", value: "entertainment" },
            { label: "Other", value: "other" }
        ]}
    />
</Item>


<Item
    label="Payment Method"
    name="paymentMethod"
    rules={[{required:true}]}
    >
        <Select
        placeholder="Payment Method"
        options={[
            {label:"Cash",value:"cash"},
            {label:"Online",value:"online"}
        ]}
        />

        

    </Item>

    
</div>

<Item
    label="Notes"
    name="notes"
    rules={[{required:true}]}
    >
        <Input.TextArea placeholder="potato,tomato,etc"
        />

        

    </Item>

    <Item
    className="flex justify-center"
    >
        <Button
        loading={loading}
        type="text"
        htmlType="submit"
        className={`font-semibold! text-white! ${edit?"bg-red-500!" : "bg-blue-500!"}`}>
            {edit?"Update":"Submit"}
        </Button>
    </Item>


</Form>
        </Modal>
     </div>
    )
}




export default Transactions;