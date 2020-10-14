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
function technical_controls(parent, args, ctx, info){
  return ctx.prisma.technical_control.findMany({
		 where:{carId: parseInt(parent.id)}
		})
}
function car_insurances(parent, args, ctx, info){
  return ctx.prisma.car_insurance.findMany({
		 where:{carId: parseInt(parent.id)}
		})
}
module.exports = {
  brand: brand,
  category: category,
  color: color,
  status:status,
  technical_controls:technical_controls,
  car_insurances: car_insurances
}
