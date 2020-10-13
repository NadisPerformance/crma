function album(parent, args, ctx, info){
  return ctx.prisma.album.findOne({
		 where:{id: parseInt(parent.albumId)}
		})
}
function rental(parent, args, ctx, info){
  return ctx.prisma.rental.findOne({
		 where:{id: parseInt(parent.rentalId)}
		})
}
module.exports = {
  album:album,
  rental:rental
}
