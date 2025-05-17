import React, { useState } from "react";
import CommonForm from "../../../helpers/utils/CommonForm";
import { loginUser } from "../../../store/auth-slice/Authslice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loginFormControls } from "../../../config";
import { RootState } from "../../../store/store";

// interface FormData {
//   email: string;
//   password: string;
//   terms: boolean;
//   [key: string]: string | boolean;
// }

const initialState: Record<string, string | boolean> = {
  email: "",
  password: "",
};


const Login: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string | boolean>>(initialState);
    const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.auth.isloading);

  const handleLogin = () => {  
    const loginPayload = {
      email: formData.email as string,
      password: formData.password as string,
    };
  
    dispatch(loginUser(loginPayload))
      .unwrap()
      .then((data) => {
        console.log("Login successful:", data);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-auto">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Sign In
        </h2>
        <CommonForm
          formControls={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleLogin}
          buttonText={!isLoading ? "Signing In..." : "Sign In"}
          // isBtnDisabled={!isLoading}
        />
      </div>
    </div>
  );
};


export default Login;