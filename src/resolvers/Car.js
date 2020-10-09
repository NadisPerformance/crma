function brand(parent, args, ctx, info){
  return ctx.prisma.brand.findOne({
		 where:{id: parseInt(parent.brandId)}
		})
}
module.exports = {
  brand: brand
}
