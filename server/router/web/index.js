module.exports = app => {
    const js = require('../../models/js')
    const resouce = require('../../middleware/resouce')
    const router = require('express').Router()

    router.get('/:id', async (req, res) => {
        const parent = await req.Model.findOne({
            title: req.params.id
        })
        
        const model = await req.Model.aggregate([
            { $match: { parent: parent._id } }
        ])
        res.send(model)
    })
    router.get('/', async (req, res) => {
        const model = await req.Model.find();
        let ary = []
        let name = []
        let ary1 = []
        model.map(item => {
            // console.log(item)
            if (item.bigtitle == item.name) {
                ary.push(item.name)
            }

        })
        ary = Array.from(new Set(ary))
        ary.forEach(item => {
            model.map(item1 => {
                
                if (item === item1.name) {
                    name.push(item1.title)
                } 
                //console.log(item1)
                
            })
            obj = { title: item, name }
                ary1.push(obj)
                name=[]
              
        })
        res.send(ary1)
    })
    app.use('/web/api/:resouce', resouce(), router)
}