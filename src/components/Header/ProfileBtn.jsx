import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import LogoutBtn from './LogoutBtn';
import Account from './Account';

function ProfileBtn({ userData }) {
    console.log("user data lolol", userData);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    

    return (
        <div className="relative inline-block">
            <button
                onClick={toggleDropdown}
                className="text-center inline-flex items-center px-6 py-2 duration-200"
                type="button"
            >
                {userData?.fullName || 'Profile'}
                {isDropdownOpen ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
            </button>

            {isDropdownOpen && (
                <div className="absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow min-w-[100px] dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                            <span className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <Account />
                            </span>
                        </li>
                        <li>
                            <span className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <LogoutBtn  />
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ProfileBtn;
