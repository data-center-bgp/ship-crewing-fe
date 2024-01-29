import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import * as yup from "yup";
import Cookies from 'js-cookie';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schema.validate({ email, password });

      const response = await axios.post("http://localhost:4000/vessel/auth/login", {
        email: email,
        password: password,
      });

      console.log(response.data);
      Cookies.set('token', response.data.access_token);
      Cookies.set('role', response.data.role);
      Cookies.set('userType', response.data.userType);
    } catch (error) {
      console.log('Error:', error);
    }

  }

  return (
    <>
      <Card color="transparent" shadow={false} placeholder={""}>
        <Typography placeholder={"Login"} variant="h2" color="white">
          Selamat datang di Crewing Center
        </Typography>
        <Typography placeholder={""} variant="h6" color="white">
          Silahkan masukkan email kapal dan password yang diberikan oleh
          manajemen.
          <br />
          Apabila lupa/belum ada akun kapal, silahkan hubungi tim crewing.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography placeholder={"Email Kapal"} variant="h6" color="white">
              Email Kapal
            </Typography>
            <Input
              size="lg"
              placeholder="Masukkan email kapal..."
              className=" !border-t-white focus:!border-t-gray-200 text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
              value-={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography placeholder={"Email Kapal"} variant="h6" color="white">
              Password
            </Typography>
            <Input
              size="lg"
              type="password"
              placeholder="Masukkan password akun kapal..."
              className=" !border-t-white focus:!border-t-gray-200 text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button
              variant="gradient"
              size="md"
              color="white"
              placeholder={""}
              className="mt-6"
              fullWidth
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Login;