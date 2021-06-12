import jwt from 'jsonwebtoken'
import user from '../components/user/model.js'
import logger from './logger.js'


export default class Middleware{
  
  //end point for senting response
  response(res,status,message){
    res.setHeader("content-type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(status).send(message)
  }

  //verifying the token
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token']; //get token from uthe request header
    if(!token) {
      logger.info('Token is not provided')
      res.setHeader("content-type", "application/json")
      return res.status(401).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET); //token from user send here
      
      const rows  = await user.findAll({
        where:{id:  decoded.userId}
        
      }) 
      // console.log(rows)
      
      if(!rows[0]) {
        logger.info('invalid token');
        res.setHeader("content-type", "application/json")
        return res.status(401).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = rows[0];
      // console.log(rows[0])
      next();
    } catch(error) {
      logger.error(error)
      res.setHeader("content-type", "application/json")
      return res.status(401).send({"message":"Access Denied"});
    }
  }

  }