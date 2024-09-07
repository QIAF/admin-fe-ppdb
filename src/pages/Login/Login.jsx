import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { loginData, validateLogin } from "../../utils/validation";
import Button from "../../components/UI/Button/Button";
import { Input } from "../../components/UI/Input/Input";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function Login({ title, props }) {
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_number: "",
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
    console.log(formLogin);
    try {
      const res = await axios.post(
        "https://be-ppdb-online-update.vercel.app/api/v1/auth/login",
        formLogin
      );

      if (res.status === 200) {
        const token = res.data.token;
        const decoded = jwtDecode(token);
        console.log("decode", decoded);

        if (decoded && decoded.user_role === "admin") {
          // Simpan token di cookie
          Cookies.set("token", token, { expires: 7, path: "/" });
          console.log("Token successfully saved in cookie:", token);

          toast.success("Berhasil melakukan login", {
            delay: 800,
          });
          navigate("/dashboard");
        } else {
          toast.error("Akses hanya untuk admin", { delay: 300 });
          console.error("Access denied: user is not an admin");
        }
      }
    } catch (error) {
      toast.error("user_number atau password tidak valid", { delay: 300 });
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
                type="text"
                className="form-control"
                name="user_number"
                id="user_number"
                placeholder="name@example.com"
                value={form.user_number}
                onChange={handleInput}
              />
              <label htmlFor="floatingInput">Username admin</label>
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
          </form>
        </div>
      </div>
    </div>
  );
}
