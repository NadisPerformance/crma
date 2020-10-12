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
function before_rental(parent, args, ctx, info){
  return ctx.prisma.before_rental.findOne({
		 where:{rentalId: parseInt(parent.id)}
		})
}
function after_rental(parent, args, ctx, info){
  return ctx.prisma.after_rental.findOne({
		 where:{rentalId: parseInt(parent.id)}
		})
}
module.exports = {
  customer: customer,
  car: car,
  booking: booking,
  before_rental: before_rental,
  after_rental: after_rental
}
