const express = require('express')
const router = express.Router()
let members = require('../../Members')
const loggerMiddleware = require('../../middlewares/logger')
const uuid = require('uuid')

//MIDDLEWARES
// init middleware
router.use(loggerMiddleware)

//ROUTES

//GETTING ALL MEMBERS
router.get('/', (req, res) => {
    res.json(members)
})

//GETTING A SINGLE MEMBER
router.get('/:id', (req, res) => {

    const found = members.some(member => member.id === parseInt(req.params.id))
    //returns true or false

    if (found) {
        res.json(members.filter((x) => (x.id === parseInt(req.params.id))))
    } else {
        res.status(400).json({
            msg: `User not found. Id ${req.params.id} does not exist.`
        })
    }
})


//CREATING A MEMBER
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        mail: req.body.mail,
        age: req.body.age
    }
    if (!newMember.name || !newMember.mail) {
        return res.status(400).json({
            msg: 'Please include a name and an email'
        })
    }
    const repeated = members.some(member => member.mail == newMember.mail);
    console.log(`Repeated mail: ${repeated}`)

    if (!repeated) {
        members.push(newMember)
        // res.json(members) //  if I want to use the API
        res.redirect('/') // if I want to use the template
    } else {
        res.json({
            msg: "User already exists | Repeated mail"
        })
    }

})


//UPDATING A MEMBER
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id == req.params.id)
    console.log(`Found? ${found}`)
    if (found) {
        members.forEach(
            member => {
                if (member.id == req.params.id) {
                    member.name = req.body.name ? req.body.name : member.name
                    member.mail = req.body.mail ? req.body.mail : member.mail
                    res.json({
                        msg: "Member updated.",
                        member
                    })
                }
            }
        )
    } else {
        res.status(400).json({
            msg: `${req.params.id} Id not found`
        })
    }
})


//DELETING A MEMBER
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id == req.params.id)
    console.log(`Found? ${found}`)

    if (found) {
        members = members.filter(x => (x.id != req.params.id))

        res.json({
            msg: 'Member deleted.',
            members
        })

    } else {
        res.status(400).json({
            msg: 'Id not found. User not deleted'
        })
    }
})

//export

module.exports = router