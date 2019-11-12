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
// Tell Vue to use the plugin
const session = require('express-session')
const app = express() // creation de l'api
// chargement des variables d'environnement pour l'envoi de mails au site
const env = require('env2')('./.env')
// https://github.com/sendgrid/sendgrid-nodejs c'est mieux que aws qui est payant
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
var id = 1
const urlAvatar = 'http://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png'
// ces lignes (cors) sont importantes pour les sessions dans la version de développement
app.use(
  cors({ // informations du client
    credentials: true,
    origin: 'http://localhost:8080'
  })
)

const path = require('path')
app.use(express.static(path.join(__dirname, 'dist/')))

app.use(
  session({
    secret: 'blablabla', // changez cette valeur
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // ne changez que si vous avez activé le https
  })
)
app.use(morgan('dev')) // log des requetes dans la console
app.use(bodyParser.json())

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
    title: 'Knowlegde',
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
          { key: 'Inde', value: 'New Delhi' },
          { key: 'Japan', value: 'Tokyo' },
          { key: 'Spain', value: 'Madrid' },
          { key: 'Egypt', value: 'Egypt' },
          { key: 'Switzerland', value: 'Bern' }
        ],
        success: 0 },
      { title: 'History',
        flashcards: [
          { key: 'Tour Eiffel', value: '28 janvier 1887' },
          { key: 'Fondation de Rome', value: '-753' },
          { key: 'Armistice. Victoire des Alliés', value: '11 novembre 1918' }
        ],
        success: 0 }
    ] }, {
    id: 1,
    title: 'Computer',
    active: false,
    input: {
      mode: 'add',
      oldTitle: '',
      placeholder: ''
    },
    decks: [
      { title: 'Bash',
        flashcards: [
          { key: 'ls', value: 'list files in a directory' },
          { key: 'pwd', value: 'current working directory' },
          { key: 'cat', value: 'output the contents of a file' },
          { key: 'kill', value: 'terminate a process' },
          { key: 'passwd', value: 'changes your password' },
          { key: 'whoami', value: 'outputs your user name' },
          { key: 'date', value: 'outputs the current date/time' },
          { key: 'chown', value: 'change the owner of a file' }
        ],
        success: 0 }
    ]
  }
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
    if (req.body.registration) {
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
    if (!req.body.registration) {
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
  var adresseEquipe = 'myflashcardsesiea@gmail.com'
  if (req.body.to === '') {
    req.body.to = adresseEquipe
  } else if (req.body.from === '') {
    req.body.from = adresseEquipe
  }
  // envoi d'un mail
  try {
    sgMail.send(req.body)
    console.log(req.body)
  } catch (e) {
    res.json({
      message: 'error'
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
