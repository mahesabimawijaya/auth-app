"use client";

import { createData } from "@/lib/api";
import { useAuth } from "@/store/AuthContext";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function Login() {
  const [errMsg, setErrMsg] = useState<string>("");
  const auth = useAuth();
  const user = auth.user.data;
  const isMembership = auth.user.data?.membership;
  const isLoginMembership = auth.user.isMembership;
  const isAuthenticated = auth.user.isAuthenticated;
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  useEffect(() => {}, [errMsg]);

  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const login = await createData(
        "/user/login",
        {
          email: values.email,
          password: values.password,
        },
        "application/json"
      );
      if (login.status === 200) {
        console.log(login.data);
        alert("Login Success");
        window.location.href = "/";
      } else {
        setErrMsg(login.data.message);
        setSubmitting(false);
      }
    },
  });

  if (!isAuthenticated || isLoginMembership || !isMembership) return <div className="flex justify-center w-full h-screen items-center">401 | Unauthorized</div>;
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-sm h-auto flex flex-col border border-slate-300 shadow-md rounded-md py-8 px-10">
        <div className="text-xl font-semibold font-sans text-center mb-8">Membership Login</div>
        <div id=""></div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input type="text" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="w-full border px-3 py-2 rounded" />
          {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-sm">{formik.errors.email}</div> : null}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-1">
            Password
          </label>
          <input type="password" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="w-full border px-3 py-2 rounded" />
          {formik.touched.password && formik.errors.password ? <div className="text-red-500 text-sm">{formik.errors.password}</div> : null}
          <div className="text-red-500 text-sm">{errMsg}</div>
        </div>
        <div>
          <button type="submit" className="bg-blue-600 border text-white px-4 py-2 w-full hover:text-blue-600 hover:bg-white border-blue-600 rounded duration-200">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
