function images(parent, args, ctx, info){
  return ctx.prisma.image.findMany({
		 where:{albumId: parseInt(parent.id),deleted:false}
		})
}
module.exports = {
  images:images
}
