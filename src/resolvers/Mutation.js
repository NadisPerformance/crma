const {encryptPassword, getToken, comparePassword, storeUpload, storeToGoogleStorage} = require('../utils')
const mkdirp = require('mkdirp')
const {imagesDir, carsDir} = require('../config')
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
async function deleteCustomer(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.customer.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Customer deleted"}
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

async function deleteBooking(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.booking.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Booking deleted"}
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

async function deleteBrand(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.brand.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Brand deleted"}
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

async function deleteRole(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.role.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Role deleted"}
}

async function createImage(parent, {data}, context, info) {
  data.path = await storeUpload(data.file, imagesDir)
  delete data.file
  return context.prisma.image.create({data:data})
}
async function updateImage(parent, {data,id}, context, info) {
  data.path = await storeUpload(data.file, imagesDir)
  delete data.file
  return context.prisma.image.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteImage(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.image.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Image deleted"}
}

async function createInsurance(parent, {data}, context, info) {
  return context.prisma.insurance.create({data:data})
}
async function updateInsurance(parent, {data,id}, context, info) {

  return context.prisma.insurance.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteInsurance(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.insurance.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Insurance deleted"}
}

async function createCar(parent, {data}, context, info) {
  if(data.picture_file) {
    data.picture = await storeUpload(data.picture_file, carsDir)
    delete data.picture_file
  }
  return context.prisma.car.create({data:data})
}
async function updateCar(parent, {data,id}, context, info) {
  if(data.picture_file) {
    data.picture = await storeUpload(data.picture_file, carsDir)
    delete data.picture_file
  }
  return context.prisma.car.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteCar(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.car.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Car deleted"}
}
async function createColor(parent, {data}, context, info) {
  return context.prisma.color.create({data:data})
}
async function updateColor(parent, {data,id}, context, info) {

  return context.prisma.color.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteColor(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.color.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Color deleted"}
}
async function createCategory(parent, {data}, context, info) {
  return context.prisma.category.create({data:data})
}
async function updateCategory(parent, {data,id}, context, info) {

  return context.prisma.category.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteCategory(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.category.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Category deleted"}
}

async function createStatus(parent, {data}, context, info) {
  return context.prisma.color.create({data:data})
}
async function updateStatus(parent, {data,id}, context, info) {

  return context.prisma.status.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteStatus(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.status.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Status deleted"}
}

async function createAlbum(parent, {data}, context, info) {
  return context.prisma.album.create({data:data})
}
async function updateAlbum(parent, {data,id}, context, info) {

  return context.prisma.album.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteAlbum(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.album.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Album deleted"}
}

async function createRental(parent, {data}, context, info) {
  return context.prisma.rental.create({data:data})
}
async function updateRental(parent, {data,id}, context, info) {

  return context.prisma.rental.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteRental(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.rental.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Rental deleted"}
}

async function createBeforeRental(parent, {data}, context, info) {
  return context.prisma.before_rental.create({data:data})
}
async function updateBeforeRental(parent, {data,id}, context, info) {

  return context.prisma.before_rental.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteBeforeRental(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.before_rental.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Before rental deleted"}
}


async function createAfterRental(parent, {data}, context, info) {
  return context.prisma.after_rental.create({data:data})
}
async function updateAfterRental(parent, {data,id}, context, info) {

  return context.prisma.after_rental.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteAfterRental(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.after_rental.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"After rental deleted"}
}

async function createTechnicalControl(parent, {data}, context, info) {
  return context.prisma.technical_control.create({data:data})
}
async function updateTechnicalControl(parent, {data,id}, context, info) {

  return context.prisma.technical_control.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteTechnicalControl(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.technical_control.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"Technical Control deleted"}
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
  deleteCustomer,
  createBooking,
  updateBooking,
  deleteBooking,
  createBrand,
  updateBrand,
  deleteBrand,
  createRole,
  updateRole,
  deleteRole,
  createImage,
  updateImage,
  deleteImage,
  createColor,
  updateColor,
  deleteColor,
  createCategory,
  updateCategory,
  deleteCategory,
  createStatus,
  updateStatus,
  deleteStatus,
  createCar,
  updateCar,
  deleteCar,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createRental,
  updateRental,
  deleteRental,
  createBeforeRental,
  updateBeforeRental,
  deleteBeforeRental,
  createAfterRental,
  updateAfterRental,
  deleteAfterRental,
  createInsurance,
  updateInsurance,
  deleteInsurance,
  createTechnicalControl,
  updateTechnicalControl,
  deleteTechnicalControl
}
