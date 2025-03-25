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
        console.log("Req.body for updating "+ req.body.category.category_name);
        console.log("Req.body for updating "+ req.params.category);


        db.query(`UPDATE categorytable SET category_name=? WHERE category_id=?`, [req.body.category.category_name, req.params.category], (err, result)=>{
            if (err) return res.sendStatus(500);
            
            db.query(`SELECT * FROM Categorytable`, (err, results)=>{
                if (err) return res.sendStatus(500);
                return res.send({ category: results });
            });
        });
    },
    destroy(req, res){
        db.query(`DELETE FROM Categorytable WHERE category_id=?`, [req.params.category], (err, result)=>{
            
            if (err) return res.sendStatus(500);
            
            db.query(`SELECT * FROM Categorytable`, (err, results)=>{
                if (err) return res.sendStatus(500);
                return res.send({ category: results });
            });
        });
    }
}