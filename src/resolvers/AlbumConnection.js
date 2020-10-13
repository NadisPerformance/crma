function edges(parent, args, ctx, info){
	console.log(parent)
  return parent.edges
}
function pageInfo(parent, args, ctx, info){
  return parent.pageInfo
}
module.exports = {
  edges,
  pageInfo
}
