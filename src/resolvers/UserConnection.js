function edges(parent, args, ctx, info){
	const where = args.where ? args.where: {}
  console.log(parent)
  //return parent.edges

	var results = ctx.prisma.user.findMany({
	     where,
	     skip: args.skip,
	     first: args.first,
	     orderBy: args.orderBy,
	  })
	console.log(results)
	return results
}
function pageInfo(parent, args, ctx, info){
  return parent.pageInfo
}
module.exports = {
  edges,
  pageInfo
}
