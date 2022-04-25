import jwt from 'jsonwebtoken';

const generateToken = (username: string) =>{
    return jwt.sign( {username}, 'secretHarcoded', {
        expiresIn: '10d'
    }) 
}

export default generateToken;