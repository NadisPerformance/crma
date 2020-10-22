var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');
//var res1 = fs.createWriteStream('out.pdf');
var haml = require('hamljs');
//wkhtmltopdf.command = 'xvfb-run -a -s "-screen 0 640x480x16" wkhtmltopdf'
var pdf = require('html-pdf');

async function generateContract(res,rental){
  var hamlView = fs.readFileSync(__dirname+ '/contract.js', 'utf8');
  //res.setHeader('content-type', 'application/pdf');
  //res.setHeader('Content-Disposition', 'attachment; filename=contract_'+rental.id+'.pdf');

  //return res.send(haml.render(hamlView, {locals: rapport}))
  var options = { format: 'Letter' };

  pdf.create(haml.render(hamlView, {locals: rental}), options)
    .toStream(function(err, stream){
      stream.pipe(res);
  })
}

module.exports =  {
  generateContract:generateContract
}
