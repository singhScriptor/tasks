const Sequelize = require('sequelize')


const sequelize = new Sequelize(
    'practisedb',
    'root',
    'Supra@A90',
    {
        host:'localhost',
        dialect:'mysql'
    }
);

(
    async()=>{
        try{
            await sequelize.authenticate()
            console.log('connection created')
        }
        catch(err){
            console.error(err.message)
        }
    }
)()
module.exports = sequelize