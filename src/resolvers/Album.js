function images(parent, args, ctx, info){
  return ctx.prisma.image.findMany({
		 where:{albumId: parseInt(parent.id)}
		})
}
module.exports = {
  images:images
}
