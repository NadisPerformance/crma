const {website_url, carsDir, gc_storage} = require('../config')
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
		 where:{carId: parseInt(parent.id),
      deleted:false
     }

		})
}
function car_insurances(parent, args, ctx, info){
  return ctx.prisma.car_insurance.findMany({
		 where:{carId: parseInt(parent.id),
       deleted:false
      }
		})
}

function picture_url(parent, args, ctx, info){
  if(!parent.picture)
    return null
  if(gc_storage)
      return "https://storage.googleapis.com/"+gc_bucket+"/"+carsDir+'/'+parent.picture
  return  website_url+"static"+carsDir+'/'+parent.picture
}

function scanned_grey_card_url(parent, args, ctx, info){
  if(!parent.scanned_grey_card)
    return null
  if(gc_storage)
      return "https://storage.googleapis.com/"+gc_bucket+"/"+carsDir+'/'+parent.scanned_grey_card
  return  website_url+"static"+carsDir+'/'+parent.scanned_grey_card
}
module.exports = {
  brand: brand,
  category: category,
  color: color,
  status:status,
  technical_controls:technical_controls,
  car_insurances: car_insurances,
  picture_url: picture_url,
  scanned_grey_card_url: scanned_grey_card_url
}
