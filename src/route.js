import React from 'react';
import {  Routes, Route } from "react-router-dom";
import Signup from "./form";
import Login from "./loginForm";
import Dashboard from "./dashboard";


const Routess = () => {
    return (
            <Routes>
                <Route path="/" element={<Signup />}/>
                    <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="*" element={<Signup />} />

            </Routes>
    );
};

export default Routess;
