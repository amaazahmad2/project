import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { signup } from "../../Utils/api/auth";
import { IUser } from "../../Utils/constants/interfaces";
import styles from "./signup.module.css";

const Signup = () => {
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        //REFERENCE: ChatGPT
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                "Password must contain at least one uppercase letter and one number"
            ),
    });

    const submitHandler = (values: IUser) => {
        signup(values.username, values.password)
            .then((resp) => {
                if (resp.status === 200) {
                    alert("User Registered. Please log-in.");
                    navigate("/login");
                } else {
                    alert(resp.data.message);
                }
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Signup</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
            >
                <Form>
                    <div className={styles.fieldContainer}>
                        <Field
                            placeholder="Username"
                            name="username"
                            id="username"
                            type="text"
                            className={styles.field}
                        />
                        <ErrorMessage name="email">
                            {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                    <div className={styles.fieldContainer}>
                        <Field
                            placeholder="Password"
                            name="password"
                            id="password"
                            type="password"
                            className={styles.field}
                        />
                        <ErrorMessage name="password">
                            {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                    <div className={styles.fieldContainer}>
                        <button className={styles.submitButton} type="submit">
                            Signup
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default Signup;
