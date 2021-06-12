import dotenv from 'dotenv'
import Sequelize from 'sequelize'
dotenv.config()


const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DATABASE_PASSWORD, {
    host:  process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
        ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }},
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  export default sequelize