import dotenv from 'dotenv'
import sequelize from '../../midleware/db.js'
import Sequelize from 'sequelize'
dotenv.config()



const userModel = (sequelize, Sequelize) => {
	const user = sequelize.define('nse_user_master', {
	 
	  username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

	  },
	  password: {
            type: Sequelize.STRING,
            allowNull: false
	  }
	});
	
	return user;
}
const db={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = userModel(sequelize, Sequelize);

// await sequelize.sync({ force: true });
 
 
export default db.users