var handler = require('./handler')
var express = require('express')
var router = express.Router();
router.get('/',handler.getIndexStatic)
      .get('/add',handler.getAddStatic)  
      .post('/add',handler.AddStatic)  
      .get('/edit',handler.getEditStatic)
      .post('/edit',handler.editText)
      .get('/del',handler.delClick)
      .post('/upload',handler.getAddImg)
module.exports = router