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

function driver_license_url(parent, args, ctx, info){
  if(!parent.driver_license)
    return null
  if(gc_storage)
      return "https://storage.googleapis.com/crma/"+carsDir+'/'+parent.driver_license
  return  website_url+"static"+carsDir+'/'+parent.driver_license
}

module.exports = {
  rentals:rentals,
  bookings: bookings,
  bills: bills
}
