import jwt from 'jsonwebtoken';

const generateToken = (id: string) =>{
    return jwt.sign( {id}, 'secretHarcoded', {
        expiresIn: '10d'
    }) 
}

export default generateToken;