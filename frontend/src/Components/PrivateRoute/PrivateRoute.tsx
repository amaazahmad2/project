import React from "react";
import { Navigate } from "react-router-dom";

//REFERENCE: ChatGPT
interface PrivateRouteProps {
    isAuthenticated: boolean;
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    isAuthenticated,
    children,
}) => {
    return isAuthenticated ? (
        <React.Fragment>{children}</React.Fragment>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
