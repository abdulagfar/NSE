import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class JWT{
   hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8)) //return hashd passowd
  }

    comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword); //compare password and hashd password and return true or false
  }

    isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email); 
  }

     generateToken(uid) {  //jwt sign in genearte token 
    const token = jwt.sign({
      userId: uid
    },
      process.env.SECRET, { expiresIn: '2d' }
    );
    return token;
  }

}
  
const jwtc=new JWT()
export default jwtc



