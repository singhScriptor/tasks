const expense = require('./expense')
const user = require('./users')

const order = require('./order')


//one to many relation
user.hasMany(expense,{foreignKey:'userId'})
expense.belongsTo(user,{foreignKey:'userId'})

//premium package tracking
user.hasMany(order,{foreignKey:'userId'})
order.belongsTo(user,{foreignKey:'userId'})

module.exports = {
    user,
    expense,
    order
}
