import stocks from './model.js'
import logger from '../../midleware/logger.js'
import express from 'express';
import mid from '../../midleware/auth.js'
import Sequelize from 'sequelize'
import Pagination from '../../midleware/pagination.js'

const midobj=new mid()
const router = express.Router();
// ,midobj.verifyToken
router.get('/dropDown',midobj.verifyToken,dropDown);
router.get('/',midobj.verifyToken,getStock);


async function dropDown(req,res){
    
    
    if (!req.query.keyword) {
      logger.info('Invalid argument')
      return midobj.response(res,400,{'message': 'Invalid argument'});
    }
    
    try {
        const rows=await stocks.findAll({
            attributes: ['id','name'],
            where:{name: {[Sequelize.Op.iLike]: '%'+req.query.keyword+'%' }}
            
          })

          return midobj.response(res,200,rows);
    
     

        
    } catch (error) {
        logger.error(error)
        return midobj.response(res,400,{ 'message': "Request cannot be processed now"});

        
    }
}
async function getStock(req,res){

    let rows=[]


      
      try {
        if (req.query.keyword) {
           rows=await stocks.findAll({
                where:{name: {[Sequelize.Op.iLike]: '%'+req.query.keyword+'%' }}
                
              })
           
          }
          else if (req.query.id) {
          rows=await stocks.findAll({
                where:{id:  req.query.id }
                
              })
          }
          else {
            rows=await stocks.findAll()
          }

          const pagination={
              'page':req.query?.page||0,
              'size':req.query?.size||0,
              'order':req.query?.order||"",
              'sort':req.query?.sort||""
          }
          rows=Pagination(JSON.parse(JSON.stringify(rows)),pagination)
      
            return midobj.response(res,200,rows);
      
       
  
          
      } catch (error) {
          logger.error(error)
          return midobj.response(res,400,{ 'message': "Request cannot be processed now"});
}
}

export default router



