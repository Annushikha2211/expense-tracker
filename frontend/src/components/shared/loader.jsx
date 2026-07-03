import {Spin} from "antd";

const Loader = () =>{
    return(
        <div className="flex text-white! h-screen item-center justify-center bg-black">
<Spin tip="loading" size="large" />
        </div>)
}

export default Loader ;