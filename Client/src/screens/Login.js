import React,{useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { Base_URL } from '../helper';
// require('dotenv').config();
// const Base_URL = process.env.REACT_APP_BASE_URL;

export default function Login() {

  const navigate = useNavigate()

  const [credentials, setcredentials] = useState({
    // default values
    email:"",
    password:""
  })


  const handleChange = (event) =>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch(`${Base_URL}/api/loginuser`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password:credentials.password})
    }) 
    
    const json = await response.json()
    console.log(json)

    if(!json.success){
      alert("Invalid Credentials")
    }

    if(json.success){
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }
  }


  return (
    <>
    <div className="container border border-success w-25 h-auto bg-light" style={{"margin-top": '100px'}}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h4 className=" mt-4 mb-5 text-success">LOGIN</h4>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className=" m-3 btn btn-success">
          Submit
        </button>
        <Link to="/createuser" className=" m-3 btn btn-danger"> I,m a new User</Link>
      </form>
    </div>
    </>
  )
}
