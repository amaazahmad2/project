import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { login } from "../../Utils/api/auth";
import { IUser } from "../../Utils/constants/interfaces";

import styles from "./login.module.css";

const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const submitHandler = (values: IUser) => {
        login(values.username, values.password)
            .then((resp) => {
                console.log("RESP: ", resp);
                if (resp.status === 200) {
                    localStorage.setItem("token", resp.data.token);
                    navigate("/");
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
            <h1 className={styles.heading}>Login</h1>
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
                        <ErrorMessage name="username">
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
                            Login
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
