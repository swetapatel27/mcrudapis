var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var mongojs = require('mongojs');
var router = express.Router();

var db = mongojs("mongodb+srv://studentdb:4CsQdyR5ALasHzLb@mycluster-jtfqi.mongodb.net/student?retryWrites=true&w=majority"); //db connection

//reading data
router.get('/', (req, res) => {
    db.student.find({}, (err, msg) => {
        if (!err) {
            res.status(200).json({
                message: msg
            })
        } else {
            res.status(500).json({
                message: err
            });
        }
    });
})


//adding data

router.post('/addstud', (req, res) => {

    db.student.save({
        name: req.body.name,
        pswd: req.body.pswd
    }, (err, msg) => {
        if (!err) {
            res.status(200).json({
                message: msg
            });
        } else {
            res.status(500).json({
                message: err
            });
        }
    });

});


// //updating records
router.put('/updatestud',(req,res)=>{
    
    db.student.update({_id:ObjectId(req.body._id)},{$set:{name:req.body.name,pswd:req.body.pswd}},(err,msg)=>{
        if (!err) {
            res.status(200).json({
                message: msg
            });
        } else {
            res.status(500).json({
                message: err
            });
        }
    })
})



// //deleting records
router.delete('/delete/:id', (req, res, next) => {
    console.log("deelete");
    var t = req.params.id.toString()
    console.log(t);
    
    db.student.remove({ _id: ObjectId(t) }, (err, msg) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ msg: msg });
        }
    });
});




module.exports = router;