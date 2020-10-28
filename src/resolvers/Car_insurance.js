const {website_url, carInsurancesDir, gc_storage, gc_bucket} = require('../config')

function insurance(parent, args, ctx, info){
  return ctx.prisma.insurance.findOne({
		 where:{id: parseInt(parent.insuranceId)}
		})
}

function scanned_car_insurance_url(parent, args, ctx, info){
  if(!parent.scanned_car_insurance)
    return null
  if(gc_storage)
      return "https://storage.googleapis.com/"+gc_bucket+"/"+carInsurancesDir+'/'+parent.scanned_car_insurance
  return  website_url+"static"+carInsurancesDir+'/'+parent.scanned_car_insurance
}

module.exports = {
  insurance: insurance,
  scanned_car_insurance_url: scanned_car_insurance_url
}
