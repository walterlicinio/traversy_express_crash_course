const express = require('express')
const app = express()
const path = require('path')
const members = require('./Members')
const exphbs = require('express-handlebars')



//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// body parser middleware
app.use(express.json()) //can handle json data
app.use(express.urlencoded({
    extended: false
})) //can handle url encoded data


//Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App Area'
}))


// //Setting a static folder
// app.use(
//     express.static(
//         path.join(__dirname, 'public')
//     ))

//MEMBER API ROUTES
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening port ${PORT}`));