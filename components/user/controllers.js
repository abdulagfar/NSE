import users from './model.js'
import logger from '../../midleware/logger.js'
import jwt from '../../midleware/jwtpass.js'
import express from 'express';
import mid from '../../midleware/auth.js'

const midobj=new mid()
const router = express.Router();
//create user
router.post('/',createUser);
//login
router.post('/login',login);



  // CREATE user
    async function createUser(req, res) {
        req=req.body
      if (!req.username || !req.password ) {
        logger.info('Please Enter all Mandatory fields.')
        return midobj.response(res,400,{'message': 'Please enter all mandatory fields.'});
      }

      const hashPassword = jwt.hashPassword(req.password);
      logger.info(hashPassword)
  
      users.create({
		username: req.username,
		password: hashPassword,
		
	}).then((data) => {
        logger.info(data.id)
         return midobj.response(res,200,{"message":'User created successfully -> User name = ' + req.username,"id":data.id})
		
	}).catch(err => {
		console.log(err);
        return midobj.response(res,400,{'message': err.errors[0].message});
		
	});
  
    }

    // //user login
    async function login(req, res) {
        if (!req.body.username || !req.body.password) {
          logger.info('Please Enter all Mandatory fields.')
          return midobj.response(res,400,{'message': 'Please Enter all Mandatory fields.'});
        }

       
        
        try {
            const rows=await users.findAll({
                attributes: ['id','username', 'password'],
                where: {
                  username: req.body.username
                }
              })

        //   const { rows } = await db.query('SELECT * FROM sm_user_master WHERE email = $1', [req.body.email]);
          if (!rows[0]) {
            logger.info('Invalid username or Password')
            return midobj.response(res,400,{'message': 'Invalid username or Password'});
          }
          if(!jwt.comparePassword(rows[0].password, req.body.password)) {
            logger.info('Invalid username or Password')
            return midobj.response(res,400,{ 'message': 'Invalid username or Password' });
          }
          const user=JSON.parse(JSON.stringify(rows[0]))
          console.log(user.id)
          user["token"] = jwt.generateToken(user.id);
          delete user.password
          logger.info(user)
          return midobj.response(res,200,user);
        } catch(error) {
          logger.error(error)
    return midobj.response(res,400,{ 'message': "Request cannot be processed now"});

        }
    }



export default router



