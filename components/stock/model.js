import dotenv from 'dotenv'
import sequelize from '../../midleware/db.js'
import Sequelize from 'sequelize'
dotenv.config()



const sockModel = (sequelize, Sequelize) => {
	const sock = sequelize.define('nse_stock_master', {
	 
	  name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

	  },
	  currentMarketPrice: {
            type: Sequelize.FLOAT,
            allowNull: false
      },
      marketCap: {
        type: Sequelize.FLOAT,
        allowNull: false
  }
  ,
      marketCap: {
        type: Sequelize.FLOAT,
        allowNull: false
  }
  ,
      stockPE: {
        type: Sequelize.FLOAT,
        allowNull: false
  }
  ,
  dividendYield: {
    type: Sequelize.FLOAT,
    allowNull: false
},
roce: {
    type: Sequelize.FLOAT,
    allowNull: false
},
roePreviousAnnum: {
    type: Sequelize.FLOAT,
    allowNull: false
}
,
debtToEquity: {
    type: Sequelize.FLOAT,
    allowNull: false
}

,
eps: {
    type: Sequelize.FLOAT,
    allowNull: false
}
,
reserves: {
    type: Sequelize.FLOAT,
    allowNull: false
}
,
debt: {
    type: Sequelize.FLOAT,
    allowNull: false
}
  
  
  
  
      
	});
	
	return sock;
}
const db={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.socks = sockModel(sequelize, Sequelize);

// await sequelize.sync({ force: true });
 
 
export default db.socks