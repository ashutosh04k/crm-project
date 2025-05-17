import { Outlet } from "react-router-dom";

const AuthLayout = () => { 
return (
    <div className="flex min-h-screen w-full">
        <div className="hidden lg:flex items-center justify-center bg-red-500 w-1/2 h-screen">
            <img src="https://d16gdc5rm7f21b.cloudfront.net/100acre/banner/Navarathri.webp" alt="iconic img" className="w-full h-full object-cover" />

        </div>
        <div className="flex flex-1 items-centerjustify-center bg-white lg:w-1/2 w-full h-screen">
            <Outlet/>
        </div>
    </div>

);
}

export default AuthLayout;
