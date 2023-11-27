import React, { useState } from "react";
import "./style/Register.css"; // Updated CSS file path
import { useLocation, useNavigate } from "react-router-dom";
import CustomAlert from "../../services/CustomAlert";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useAuth } from './AuthContext';
import Loading from './Loading'

export default function AuthRegister() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    const { loginUser } = useAuth();
    const [loading, setLoading] = useState(false);


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
        const { password, dob, organization, course, phone } = formData;
        setLoading(true);


        if (!password || !dob || !organization || !course || !phone) {
            setAlertMessage("Please fill out all the fields.");
            setShowAlert(true);
            return;
        }

        axios
            .post(`https://coursecrafterai.onrender.com/user/authregistration`, {
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
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const redirectToRegister = () => {
        navigate('/registration');
    };

    return (
        <div className='custom-login-background'>

            <div className="custom-container mt-5 custom-regis">
                <div className='custom-navbare'>
                    <h2 className='custom-navh2'>CourseCrafter AI</h2>
                </div>
                <div className="custom-row justify-content-center">
                    <div className="custom-col-md-6 p-4 rounded custom-register-container">
                        <h2 className="custom-text-center mb-4 custom-heading-nav">
                            Email Successfully Verified! Please Fill the Remaining Details
                        </h2>
                        <div className="custom-mb-3">
                            {/* <label htmlFor="fname" className="custom-form-label">
                            First Name:
                        </label> */}
                            <input
                                type="text"
                                id="fname"
                                name="fname"
                                className="custom-form-input"
                                value={fname}
                                readOnly
                            />
                        </div>
                        <div className="custom-mb-3">
                            {/* <label htmlFor="lname" className="custom-form-label">
                            Last Name:
                        </label> */}
                            <input
                                type="text"
                                id="lname"
                                name="lname"
                                className="custom-form-input"
                                value={lname}
                                readOnly
                            />
                        </div>
                        <div className="custom-mb-3">
                            {/* <label htmlFor="email" className="custom-form-label">
                            Email:
                        </label> */}
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="custom-form-input"
                                value={email}
                                readOnly
                            />
                        </div>
                        <div className="custom-mb-3">
                            {/* <label htmlFor="password" className="custom-form-label">
                            Set Password:
                        </label> */}
                            <input
                                placeholder="Set Password"
                                type="password"
                                id="password"
                                name="password"
                                className="custom-form-input"
                                value={formData.password}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </div>

                        <div className="custom-mb-3">
                            <label htmlFor="phone" className="custom-form-label">
                                Phone Number:
                            </label>
                            <PhoneInput
                                international
                                defaultCountry="IN"
                                value={formData.phone}
                                onChange={(value) => handleChange("phone", value)}
                            />
                        </div>
                        <div className="custom-mb-3">
                            <label htmlFor="dob" className="custom-form-label">
                                Date of Birth:
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                className="custom-form-input"
                                value={formData.dob}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </div>

                        <div className="geneder-select">
                            <label htmlFor="gender" className="custom-form-label">
                                Gender:
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                className="custom-form-select"
                                value={formData.gender}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="custom-mb-3">
                            {/* <label htmlFor="organization" className="custom-form-label">
                            Organization:
                        </label> */}
                            <input
                                placeholder="Enter Organization Name"
                                type="text"
                                id="organization"
                                name="organization"
                                className="custom-form-input"
                                value={formData.organization}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </div>
                        <div className="custom-mb-3">
                            {/* <label htmlFor="course" className="custom-form-label">
                            Current Course:
                        </label> */}
                            <input
                                placeholder="Enter Current Course"
                                type="text"
                                id="course"
                                name="course"
                                className="custom-form-input"
                                value={formData.course}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </div>

                        <div className="custom-mb-3 d-flex justify-content-between">
                            <button className="custom-secondary-button" onClick={redirectToRegister}>
                                Go Back
                            </button>
                            <button className='custom-primary-button' onClick={handleRegistration}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                {loading && <Loading />}
                {showAlert && (
                    <CustomAlert
                        message={alertMessage}
                        onClose={() => setShowAlert(false)}
                    />
                )}
            </div>
        </div>
    );
}
