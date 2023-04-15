import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/jwtUtils";

/**
 * middleware to check whether user is logged in or not
 *
 */
export const authMiddleware =
    () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            let jwt = req.headers.authorization;

            // verify request has token
            if (!jwt) {
                return res.status(401).json({ message: "Invalid token " });
            }

            // remove Bearer if using Bearer Authorization mechanism
            if (jwt.toLowerCase().startsWith("bearer")) {
                jwt = jwt.slice("bearer".length).trim();
            }

            // verify token hasn't expired yet
            const decodedToken = validateToken(jwt);
            //@ts-ignore
            req.user = decodedToken;
            next();
        } catch (error) {
            if (error instanceof Error && error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Expired Token" });
            }
            return res
                .status(500)
                .json({ message: "Failed to authenticate user" });
        }
    };
