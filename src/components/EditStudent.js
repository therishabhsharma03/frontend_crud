import { useParams } from "react-router-dom";
import StudentForm from "./StudentForm";
import Axios from "axios";
import { useEffect, useState } from "react";

function EditStudent()
{
    const {id} =  useParams();

    const [data,setData] = useState({name:"",email:"",rollNo:""});
    const [newData, setNewData] = useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:4000/studentRoute/update-student/"+id)
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

    const getState = (childData) =>{
        setNewData(childData);
    }

    const handleSubmit = () => {
        const data = {name:newData[0], email:newData[1], rollNo:newData[2]}
        Axios.put("http://localhost:4000/studentRoute/update-student/"+id, data)
        .then((res)=>{
            if(res.status === 200)
                alert("Record updated successfully");
            else
                Promise.reject();
        })
        .catch((err)=>alert(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <StudentForm getState={getState} nameValue={data.name} emailValue={data.email}
                rollNoValue={data.rollNo} />
        </form>
    )
}
export default EditStudent;
