import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../redux/slices/userSlice";
import { useSnackbar } from "notistack";
import axios from "axios";
import Link from "next/link";
import Loading from "../components/Loading";
import Router from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    user: { user },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      Router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:5000/login`, {
        email,
        password,
      });
      setLoading(false);
      setEmail("");
      setPassword("");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      dispatch(userLogin(data.user));
      enqueueSnackbar(data.message, {
        variant: "success",
        autoHideDuration: 3000,
      });
      Router.push("/foods");
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response ? err.response.data.message : "An error occurred";
      enqueueSnackbar(errorMessage, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-6xl mx-auto min-h-[85vh] grid md:grid-cols-2">
          <div className="hidden md:flex h-full justify-center items-center">
            <img
              src="/latte.jpeg"
              className="h-[700px]"
              alt="Login Illustration"
            />
          </div>
          <div className="h-full flex justify-center items-center flex-col">
            <h1 className="text-3xl tracking-wider font-bold text-pink-100 mb-5">
              LOGIN
            </h1>
            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 font-semibold outline-none rounded-lg bg-transparent w-64 text-center placeholder:text-sm border-2 border-pink-400"
                type="email"
                placeholder="Your Email address"
                aria-label="Email address"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 font-semibold outline-none rounded-lg bg-transparent w-64 text-center placeholder:text-sm border-2 border-pink-400"
                type="password"
                placeholder="Your Password"
                aria-label="Password"
              />
              <input
                className="bg-pink-400 text-white hover:bg-pink-100 hover:text-pink-600 tracking-widest transition duration-300 ease-in-out font-bold p-3 rounded-lg cursor-pointer"
                type="submit"
                value="Login"
                aria-label="Login"
              />
            </form>
            <p className="mt-3">
              Not have an account?
              <Link href="/register">
                <a className="text-pink-500 font-semibold ml-2">Register Now</a>
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
