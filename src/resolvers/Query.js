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
	where.deleted = false
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

function album(parent, {id}, ctx, info){
	return ctx.prisma.album.findOne({
		 where:{id: parseInt(id) }
		})
}
async function albums(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	where.deleted = false
	let results =  await ctx.prisma.album.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.album.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
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
	where.deleted = false
	let results =  await ctx.prisma.car.findMany({
	    where,
	    skip: (page - 1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.car.count({where:where})
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
	where.deleted = false
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

function booking(parent, {id}, ctx, info){
	return ctx.prisma.booking.findOne({
		 where:{id: parseInt(id) }
		})
}
async function bookings(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	where.deleted = false
	let results =  await ctx.prisma.booking.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.booking.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

function brand(parent, {id}, ctx, info){
	return ctx.prisma.brand.findOne({
		 where:{id: parseInt(id) }
		})
}
async function brands(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.brand.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.brand.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

function role(parent, {id}, ctx, info){
	return ctx.prisma.role.findOne({
		 where:{id: parseInt(id) }
		})
}
async function roles(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.role.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.role.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

function image(parent, {id}, ctx, info){
	return ctx.prisma.image.findOne({
		 where:{id: parseInt(id) }
		})
}
async function images(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.image.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.image.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

function insurance(parent, {id}, ctx, info){
	return ctx.prisma.insurance.findOne({
		 where:{id: parseInt(id) }
		})
}
async function insurances(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.insurance.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.insurance.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

async function hello(parent, args, ctx, info){
  return "Hello world"
}
function color(parent, {id}, ctx, info){
	return ctx.prisma.color.findOne({
		 where:{id: parseInt(id) }
		})
}
async function colors(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.color.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.color.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}
function category(parent, {id}, ctx, info){
	return ctx.prisma.category.findOne({
		 where:{id: parseInt(id) }
		})
}
async function categories(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.category.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.category.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}
function status(parent, {id}, ctx, info){
	return ctx.prisma.status.findOne({
		 where:{id: parseInt(id) }
		})
}
async function statuss(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.status.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.status.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}
function rental(parent, {id}, ctx, info){
	return ctx.prisma.rental.findOne({
		 where:{id: parseInt(id) }
		})
}
async function rentals(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	where.deleted = false
	let results =  await ctx.prisma.rental.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.rental.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

function after_rental(parent, {id}, ctx, info){
	return ctx.prisma.after_rental.findOne({
		 where:{id: parseInt(id) }
		})
}
async function after_rentals(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.after_rental.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.after_rental.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

function before_rental(parent, {id}, ctx, info){
	return ctx.prisma.before_rental.findOne({
		 where:{id: parseInt(id) }
		})
}
async function before_rentals(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	let results =  await ctx.prisma.before_rental.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.before_rental.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

function technical_control(parent, {id}, ctx, info){
	return ctx.prisma.technical_control.findOne({
		 where:{id: parseInt(id) }
		})
}
async function technical_controls(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	where.deleted = false
	let results =  await ctx.prisma.technical_control.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.technical_control.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}

function car_insurance(parent, {id}, ctx, info){
	return ctx.prisma.car_insurance.findOne({
		 where:{id: parseInt(id) }
		})
}
async function car_insurances(parent, args, ctx, info){
	const page = args.page || 1 ;
	const limit =  args.limit|| 10 ;
	const where = args.where ? args.where: {}
	where.deleted = false
	let results =  await ctx.prisma.car_insurance.findMany({
	    where,
	    skip: (page-1) * limit ,
	   	first: limit,
	    orderBy: args.orderBy,
	  })
	let edges = results.map(result=>({node:result}))
	let count = await ctx.prisma.car_insurance.count()
	return {edges:edges, pageInfo:{count:count, currentPage:page}}
}
module.exports = {
  users,
  user,
  me,
  hello,
	album,
	albums,
  car,
  cars,
	color,
	colors,
	category,
	categories,
  customer,
  customers,
  booking,
  bookings,
	brand,
	brands,
	status,
	statuss,
	role,
	roles,
	image,
	images,
	rental,
	rentals,
	after_rental,
	after_rentals,
	before_rental,
	before_rentals,
	insurance,
	insurances,
	technical_control,
	technical_controls,
	car_insurance,
	car_insurances
}
