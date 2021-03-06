var express = require("express");
const db = require(__dirname + "/../_connect_db");
var router = express.Router();

router.get("/", function(req, res) {
  const sql = "SELECT * FROM activity_successEvent";
  db.queryAsync(sql).then(result => {
    return res.json(result);
  });
});
//mId查詢
router.get("/:mId?", function(req, res){
  const sql =`SELECT * FROM activity_successEvent WHERE mId = ?`
  console.log(req.params.mId)
  db.queryAsync(sql, [req.params.mId]).then(result=>{return res.json(result)})
})
//報名講座，課程
router.post("/insertSuccessEvent", function(req, res) {
  const sql = `INSERT INTO \`activity_successEvent\`(\`mId\`,\`eId\`,\`eName\`,\`eDate\`,\`ePeople\`)VALUES(?,?,?,?,?)`;
  db.queryAsync(sql, [
    req.body.mId,
    req.body.eId,
    req.body.eName,
    req.body.eDate,
    req.body.ePeople
  ])
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
