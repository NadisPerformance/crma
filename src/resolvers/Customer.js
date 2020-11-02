const {website_url, customersDir, gc_storage, gc_bucket} = require('../config')

function rentals(parent, args, ctx, info){
  return ctx.prisma.rental.findMany({
		 where:{customerId: parseInt(parent.id)}
		})
}
function bookings(parent, args, ctx, info){
  return ctx.prisma.booking.findMany({
		 where:{customerId: parseInt(parent.id)}
		})
}
function bills(parent, args, ctx, info){
  return ctx.prisma.bill.findMany({
		 where:{customerId: parseInt(parent.id)}
		})
}

function scanned_driver_license_url(parent, args, ctx, info){
  if(!parent.scanned_driver_license)
    return null
  if(gc_storage)
      return "https://storage.googleapis.com/"+gc_bucket+"/"+customersDir+'/'+parent.scanned_driver_license
  return  website_url+"static"+customersDir+'/'+parent.scanned_driver_license
}

module.exports = {
  rentals:rentals,
  bookings: bookings,
  bills: bills,
  scanned_driver_license_url: scanned_driver_license_url
}
