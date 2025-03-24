const db = require("../connection");

module.exports = {
    index(req,res){
        db.query(`SELECT * FROM categorytable`,(err,results)=>{
            if (err) return res.sendStatus(500);
            return res.send({ category: results });
        });
    },
    store(req, res) {
        console.log(" REQ. BODY => ",req.body)
        // db.query(`INSERT INTO categorytable (category_name) VALUES (?)`, [req.body.category_name], (err, result)=>{
        db.query(`INSERT INTO categorytable (category_name) VALUES (?)`, [req.body.category.category_name], (err, result)=>{
            console.log("result: " + JSON.stringify(result));
            if (err) return res.sendStatus(500);
            
            db.query(`SELECT * FROM categorytable`, (err, results)=>{
                if (err) return res.sendStatus(500);
                return res.send({ category: results });
            });
        });
    }, 
    update(req,res){
        db.query(`UPDATE Category SET category_name=? WHERE category_id=?`, [req.body.item.category_name, req.params.category_id], (err, result)=>{
            if (err) return res.sendStatus(500);
            
            db.query(`SELECT * FROM Category`, (err, results)=>{
                if (err) return res.sendStatus(500);
                return res.send({ category: results });
            });
        });
    },
    destroy(req, res){
        db.query(`DELETE FROM Category WHERE id=?`, [req.params.category_id], (err, result)=>{
            if (err) return res.sendStatus(500);
            
            db.query(`SELECT * FROM Category`, (err, results)=>{
                if (err) return res.sendStatus(500);
                return res.send({ category: results });
            });
        });
    }
}