import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant/contant';
import { HypnosisLoader } from './loaders/HypnosisLoader';
const Signup = (props) => {
    const [loading, setLoading] = useState(false);
    const API_URL = BASE_URL;
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const { name, email, password, cpassword } = credentials;
        try {
            if (password === cpassword) {
                const response = await fetch(`${API_URL}/auth/createuser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });
                const json = await response.json();
                if (json.success) {
                    navigate("/login");
                    props.showAlert("Account Created Successfully", "success");
                }
                else {
                    props.showAlert("Invalid Credentials", "danger");
                }
            }
            else {
                props.showAlert("Invalid Credentials", "danger");
            }
        } catch (error) {
            console.log(error);
            props.showAlert("Internal Server Error", "danger");
        }
        setLoading(false);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-4">
            <h2 className='my-4'>Create an account to Continue to Notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">{loading ? <HypnosisLoader /> : "Submit"}</button>
            </form>
        </div>
    )
}

export default Signup;