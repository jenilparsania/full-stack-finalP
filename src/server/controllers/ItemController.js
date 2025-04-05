const db = require("../connection");

module.exports = {
    index(req,res){
        db.query(`SELECT * FROM itemtable`,(err,results)=>{
            if (err) return res.sendStatus(500);
            return res.send({ item: results });
        });
    },
    store(req, res) {
        console.log(" REQ. BODY => ",req.body)
        
        db.query(`INSERT INTO itemtable (title,description,price,quantity,sku,category_id) VALUES (?,?,?,?,?,?)`, [req.body.item.title,req.body.item.desc,req.body.item.price,req.body.item.quantity,req.body.item.sku,req.body.item.category_id], (err, result)=>{
            console.log("result: " + JSON.stringify(result));
            if (err) return res.sendStatus(500);
            
            db.query(`SELECT * FROM itemtable`, (err, results)=>{
                if (err) return res.sendStatus(500);
                return res.send({ item: results });
            });
        });
    }, 
    update(req, res) {
        console.log(" REQ. BODY => ",req.body)
        
        db.query(`UPDATE itemtable SET title=?,description=?,price=?,quantity=?,sku=?,category_id=? WHERE item_id=? `, [req.body.item.title,req.body.item.desc,req.body.item.price,req.body.item.quantity,req.body.item.sku,req.body.item.category_id,req.params.item], (err, result)=>{
            console.log("result: " + JSON.stringify(result));
            if (err) return res.sendStatus(500);
            
            db.query(`SELECT * FROM itemtable`, (err, results)=>{
                if (err) return res.sendStatus(500);
                return res.send({ item: results });
            });
        });
    }, 
    destroy(req,res){
        db.query(`DELETE FROM itemtable WHERE item_id=?`,[req.params.item],(err,result)=>{
            if(err) return res.sendStatus(500);

            db.query(`SELECT * FROM itemtable`,(err,results)=>{
                if(err) return res.sendStatus(500);
                return res.send({item:results});

            });
        });
    }
    ,
    getitems(req,res){
        db.query(`
            SELECT itemtable.title, categorytable.category_name AS category, itemtable.description, itemtable.price
            FROM itemtable
            JOIN categorytable ON itemtable.category_id = categorytable.category_id
          `, (err, results) => {
            if (err) return res.sendStatus(500);
            return res.json({ item: results });
          });

    }

};