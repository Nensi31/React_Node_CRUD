import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [formdata,setFormData] = useState({
        username:'',
        password:''
    });
    const [data, setData]= useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        getdata();

    },[data]);
    const getdata = async () =>{
        try{
            const res = await axios.get('http://localhost:8081/get-all');
            setData(res.data);
        }catch (e) {
            console.log(e);
        }
    };

    const OnInputChange = (e) =>{
        setFormData({...formdata,[e.target.name]:e.target.value})
    };

    const handleSubmit =(e)=>{
        console.log("formdata", formdata);
        const filteredData = data.some((item)=> item.username === formdata.username);
        console.log(filteredData);
        e.preventDefault();
        console.log("login");
        {filteredData? navigate("/dashboard"):alert("please enter correct credintials")}

    };
    return (
        <div>
            <div className="App"  style={{width:"500px",margin:'auto'}}>
                <form >
                    <h2>Login</h2>
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
            <i className="fa fa-lock" />
          </span>
                            </div>
                            <input type="text" className="form-control" value={formdata.password} name="password" placeholder="Password" onChange={OnInputChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg" onClick={(id)=>handleSubmit(id)}>Login</button>

                    </div>
                </form>
        </div>
        </div>
    );
};

export default Login;
