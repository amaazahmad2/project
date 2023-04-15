import "dotenv/config";
import mongoose from "mongoose";
import env from "./utils/validateEnv";
import server from "./app";

const port = env.PORT;

mongoose
    .connect(env.MONGO_CONNECTION_STRING!)
    .then(() => {
        console.log("MONGOOSE CONNECTED");

        server.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
    .catch(console.error);
