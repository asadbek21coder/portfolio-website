const express = require('express');
const app = express()
const ejs = require('ejs')
const PORT = process.env.PORT || 8080
const { fetchall } = require('./setup/pg.js')

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', './views')
app.use('/css', express.static('css'))
app.use('/img', express.static('img'))
app.use('/js', express.static('js'))
app.use('/vendor', express.static('vendor'))
app.use(express.json())

const checkRoleMiddleware = (req, res, next) => {
    if (req.headers.role === 'admin') {
        next()
    }
    else throw new Error('you are not Admin! ')
}


app.get('/', (req, res) => {

    res.render("index")
})

app.get('/contacts/:id?', checkRoleMiddleware, async (req, res) => {
    try {
        id = req.params.id
        if (id) {
            data = await fetchall(`select * from messages where id=$1`, id)
            if (data[0]) {
                res.send(data[0])
            }
            else {
                throw new Error('there is not such id')
            }
        }
        else {
            data = await fetchall('select * from messages')
            res.status(200).send(data)

        }
    }
    catch (error) {
        console.log(error.message)
        res.send({ error: error.message })
    }
})

app.post('/contacts', async (req, res) => {
    const { userName, userEmail, userMessage } = req.body

    if (userName.length && userEmail.length && userMessage.length) {
        newMessage = await fetchall(`insert into messages
                               (username, email, message) 
                               values ($1,$2,$3) returning * 
         `, userName, userEmail, userMessage)

        res.status(200).send(newMessage)

    }
    else {
        res.send({ message: 'error' })
    }
})

app.get('/dashboard',  async (req,res) => {
    data = await fetchall(`select * from messages`)
    console.log(data)
    res.send(data)
})


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))