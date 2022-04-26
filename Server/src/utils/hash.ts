import bcrypt from "bcrypt";

const generateHash = (password: string) => {
    const saltRounds: number = Number(process.env.SALT_ROUNDS);
    const salt: string = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

export default generateHash;