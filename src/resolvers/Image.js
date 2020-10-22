const {website_url, imagesDir, gc_storage} = require('../config')

function album(parent, args, ctx, info){
  return ctx.prisma.album.findOne({
		 where:{id: parseInt(parent.albumId)}
		})
}
function image_url(parent, args, ctx, info){
  if(!parent.path)
    return null
  if(gc_storage)
    return "https://storage.googleapis.com/crma/"+imagesDir+'/'+parent.path
  return  website_url+"static"+imagesDir+'/'+parent.path
}
module.exports = {
  album: album,
  image_url: image_url
}
