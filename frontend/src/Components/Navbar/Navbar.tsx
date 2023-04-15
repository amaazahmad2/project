import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const isLoggedIn = localStorage.getItem("token");
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("login");
    };
    return (
        <>
            <div className={styles.linkContainer}>
                {isLoggedIn ? (
                    <>
                        <Link className={styles.navLink} to="/">
                            Home
                        </Link>
                        <p
                            style={{ padding: 0, margin: 0 }}
                            onClick={logoutHandler}
                            className={styles.navLink}
                        >
                            Signout
                        </p>
                    </>
                ) : (
                    <>
                        <Link className={styles.navLink} to="login">
                            Login
                        </Link>
                        <Link className={styles.navLink} to="signup">
                            Signup
                        </Link>
                    </>
                )}
            </div>
            <Outlet />
        </>
    );
};

export default Navbar;
