module.exports = app => {
    const express = require('express')
    const adminuser = require('../../models/adminuser')
    const assert = require('http-assert')
    const tokenmidle = require('../../middleware/auth')
    const resouce = require('../../middleware/resouce')
    const router = express.Router({
        mergeParams: true //合并参数让路由里面能查找到req.params.resouce
    })

    router.post('/create', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.get('/' ,async (req, res) => {

        const model = await req.Model.find().populate('parent')
        res.send(model)
    })
    router.get('/create/:id', async (req, res) => {

        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    router.put('/create/:id', async (req, res) => {

        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    router.delete('/:id', async (req, res) => {

        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    app.use('/admin/api/rest/:resouce',tokenmidle(),resouce(), router)

    app.post('/admin/api/adminuser', async (req, res) => {
        const { password, username } = req.body
        //根据用户名找用户
        const User = await adminuser.findOne({ username }).select('+password')
        assert(User,422,'用户不存在')
        //校验密码
        const inValid = require('bcrypt').compareSync(password, User.password)
        assert(inValid,422,'密码错误')
        //返回token
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({
            id: User._id,
        }, app.get('secret'))  //签名 1添加数据2添加密钥可以生成token
        res.send({ token })
    })


    //错误处理中间件
    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode ||500 ).send({
            message:err.message
        })

    })

}