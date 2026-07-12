const expense = require('./expense')
const user = require('./users')


//one to many relation
user.hasMany(expense,{foreignKey:'userId'})
expense.belongsTo(user,{foreignKey:'userId'})

module.exports = {
    user,
    expense
}
