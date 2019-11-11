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
//chargement des variables d'environnement pour l'envoi de mails au site
const env = require('env2')('./.env')
// https://github.com/sendgrid/sendgrid-nodejs c'est mieux que aws qui est payant
const sgMail = require('@sendgrid/mail')
// Tell Vue to use the plugin
const session = require('express-session')
const app = express() //creation de l'api
var id = 1
const urlAvatar = 'http://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png'
// ces lignes (cors) sont importantes pour les sessions dans la version de développement
app.use(
  cors({ // informations du client
    credentials: true,
    origin: 'http://localhost:8080'
  })
)
app.use(
  session({
    secret: 'blablabla', // changez cette valeur
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // ne changez que si vous avez activé le https
  })
)
app.use(morgan('dev')) //log des requetes dans la console
app.use(bodyParser.json())

const path = require('path')
app.use(express.static(path.join(__dirname, '/dist')))

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'changethispassword',
    imageAvatar: urlAvatar
  }
]

var docks = [
  {
    id: 1,
    title: 'User',
    active: false,
    input: {
      mode: 'add',
      oldTitle: '',
      placeholder: ''
    },
    decks: [
      { title: 'Capitals',
        flashcards: [
          { key: 'France', value: 'Paris' },
          { key: 'Etats-Unis', value: 'Washington' },
          { key: 'Inde', value: 'New Delhi' }
        ] },
      { title: 'History', flashcards: [] },
      { title: 'Bash', flashcards: [] }
    ] }
  // {
  //   id: 1,
  //   title: 'Usdder',
  //   active: false,
  //   input: {
  //     mode: 'adddd',
  //     oldTitle: '',
  //     placeholder: ''
  //   },
  //   decks: [
  //     { title: 'Capdditals',
  //       flashcards: [
  //         { key: 'Frandce', value: 'Paris' },
  //         { key: 'Etadts-Unis', value: 'Washington' },
  //         { key: 'Indde', value: 'New Delhi' }
  //       ] },
  //     { title: 'Histdory', flashcards: [] },
  //     { title: 'dBash', flashcards: [] }
  //   ] }
]

app.post('/api/users', (req, res) => {
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  res.json({
    users: users
  })
})

app.post('/api/updateUser', (req, res) => {
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  users.find(
    u => u.username === req.body.username && u.password === req.body.password
  ).imageAvatar = req.body.imageAvatar
  res.json({
    users: users
  })
})
app.post('/stock/getStocks', (req, res) => {
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  console.log('docks title', docks.title + users.length)
  res.json({
    docks: docks
  })
})

app.post('/stock/updateStocks', (req, res) => { // Ne marche pas
  docks = req.body
  res.json({
    message: 'update user dock',
    docks: docks
  })
})

app.post('/api/login', (req, res) => {
  console.log('req.body', req.body)
  var usr = { username: req.body.username, password: req.body.password }
  var user = users.find(
    u => u.username === req.body.username)
    console.log(JSON.stringify(user))
  if (!user) {
    if (req.body.registration){
      usr.id = ++id
      usr.imageAvatar = urlAvatar
      users.push(usr)
      user = usr
      res.json({
        message: 'creation',
        user: user
      })
    } else {
      res.json({
        message: 'error'
      })
    }
  } else if (usr.password === user.password) {
    if (!req.body.registration){
      // connect the user
      res.json({
        message: 'connected',
        user: user
      })
    } else {
      res.json({
        message: 'already used'
      })
    }
    
  } else {
    res.json({
      message: 'error'
    })
  }
})

app.post('/api/mail', (req, res) => {
  req.body.to = "myflashcardsProjetweb@gmail.com"
  if (req.body.from == ''){
    req.body.from = req.body.to
  }
  //envoi d'un mail
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  try{
    sgMail.send(req.body)
    console.log("mail envoyé", req.body)
  } catch (e) {
    res = "kkk"
    console.log("échec de l'envoi", res)
  }
  /*var reponse = {
    from: req.body.to,
    to: req.body.from,
    subject: 'My flashcards vous',
    text: req.body.to
  }*/
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
