function album(parent, args, ctx, info){
  return ctx.prisma.album.findOne({
		 where:{id: parseInt(parent.albumId)}
		})
}
module.exports = {
  album: album
}
