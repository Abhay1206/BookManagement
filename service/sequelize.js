import { Sequelize } from "sequelize";


const sequelize = new Sequelize('db_name', 'root', 'pass', {
    host: 'localhost',
    dialect: "mysql"
  });


  sequelize.authenticate().then(()=>{
    console.log("Db is successfully connected")
  }).catch((err)=>{
    console.log("Error while connectig to db")
  })
  export default sequelize