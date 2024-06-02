"use client";

import { createData } from "@/lib/api";
import { useAuth } from "@/store/AuthContext";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const membershipType = ["Type A", "Type B", "Type C"];

export default function Register() {
  const [errMsg, setErrMsg] = useState<string>("");
  const auth = useAuth();
  const user = auth.user.data;
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    type: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      password: "",
      type: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const membership = await createData(
        "/user/register",
        {
          email: values.email,
          password: values.password,
          type: values.type,
          userId: user?.id,
        },
        "application/json"
      );
      if (membership.status === 201) {
        alert("membership registered succesfully");
        window.location.href = "/";
      } else {
        setErrMsg("Email already used");
      }
      setSubmitting(false);
    },
  });
  const isAuthenticated = auth.user.isAuthenticated;
  if (!isAuthenticated) return <div className="flex justify-center w-full h-screen items-center">401 | Unauthorized</div>;
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-sm h-auto flex flex-col border border-slate-300 shadow-md rounded-md py-8 px-10">
        <div className="text-xl font-semibold font-sans text-center mb-8">Membership Sign Up</div>
        <div id=""></div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input type="text" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="w-full border px-3 py-2 rounded" />
          {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-sm">{formik.errors.email}</div> : null}
          <div className="text-red-500 text-sm">{errMsg}</div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-1">
            Password
          </label>
          <input type="password" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="w-full border px-3 py-2 rounded" />
          {formik.touched.password && formik.errors.password ? <div className="text-red-500 text-sm">{formik.errors.password}</div> : null}
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-semibold text-gray-600 mb-1">
            Membership Type
          </label>
          <select id="type" name="type" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.type} className="w-full border px-3 py-2 rounded">
            <option value="" disabled>
              Select a Type
            </option>
            {membershipType.map((type: string, id) => (
              <option key={id} value={type}>
                {type}
              </option>
            ))}
          </select>
          {formik.touched.type && formik.errors.type ? <div className="text-red-500 text-sm">{formik.errors.type}</div> : null}
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
