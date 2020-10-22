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
  module.exports = {
    car: car,
    customer: customer
  }
  