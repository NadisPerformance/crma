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
function payment_method(parent, args, ctx, info){
   return ctx.prisma.payment_method.findOne({
             where:{id: parseInt(parent.paymentMethodId)}
            })
}
module.exports = {
    rental: rental,
    customer: customer,
    payment_method: payment_method
}
