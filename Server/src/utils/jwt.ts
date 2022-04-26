import jwt from 'jsonwebtoken';

const generateToken = (username: string) =>{
    return jwt.sign( {username}, process.env.SECRET as jwt.Secret, {
        expiresIn: '10d'
    }) 
}

export default generateToken;