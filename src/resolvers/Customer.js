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
module.exports = {
  rentals:rentals,
  bookings: bookings,
  bills: bills
}
