// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import conf from '../../conf/conf.js'; // Ensure this path is correct
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const UpdateAccount = () => {
//     const [userDetails, setUserDetails] = useState({ fullName: '', email: '' });
//     const [newPassword, setNewPassword] = useState('');
//     const [currentPassword, setCurrentPassword] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             try {
//                 const response = await axios.get(`${conf.apiUrl}/api/v1/users/current-user`, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 });
//                 setUserDetails(response.data.data); // Adjusting to access user details
//             } catch (error) {
//                 toast.error('Error fetching user details');
//             }
//         };

//         fetchCurrentUser();
//     }, []);

//     const handleUpdateAccount = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.patch(`${conf.apiUrl}/api/v1/users/update-account`, userDetails, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             });
//             toast.success('Account details updated successfully');
//         } catch (error) {
//             toast.error('Error updating account details');
//         }
//     };

//     const handleChangePassword = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`${conf.apiUrl}/api/v1/users/change-password`, { currentPassword, newPassword }, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             });
//             toast.success('Password changed successfully');
//             setCurrentPassword('');
//             setNewPassword('');
//         } catch (error) {
//             toast.error('Error changing password');
//         }
//     };

//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-3xl font-bold mb-4">Update Account Details</h1>

//             <form onSubmit={handleUpdateAccount} className="mb-6">
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Full Name</label>
//                     <input
//                         type="text"
//                         value={userDetails.fullName}
//                         onChange={(e) => setUserDetails({ ...userDetails, fullName: e.target.value })}
//                         className="mt-1 block w-full border-gray-300 rounded-md"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Email</label>
//                     <input
//                         type="email"
//                         value={userDetails.email}
//                         onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
//                         className="mt-1 block w-full border-gray-300 rounded-md"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//                     Update Details
//                 </button>
//             </form>

//             <h2 className="text-2xl font-bold mb-4">Change Password</h2>
//             <form onSubmit={handleChangePassword}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Current Password</label>
//                     <input
//                         type="password"
//                         value={currentPassword}
//                         onChange={(e) => setCurrentPassword(e.target.value)}
//                         className="mt-1 block w-full border-gray-300 rounded-md"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">New Password</label>
//                     <input
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         className="mt-1 block w-full border-gray-300 rounded-md"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//                     Change Password
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UpdateAccount;
