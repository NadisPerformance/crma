function insurance(parent, args, ctx, info){
  return ctx.prisma.insurance.findOne({
		 where:{id: parseInt(parent.insuranceId)}
		})
}
module.exports = {
  insurance:insurance
}
