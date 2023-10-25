import { useParams } from "react-router-dom";
import StudentForm from "./StudentForm";
import Axios from "axios";
import { useEffect, useState } from "react";

function EditStudent()
{
    const {id} =  useParams();

    const [data,setData] = useState({name:"",email:"",rollNo:""});
    useEffect(()=>{
        Axios.get("https://crud-backend-gtuc.onrender.com/studentRoute/update-student/"+id)
        .then((res)=>{
            if(res.status === 200){
                const {name,email, rollNo} = res.data;
                setData({name,email,rollNo});
            }
            else
                Promise.reject();
        })
        .catch((err)=>alert(err))
    },[id]);
    return (
        <form>
            <StudentForm nameValue={data.name} emailValue={data.email}
                rollNoValue={data.rollNo} />
        </form>
    )
}
export default EditStudent;

