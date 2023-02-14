import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Can not create user, email already in use");
            }
            else {
                console.log("user creation encountered an error", error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="text" label="Display Name" name="displayName" value={displayName} onChange={handleChange} required />
                
                <FormInput type="email" label="Email" name="email" value={email} onChange={handleChange} required />

                <FormInput type="password" label="Password" name="password" value={password} onChange={handleChange} required />

                <FormInput type="password" label="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;