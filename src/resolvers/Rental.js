function car(parent, args, ctx, info){
    return ctx.prisma.car.findOne({
           where:{id: parseInt(parent.carId)}
          })
}
function customer(parent, args, ctx, info){
  return ctx.prisma.customer.findOne({
		 where:{id: parseInt(parent.customerId)}
		})
}
function booking(parent, args, ctx, info){
  return ctx.prisma.booking.findOne({
		 where:{id: parseInt(parent.bookingId)}
		})
}
async function before_rental(parent, args, ctx, info){
  var rentals =  await ctx.prisma.before_rental.findMany({
		 where:{rentalId: parseInt(parent.id)}
		})
  if(rentals )
    return rentals[0]
}
async function after_rental(parent, args, ctx, info){
  var rentals =  await ctx.prisma.after_rental.findMany({
		 where:{rentalId: parseInt(parent.id)}
		})
  if(rentals )
    return rentals[0]
}
module.exports = {
  customer: customer,
  car: car,
  booking: booking,
  before_rental: before_rental,
  after_rental: after_rental
}
