const {Router} = require('express')
const Link = require("../models/Link");
const redirectRouter = Router();

redirectRouter.get('/:code', async (req,res,next)=>{
    try {
        const link = await Link.findOne({code: req.params.code})

        if(link) {
            link.clicks++
            await link.save();
            return res.redirect(link.from)
        }

        res.status(404).json('link is not found')
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

module.exports = redirectRouter