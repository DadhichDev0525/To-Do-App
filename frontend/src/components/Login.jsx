import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthError } from "../store";
import { Link } from "react-router-dom";
import Panel from "./Panel";
import Input from "./Input";
import Button from "./Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const dispatch = useDispatch()
  const {error} = useSelector(state=> state.auth)
  const [credentials, setCredentials] = useState({});
  const [show,setShow] =useState(false)

  useEffect(()=>{
    dispatch(clearAuthError())
  },[dispatch])

  const handleChange = (name,value) => {
    setCredentials({
      ...credentials,
      [name]:value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials))
  };
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <Panel className="md:min-w-md md:p-10 p-3">
        <form onSubmit={handleSubmit} className="space-y-5">
        <h1 className="w-full text-center font-semibold text-3xl">Login</h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
          <Input
            type="email"
            name="email"
            value={credentials.email || ''}
            label="UserName"
            onChange={handleChange}
            placeholder="Type your Email"
            required
          />
          <label htmlFor="password" className=" font-medium text-lg">
            Password
          </label>
          <div className="pr-3 my-2 border rounded w-full flex items-center">
            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
              value={credentials.password || ''}
              onChange={(e)=>handleChange('password',e.target.value)}
              placeholder="Enter your Password"
              className="p-1 sm:p-3 w-full outline-0"
              required
            />
            <div className="cursor-pointer" onClick={() => setShow(!show)}>
              {show ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
          <Button className="rounded w-full cursor-pointer hover:text-black transition-all duration-300 bg-zinc-900 font-semibold  mt-10 hover:bg-gray-200 ">
            Login
          </Button>
        </form>
        <div className="mt-5 border-t border-gray-500 p-2 text-center">
          <p className="text-gray-600">Need to create an account?</p>
          <Link
            to="/signup"
            className="text-neutral-300 font-bold underline underline-offset-2 "
          >
            Sign Up
          </Link>
        </div>
      </Panel>
    </div>
  );
};

export default Login;
