import React, { useState } from "react";
import "./style/Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomAlert from "../../services/CustomAlert";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useAuth } from './AuthContext';

// eslint-disable-next-line no-unused-vars
// import CountryFlagIcons from 'country-flag-icons';

export default function AuthRegister() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    const { loginUser } = useAuth();




    // Access data from URL parameters
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const fname = params.get("fname");
    const lname = params.get("lname");
    const email = params.get("email");

    const [formData, setFormData] = useState({
        password: "",
        dob: "",
        organization: "",
        gender: "male", // Default to male, you can change this as needed
        languages: "",
        course: "",
        phone: "",
    });
    const handleChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleRegistration = () => {
        const { password, dob, organization, course, phone } =
            formData;

        if (
            !password ||
            !dob ||
            !organization ||
            !course ||
            !phone
        ) {
            setAlertMessage("Please fill out all the fields.");
            setShowAlert(true);
            return;
        }

        axios
            .post(`https://coursecrafterai.onrender.com/authregistration`, {
                firstName: fname,
                lastName: lname,
                phone,
                email,
                password,
                dob,
                organization,
                course,
            })
            .then((response) => {
                if (
                    response.data.message ===
                    "User was registered successfully! Check your email for verification."
                ) {
                    alert("Registration Successful");
                    loginUser(response.data.userId);

                    navigate(`/dashboard`);
                } else {
                    alert("Registration Failed: " + response.data.message);
                }
            })
            .catch((error) => {
                console.error("Registration Failed:", error.message);
                setAlertMessage("Registration Failed: " + error.message);
                setShowAlert(true);
            });
    };

    const redirectToRegister = () => {
        navigate('/registration');
    };

    return (
        <div className="container mt-5 regis">
            <div className="row justify-content-center">
                <div className="col-md-6 p-4 rounded login-container">
                    <h2 className="text-center mb-4 headingnav">
                        Email Successfully Verified! Please Fill the Remaining Details
                    </h2>
                    <div className="mb-3">
                        <label htmlFor="fname" className="form-label">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            className="form-input"
                            value={fname}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lname" className="form-label">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            className="form-input"
                            value={lname}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-input"
                            value={email}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Set Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Phone Number:
                        </label>

                        <PhoneInput
                            international
                            defaultCountry="IN"
                            value={formData.phone}
                            onChange={(value) => handleChange("phone", value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">
                            Date of Birth:
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            className="form-input"
                            value={formData.dob}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                            Gender:
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            className="form-select"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="organization" className="form-label">
                            Organization:
                        </label>
                        <input
                            type="text"
                            id="organization"
                            name="organization"
                            className="form-input"
                            value={formData.organization}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="course" className="form-label">
                            Current Course:
                        </label>
                        <input
                            type="text"
                            id="course"
                            name="course"
                            className="form-input"
                            value={formData.course}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                        <button className="secondary-button " onClick={redirectToRegister}>
                            Go Back
                        </button>
                        <button className='primary-button' onClick={handleRegistration}>
                            Submit
                        </button>
                    </div>

                </div>
            </div>
            {showAlert && (
                <CustomAlert
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </div>
    );
}
