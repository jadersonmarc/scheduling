var conn = require('./../inc/db');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  menus.getMenus().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
    });

  });

});

router.get('/contacts', function (req, res, next) {

  contacts.render(req, res);

});

router.post('/contacts', function (req, res, next) {

  if (!req.body.name) {
    contacts.render(req, res, 'digite o nome');
  } else if (!req.body.email) {
    contacts.render(req, res, 'digite o email');
  } else if (!req.body.message) {
    contacts.render(req, res, 'deixe uma mensagen');
  } else {
    contacts.save(req.body).then(results => {
      req.body = {};
      contacts.render(req, res, null, 'contato realizado com sucesso!');
    }).catch(err => {
      contacts.render(req, res, err.message);
    })
  }

});

router.get('/menus', function (req, res, next) {

  menus.getMenus().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!'
    });

  });

});

router.get('/reservations', function (req, res, next) {

  reservations.render(req, res);

});

router.post('/reservations', function (req, res, next) {

  if (!req.body.name) {
    reservations.render(req, res, 'digite o nome');
  } else if (!req.body.email) {
    reservations.render(req, res, 'digite o email');
  } else if (!req.body.people) {
    reservations.render(req, res, 'selecione o numero de pessoas');
  } else if (!req.body.date) {
    reservations.render(req, res, 'selecione a data');
  } else if (!req.body.time) {
    reservations.render(req, res, 'selecione a hora');
  } else {
    reservations.save(req.body).then(results => {
      req.body = {};
      reservations.render(req, res, null, 'reserva realizada com sucesso!');
    }).catch(err => {
      reservations.render(req, res, err.message);
    })
  }

});


router.get('/services', function (req, res, next) {

  res.render('services', {
    title: 'Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: '?? um prazer poder servir!'
  });

});
module.exports = router;
