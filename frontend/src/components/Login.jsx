import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store";
import { Link,useNavigate } from "react-router-dom";
import Panel from "./Panel";
import Input from "./Input";
import Button from "./Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({});
  const [show,setShow] =useState(false)

  const handleChange = (name,value) => {
    setCredentials({
      ...credentials,
      [name]:value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials))
    navigate('/')
  };
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <Panel className="md:min-w-md md:p-10 p-3">
        <h1 className="w-full text-center font-semibold text-3xl">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            name="email"
            value={credentials.username}
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
              className="p-3 w-full outline-0"
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
