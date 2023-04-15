import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        wins: { type: Number, default: 0 },
        points: { type: Number, default: 0 },
    },
    { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
