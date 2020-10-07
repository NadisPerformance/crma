const {findManyAndPaginate} = require("../helpers")

function user(parent, {id}, ctx, info){
	return ctx.prisma.user.findOne({
		 where:{id: parseInt(id) }
		})
}
async function users(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.user.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.user.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}
function me(parent, args, ctx, info){
	if(!ctx.user )
		return null
	return ctx.prisma.user.findOne({
		 where:{id: parseInt(ctx.user.id)}
		})
}

function car(parent, {id}, ctx, info){
	return ctx.prisma.car.findOne({
		 where:{id: parseInt(id) }
		})
}
async function cars(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit = args.limit || 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.car.findMany({
	    where,
	    skip: (page - 1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.car.count()
	console.log("hello")
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

function customer(parent, {id}, ctx, info){
	return ctx.prisma.customer.findOne({
		 where:{id: parseInt(id) }
		})
}
async function customers(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.customer.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.customer.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

async function hello(parent, args, ctx, info){
  return "Hello world"
}
module.exports = {
  users,
  user,
  me,
  hello,
  car,
  cars,
  customer,
  customers
}
