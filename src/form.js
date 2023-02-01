import './App.css'
import React, {useEffect, useState} from "react";
import {useNavigate,Link  } from "react-router-dom";
import axios from "axios";

function Signup() {

    const [formdata,setFormData] = useState({
        username:'',
        email:'',
        password:''
    });
    const [data,setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const[update_id, setUpdateId] = useState("");
const  navigate = useNavigate();
    useEffect(()=>{
        getdata();

    },[data]);

    const OnInputChange = (e) =>{
        setFormData({...formdata,[e.target.name]:e.target.value})
    };

    const handleSubmit = async (e) =>{
        if(isEdit){
            e.preventDefault();
            try{
                const res =  await axios.put(`http://localhost:8081/user/${update_id}`, {
                    username:formdata.username, email:formdata.email, password: formdata.password,
                });
                console.log(res)
            }catch (e) {
                console.log(e);
            }
        }
       else{
          e.preventDefault();
           const details = {
            username:formdata.username,
            email:formdata.email,
            password:formdata.password,
        };
console.log(details);
            const isExist = data.some((item)=> item.username === details.username);
        try{
            if(!isExist){
                const res = await axios.post('http://localhost:8081/create', details);
                console.log(res);
                setData([...data,details]);}
            else{
                alert("username is already exist")
            }

        }catch (e) {
            console.log("errorrrrr",e);
        }}
       setFormData({
           username:"",
           email:"",
           password:"",
       });
setIsEdit(false);
    };

    const handleUpdate = async (id) =>{
        try{
            setIsEdit(true);
            const res =  await axios.get(`http://localhost:8081/user/${id}`);
            setUpdateId(id);
            console.log("edit", res.data.username);
            setFormData({
                    username:res.data.username,
                    email:res.data.email,
                    password:res.data.password
                    });

                }catch(e) {
                    console.log(e);
                } };

    const getdata = async () =>{
        try{
            const res = await axios.get('http://localhost:8081/get-all');
            setData(res.data);

        }catch (e) {
            console.log(e);
        }
    };
    const handleDelete = async (id) => {
        try{
         const res=  await axios.delete(`http://localhost:8081/user/${id}`);
         console.log("deleted data", res.data)
        }catch(e) {
            console.log(e);
        } };


  const handleSave = async (id) => {
      try{
          const res =  await axios.put(`http://localhost:8081/user/${id}`, {
              username:formdata.username, email:formdata.email, password: formdata.password,
          });

          console.log(res)
  }
        catch (e) {
          console.log(e);
      }
      setFormData({
          username:"",
          email:"",
          password:"",
      });
      setIsEdit(false)};

    return (
        <div className="App"  style={{width:"500px",margin:'auto'}}>
            <form >
                <h2>Sign Up</h2>
                <hr />
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
          <span className="input-group-text">
            <span className="fa fa-user" />
          </span>
                        </div>
                        <input type="text" className="form-control" value={formdata.username} name="username" placeholder="Username" onChange={OnInputChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-paper-plane" />
          </span>
                        </div>
                        <input type="text" className="form-control" value={formdata.email} name="email" placeholder="Email Address" onChange={OnInputChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock" />
          </span>
                        </div>
                        <input type="text" className="form-control" value={formdata.password} name="password" placeholder="Password" onChange={OnInputChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <Link to="/login">   <button type="submit" className="btn btn-primary btn-lg" onClick={(id)=>handleSubmit(id)}>{isEdit?"Save" : "Add_Record"}</button></Link>

                </div>
            </form>
            <table >
                <thead>
                    <th>Username</th>
                    <th>Email</th>
                    <th>password</th>
                    <th>Action</th>
                    <th>Action</th>
                    <th>Action</th>

                </thead>
            {
                data.map ((item,index)=>
                    <tbody>
                    <tr key={index}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td><button className="button-85" onClick={()=>handleDelete(item._id)}>Delete</button></td>
                        <td>
                            <button className="button-33" onClick={() => handleUpdate(item._id)}>Edit</button>
                        </td>
                        <td>
                            <button className="button-20" onClick={()=>handleSave(item._id)} >Save</button>
                        </td>
                </tr>
                    </tbody>)}
            </table>
        </div>
    );
}

export default Signup;