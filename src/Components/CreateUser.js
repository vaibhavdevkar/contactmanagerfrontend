import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            firstName,
            lastName,
            gender,
            address: {
                line1: addressLine1,
                line2: addressLine2,
                city,
                country,
                zipCode
            },
            email,
            phone
        };

        try {
            const response = await axios.post('http://localhost:5000/api/users', formData);
            console.log('User created:', response.data);
            // Handle success response here
            // For example, display a success message to the user
            toast.success(' Users Added successfully');
            resetForm();

        } catch (error) {
            console.error('Error creating user:', error.message);
            // Handle error here
            // For example, display an error message to the user
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setGender('');
        setAddressLine1('');
        setAddressLine2('');
        setCity('');
        setCountry('');
        setZipCode('');
        setEmail('');
        setPhone('');
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <h2 className='text-center mb-4'>Add Contact Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        pattern="[A-Za-z]+"
                                        minLength="3"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input type="text" id="lastName" name="lastName" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} pattern="[A-Za-z]+"
                                        minLength="3"
                                        required />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="gender">Gender:</label>
                                    <select id="gender" name="gender" className="form-control" value={gender} onChange={e => setGender(e.target.value)}>
                                        <option value="">Select Gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHERS">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone:</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="form-control"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        pattern="[0-9]*"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="addressLine1">Address Line 1:</label>
                                    <input
                                        type="text"
                                        id="addressLine1"
                                        name="addressLine1"
                                        className="form-control"
                                        value={addressLine1}
                                        onChange={e => setAddressLine1(e.target.value)}
                                        pattern="[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~\|\-]{8,}"
                                        minLength="8"
                                        required
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="addressLine2">Address Line 2:</label>
                                    <input type="text" id="addressLine2" name="addressLine2" className="form-control" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="city">City:</label>
                                    <input type="text" id="city" name="city" className="form-control" value={city} onChange={e => setCity(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="country">Country:</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        className="form-control"
                                        value={country}
                                        onChange={e => setCountry(e.target.value.toUpperCase())}
                                        required
                                    />                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="zipCode">Zip Code:</label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        className="form-control"
                                        value={zipCode}
                                        onChange={e => setZipCode(e.target.value)}
                                        required
                                        maxlength="10"
                                    />                                </div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary m-2">Submit</button>
                            <NavLink to='/' className="btn btn-secondary m-2">
                                Show Contact Details
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default CreateUser;