import * as bcrypt from "bcrypt";

const encryptPassword = (password: string, slats = 12): Promise<string> => {
    return bcrypt.hash(password as string, slats);
};

const comparePassword = (
    password: string,
    password2: string
): Promise<boolean> => {
    return bcrypt.compare(password, password2);
};

export { encryptPassword, comparePassword };
