/**
 *
 * entrez la commande suivante:
 * npm install --save express express-session body-parser morgan cors
 * puis node server.js
 * exemple complet à l'adresse https://github.com/Musinux/first-vue-app
 */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')

const app = express()

// ces lignes (cors) sont importantes pour les sessions dans la version de développement
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}))
app.use(session({
  secret: 'blablabla', // changez cette valeur
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ne changez que si vous avez activé le https
}))
app.use(morgan('dev'))
app.use(bodyParser.json())

const path = require('path')
app.use(express.static(path.join(__dirname, '/dist')))

const users = [{
  username: 'admin',
  password: 'changethispassword'
}]

var docks = [
  {
    title: 'User',
    active: false,
    input: {
      mode: 'add',
      oldTitle: '',
      placeholder: ''
    },
    decks: [
      { title: 'Capitals', count: 5 },
      { title: 'History', count: 3 },
      { title: 'Bash', count: 129 }
    ],
    count: 3
  }
]

app.post('/stock/getStocks', (req, res) => {
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  console.log('docks title', docks.title + users.length)
  res.json({
    docks: docks
  })
})

app.post('/stock/updateStocks', (req, res) => {
  if (req.body.docks !== undefined) {
    docks = req.body.docks
  }
})

app.post('/api/login', (req, res) => {
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  var usr = { username: req.body.login, password: req.body.password }
  const user = users.find(u => u.username === req.body.login && u.password === req.body.password)
  if (!user) {
    users.push(usr)
    res.json({
      message: 'creation'
    })
  } else {
    // connect the user
    req.session.userId = 1000 // connect the user, and change the id
    res.json({
      message: 'connected'
    })
  }
})
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})

// app.get('/api/logout', (req, res) => {
//   if (!req.session.userId) {
//     res.status(401)
//     res.json({
//       message: 'you are already disconnected'
//     })
//   } else {
//     req.session.userId = 0
//     res.json({
//       message: 'you are now disconnected'
//     })
//   }
// })

// app.get('/api/test', (req, res) => {
//   console.log('ce console.log est appelé au bon moment')
//   res.json([
//     {
//       title: 'truc',
//       content: 'machin'
//     }, {
//       title: 'truc2',
//       content: 'machin2'
//     }
//   ])
// })

