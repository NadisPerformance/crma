function rental(parent, args, ctx, info){
    return ctx.prisma.rental.findOne({
           where:{id: parseInt(parent.rentalId)}
          })
  }

function customer(parent, args, ctx, info){
    return ctx.prisma.customer.findOne({
           where:{id: parseInt(parent.customerId)}
          })
  }
  module.exports = {
    rental: rental,
    customer: customer
  }
