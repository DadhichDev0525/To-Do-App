import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store";
import { Link, useNavigate } from "react-router-dom";
import Panel from "./Panel";
import Input from "./Input";
import Button from "./Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error} = useSelector(state=>state.auth)
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(user));
    navigate('/login')
  };
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <Panel className="min-w-2xs md:p-10 p-3">
        <form onSubmit={handleSubmit} className="md:space-y-5">
        <h1 className="w-full text-center font-semibold text-3xl md:mb-8 mb-3">
          Register
        </h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
          <div className="flex flex-col sm:flex-row gap-x-5">
            <Input
              type="text"
              name="firstname"
              value={user.firstName}
              label="FirstName"
              onChange={handleChange}
              placeholder="Enter your firstname"
              required
            />
            <Input
              type="text"
              name="lastname"
              value={user.lastName}
              label="LastName"
              onChange={handleChange}
              placeholder="Enter your lastname"
              required
            />
          </div>
          <Input
            type="email"
            name="email"
            value={user.email}
            label="Email"
            onChange={handleChange}
            placeholder="Enter your email"
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
              value={user.password || ''}
              onChange={(e) => handleChange("password", e.target.value)}
              minLength={8}
              placeholder="Create your Password"
              className="p-3 w-full outline-0"
              required
            />
            <div className="cursor-pointer" onClick={() => setShow(!show)}>
              {show ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
          <p className="text-gray-500 w-full text-end">
            Password must be atleast 8 characters
          </p>
          <Button className="rounded w-full cursor-pointer hover:text-black transition-all duration-300 bg-zinc-900 font-semibold  mt-10 hover:bg-gray-200 ">
            Register
          </Button>
        </form>
        <div className="mt-5 border-t border-gray-500 p-2 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link
            to="/login"
            className="text-neutral-300 font-bold underline underline-offset-2 "
          >
            Login
          </Link>
        </div>
      </Panel>
    </div>
  );
};

export default Signup;
