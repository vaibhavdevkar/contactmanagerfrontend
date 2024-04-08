import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editUser, setEditUser] = useState(null); // State to hold the user being edited
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/alldata');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      // Handle error here
      // For example, display an error message to the user
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
        // After deleting, fetch data again to update the table
        fetchData();
      // Show success toast
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.message);
      // Show error toast
      toast.error('Failed to delete user');
      // Handle error here
      // For example, display an error message to the user
    }
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedUsers(userData.map(user => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleEdit = (userId) => {
    // Set the user ID to editUser state
    setEditUser(userId);
  };

  const deleteMultipleUsers = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/users', { data: { ids: selectedUsers } });
      if (response.data.success) {
        // Deletion successful, handle any UI updates
        fetchData(); // Refresh data after successful deletion
        setSelectedUsers([]); // Clear selected users
        // Show success toast
        toast.success('Multiple users deleted successfully');
      } else {
        console.error('Error deleting multiple users:', response.data.error);
        // Show error toast
        toast.error('Failed to delete multiple users');
        // Handle deletion failure, if necessary
      }
    } catch (error) {
      console.error('Error deleting multiple users:', error.message);
      // Show error toast
      toast.error('Failed to delete multiple users');
      // Handle error, if necessary
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <div className='mt-3 btn btn-outlined primery'>
        <NavLink to='/addUser' style={{ textDecoration: "none" }}>
          +Add User
        </NavLink>
      </div>
      <h2>User Data</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleCheckboxChange(user._id)}
                />
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address ? `${user.address.line1}, ${user.address.line2},${user.address.city}, ${user.address.country}, ${user.address.zipCode}` : ''}</td>
              <td>
                <button className="btn btn-success btn-sm mr-2" >
                  <NavLink to={`/updateuser/${user._id}`} style={{color: "white" , textDecoration : "none"}}>Edit</NavLink>
                </button>
                <button className="btn btn-danger btn-sm mr-2" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="btn btn-danger mr-2 mb-3" onClick={deleteMultipleUsers}>Delete Selected</button>
        <ul className="pagination">
          {Array.from({length: Math.ceil(userData.length / usersPerPage)}, (_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer position="bottom-right" />
    </div >
  );
};

export default UserData;