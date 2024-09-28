import React, { useState } from 'react';
import ROLE from '../common/role';  // Role constants
import { X } from 'lucide-react';  // Icon for close button
import SummaryApi from '../common/index';  // API URLs and methods
import { toast } from 'react-toastify';  // Notifications

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole,setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)

        console.log(e.target.value)
    }

    const updateUserRole = async() =>{
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("role updated",responseData)

    }
    
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-75 bg-black z-50">
            <div className="bg-white shadow-lg p-6 max-w-lg w-full relative">
                <button className="absolute top-4 right-4" onClick={onClose}>
                    <X size={24} className="text-black hover:text-gray-600 transition duration-150" />
                </button>
                <h1 className="text-2xl font-bold mb-6 text-center text-black">Change User Role</h1>
                <div className="mb-4">
                    <p className="text-lg text-gray-600">Name: <span className="text-black font-medium">{name}</span></p>
                    <p className="text-lg text-gray-600">Email: <span className="text-black font-medium">{email}</span></p>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <p className="text-lg text-black">Role:</p>
                    <select
                        className="border-b border-black text-black bg-transparent focus:outline-none focus:border-gray-400 px-4 py-2 text-lg"
                        value={userRole}
                        onChange={handleOnChangeSelect}
                    >
                        {Object.values(ROLE).map(el => (
                            <option key={el} value={el}>{el}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={updateUserRole}
                    className="w-full py-3 mt-4 bg-black text-white font-semibold uppercase hover:bg-gray-900 transition duration-150"
                >
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
