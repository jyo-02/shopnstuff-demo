import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../connectServer/auth';
import { logout } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
            toast.success("Logged Out Successfully");
            navigate('/');
        }).catch((error) => {
            toast.error(error.message);
        });
    };

    return (
        <button
            className='px-6 py-2 duration-200 text-black flex items-center' 
            onClick={logoutHandler}
        >
            <FiLogOut className="mr-1" />
            Logout
        </button>
    );
}

export default LogoutBtn;
