module.exports = options =>async (req, res, next) => {
    //需要加req.Model:在请求上挂载属性Model
    req.Model = require(`../models/${req.params.resouce}`)
    next()
}