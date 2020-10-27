const {website_url, technicalControlsDir, gc_storage} = require('../config')

function technical_control_url(parent, args, ctx, info){
  if(!parent.scanned_technical_control)
    return null
  if(gc_storage)
      return "https://storage.googleapis.com/crma/"+technicalControlsDir+'/'+parent.scanned_technical_control
  return  website_url+"static"+technicalControlsDir+'/'+parent.scanned_technical_control
}

module.exports = {
  technical_control_url: technical_control_url
}
