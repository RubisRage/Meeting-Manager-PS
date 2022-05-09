import jwt from 'jsonwebtoken';

const generateToken = (userId: string) =>{
    return jwt.sign( {userId}, process.env.SECRET as jwt.Secret, {
        expiresIn: '10d'
    }) 
}

export default generateToken;