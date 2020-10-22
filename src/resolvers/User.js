function role(parent, args, ctx, info){
  return ctx.prisma.role.findOne({
		 where:{id: parseInt(parent.roleId)}
		})
}
module.exports = {
  role: role
}
