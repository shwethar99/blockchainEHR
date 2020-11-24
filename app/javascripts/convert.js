const FS=require("fs");
function convert()
{ FS.readFile('../converted.txt', 'utf-8',(err, data) => {
  if (err) throw err;
 return data;
});
}

module.exports=convert();
