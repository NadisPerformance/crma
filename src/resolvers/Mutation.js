const {encryptPassword, getToken, comparePassword, storeUpload} = require('../utils')
const mkdirp = require('mkdirp')
const {imagesDir} = require('../config')
mkdirp.sync('public/'+imagesDir)
async function signup(parent, args, context, info) {
  // 1
  const hashedPassword = await encryptPassword(args.password)
  // 2
  const {password, ...user} = await context.prisma.createUser({ ...args, password: hashedPassword })

  // 3
  const token = getToken(user)

  // 4
  return {
    token,
    user,
    statut_code:1,
    message:"Created!"
  }
}
async function login (parent, args, ctx , info) {
    //console.log("connected")
    let user = await ctx.prisma.user.findMany({
              where:  {
                  email: args.email
                }
     })
    console.log(user)
    if(!user[0])
      return {user:null,statut_code:0, message:"Not found!"}
    user = user[0]
    const isMatch = await comparePassword(args.password, user.password)
    if (isMatch)   {
          // Creating a Token from User Payload obtained.
          const token = getToken(user)
          return { user:user, token:token, statut_code:1, message:"Logged" };
    } else {
          // Throwing Error on Match Status Failed.
          return {user:null,statut_code:0, message:"Wrong Password!"}
    }
}
async function forgotPassword (parent, args, ctx , info) {
    //console.log("connected")
    let user = await ctx.prisma.user.findMany({
              where:  {
                  email: args.email
                }
     })
    console.log(user)
    if(!user[0])
      return {statut_code:0, message:"Email not found."}
    user = user[0]
    // send recover mail
    return {statut_code:1, message:"Recover mail sent."}
}
async function recoverPassword (parent, args, ctx , info) {
    //console.log("connected")
    let user = await ctx.prisma.users({
              where:  {
                  id: args.id,
                }
     })
    console.log(user)
    if(!user[0])
      return {statut_code:0, message:"User not found."}
    user = user[0]
    // send recover mail
    if(user.recover_code != args.recover_code)
      return {statut_code:0, message:"Code invalide."}
    return {statut_code:1, message:"Mot de passe changed."}
}
async function createUser(parent, {data}, context, info) {
  const hashedPassword = await encryptPassword(data.password)
  return context.prisma.user.create({data:{ ...data, password: hashedPassword }})
}
async function updateUser(parent, {data,id}, context, info) {
  let user = data
  if(data.password){
    const hashedPassword = await encryptPassword(data.password)
    user = { ...data, password: hashedPassword }
  }
  return context.prisma.user.update({data:user,
              where: {
                id: id *1
              }})
}
async function deleteUser(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.user.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"User deleted"}
}
async function createCustomer(parent, {data}, context, info) {
  return context.prisma.customer.create({data:data})
}
async function updateCustomer(parent, {data,id}, context, info) {

  return context.prisma.customer.update({data:data,
              where: {
                id: id *1
              }})
}

async function createBooking(parent, {data}, context, info) {
  return context.prisma.booking.create({data:data})
}
async function updateBooking(parent, {data,id}, context, info) {

  return context.prisma.booking.update({data:data,
              where: {
                id: id *1
              }})
}

async function createBrand(parent, {data}, context, info) {
  return context.prisma.brand.create({data:data})
}
async function updateBrand(parent, {data,id}, context, info) {

  return context.prisma.brand.update({data:data,
              where: {
                id: id *1
              }})
}

async function createRole(parent, {data}, context, info) {
  return context.prisma.role.create({data:data})
}
async function updateRole(parent, {data,id}, context, info) {

  return context.prisma.role.update({data:data,
              where: {
                id: id *1
              }})
}


async function createImage(parent, {data}, context, info) {
  console.log("hello")
  console.log(data)
  const { createReadStream, filename, mimetype, encoding } = await data.file
  const stream = createReadStream()
  const { id, path } = await storeUpload({ stream, filename},imagesDir)
  delete data.file
  data.path = path
  console.log(data)
  return context.prisma.image.create({data:data})
}
async function updateImage(parent, {data,id}, context, info) {

  return context.prisma.image.update({data:data,
              where: {
                id: id *1
              }})
}


module.exports = {
  login,
  signup,
  forgotPassword,
  recoverPassword,
  createUser,
  updateUser,
  deleteUser,
  createCustomer,
  updateCustomer,
  createBooking,
  updateBooking,
  createBrand,
  updateBrand,
  createRole,
  updateRole,
  createImage

}
