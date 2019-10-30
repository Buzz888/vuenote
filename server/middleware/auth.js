
module.exports = options => async (req, res, next) => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const adminuser = require('../models/adminuser')
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, 'token不存在')
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, 'id不存在')
    req.user = await adminuser.findById(id)
    assert(req.user, 401, '请先登陆')
    //console.log(req.user)
    await next()
}