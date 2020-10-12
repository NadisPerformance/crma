function brand(parent, args, ctx, info){
  return ctx.prisma.brand.findOne({
		 where:{id: parseInt(parent.brandId)}
		})
}
function category(parent, args, ctx, info){
  return ctx.prisma.category.findOne({
		 where:{id: parseInt(parent.categoryId)}
		})
}
function color(parent, args, ctx, info){
  return ctx.prisma.color.findOne({
		 where:{id: parseInt(parent.colorId)}
		})
}
function status(parent, args, ctx, info){
  return ctx.prisma.status.findOne({
		 where:{id: parseInt(parent.statusId)}
		})
}
module.exports = {
  brand: brand,
  category: category,
  color: color,
  status:status
}
