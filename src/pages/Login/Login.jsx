import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios"; // Ensure axios is imported
import { loginData, validateLogin } from "../../utils/validation";
import Button from "../../components/UI/Button/Button";
import { Input } from "../../components/UI/Input/Input";
import { toast } from "react-toastify";

export default function Login({ title, props }) {
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    validateLogin({ ...form, [name]: value }, setError); // Validate the form with updated values
  };
  const handlePost = async (data) => {
    const formLogin = loginData(data);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        formLogin
      );
      if (res.status === 200) {
        const { token } = res.data;

        if (token) {
          localStorage.setItem("token", token); // Store the token in localStorage
          console.log("Token successfully saved:", token);
          toast.success("Berhasil melakukan login", {
            delay: 800,
          });
          navigate("/dashboard"); // Navigate to the dashboard
        }
      }
    } catch (error) {
      toast.error("Email atau password tidak valid", { delay: 300 });
      console.error("Failed to log in, please enter valid data", error);
    }
  };

  useEffect(() => {
    if (props && props.nextPage) {
      const timerId = setTimeout(() => navigate(props.nextPage), 300);
      return () => clearTimeout(timerId);
    }
  }, [navigate, props]);

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission
              handlePost(form);
            }}
          >
            <div className="form-floating mb-3">
              <Input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleInput}
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3">
              <Input
                type="password"
                className="form-control"
                name="password"
                id="floatingPassword"
                placeholder="Password"
                value={form.password}
                onChange={handleInput}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <Button className="w-100 btn btn-lg btn-primary" type="submit">
              Login
            </Button>

            <hr className="my-4" />
            <small className="text-body-secondary">
              By clicking Sign up, you agree to the terms of use.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}
