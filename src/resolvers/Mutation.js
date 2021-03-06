const {encryptPassword, getToken, comparePassword, storeUpload, storeToGoogleStorage} = require('../utils')
const mkdirp = require('mkdirp')
const moment = require('moment')
const {imagesDir, carsDir, customersDir, rentalsDir, technicalControlsDir, carInsurancesDir, billDir} = require('../config')
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

  return context.prisma.user.update({data:data,
              where: {
                id: id *1
              }})
}

async function updateMyProfile(parent, {data}, context, info) {
  console.log(context.user)
  return context.prisma.user.update({data:data,
              where: {
                id: context.user.id *1
              }})
}
async function updateUserPassword(parent, {data,id}, context, info) {
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
async function updateMyPassword(parent, {data}, context, info) {
  let user = data
  if(data.password){
    const hashedPassword = await encryptPassword(data.password)
    user = { ...data, password: hashedPassword }
  }
  return context.prisma.user.update({data:user,
              where: {
                id: context.user.id *1
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
  if(data.scanned_driver_license_file) {
    data.scanned_driver_license = await storeUpload(data.scanned_driver_license_file, customersDir)
    delete data.scanned_driver_license_file
  }
  return context.prisma.customer.create({data:data})
}
async function updateCustomer(parent, {data,id}, context, info) {
  if(data.scanned_driver_license_file) {
    data.scanned_driver_license = await storeUpload(data.scanned_driver_license_file, customersDir)
    delete data.scanned_driver_license_file
  }
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
function getDiffDays(begin, end){
  begin = moment(begin)
  end = moment(end)
  var duration = moment.duration(end.diff(begin));
  var days = duration.asDays();
  return days
}
async function createBill(parent, {data}, context, info) {
  var bill = await context.prisma.bill.create({data:data})
  await context.prisma.rental.update({data:{billId:bill.id*1},
              where: {
                id: bill.rentalId *1
              }})
  var rental = await context.prisma.rental.findOne({
         where:{id: parseInt(bill.rentalId)}
        })
  var car = await context.prisma.car.findOne({
         where:{id: parseInt(rental.carId)}
        })
  var billRow = {
    carId: rental.carId,
    billId: bill.id,
    libelle: "Location véhicule "+ car.plate_number,
    price_ht: car.price* 0.8 ,
    price_ttc: car.price,
    day_nbr: getDiffDays(rental.date_begin, rental.date_end)

  }
  await context.prisma.billRow.create({data:billRow})
  console.log(bill.id)
  return bill
}
async function updateBill(parent, {data,id}, context, info) {
  return context.prisma.bill.update({data:data,
              where: {
                id: id *1
              }})
}

async function deleteBill(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.bill.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"bill deleted"}
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
  if(data.scanned_grey_card_file) {
    data.scanned_grey_card = await storeUpload(data.scanned_grey_card_file, carsDir)
    delete data.scanned_grey_card_file
  }
  return context.prisma.car.create({data:data})
}
async function updateCar(parent, {data,id}, context, info) {
  if(data.picture_file) {
    data.picture = await storeUpload(data.picture_file, carsDir)
    delete data.picture_file
  }
  if(data.scanned_grey_card_file) {
    data.scanned_grey_card = await storeUpload(data.scanned_grey_card_file, carsDir)
    delete data.scanned_grey_card_file
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
  if(data.scanned_contract_file) {
    data.scanned_contract = await storeUpload(data.scanned_contract_file, rentalsDir)
    delete data.scanned_contract_file
  }
  return context.prisma.rental.create({data:data})
}
async function convertBookingToRental(parent, {id}, context, info) {
  const booking = await context.prisma.booking.findOne({
         where:{id: parseInt(id)}
        })
  var rental = {
    bookingId: booking.id,
    date_begin: booking.date_begin,
    date_end: booking.date_end,
    customerId: booking.customerId,
    carId: booking.carId,
    montant_avance: booking.montant_avance,
    comment: booking.comment
  }
  return context.prisma.rental.create({data:rental})
}
async function updateRental(parent, {data,id}, context, info) {
  if(data.scanned_contract_file) {
    data.scanned_contract = await storeUpload(data.scanned_contract_file, rentalsDir)
    delete data.scanned_contract_file
  }
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
  if(data.scanned_technical_control_file) {
    data.scanned_technical_control = await storeUpload(data.scanned_technical_control_file, technicalControlsDir)
    delete data.scanned_technical_control_file
  }
  return context.prisma.technical_control.create({data:data})
}
async function updateTechnicalControl(parent, {data,id}, context, info) {
  if(data.scanned_technical_control_file) {
    data.scanned_technical_control = await storeUpload(data.scanned_technical_control_file, technicalControlsDir)
    delete data.scanned_technical_control_file
  }
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

async function createCarInsurance(parent, {data}, context, info) {
  if(data.scanned_car_insurance_file) {
    data.scanned_car_insurance = await storeUpload(data.scanned_car_insurance_file, carInsurancesDir)
    delete data.scanned_car_insurance_file
  }
  return context.prisma.car_insurance.create({data:data})
}
async function updateCarInsurance(parent, {data,id}, context, info) {
  if(data.scanned_car_insurance_file) {
    data.scanned_car_insurance = await storeUpload(data.scanned_car_insurance_file, carInsurancesDir)
    delete data.scanned_car_insurance_file
  }
  return context.prisma.car_insurance.update({data:data,
              where: {
                id: id *1
              }})
}
async function deleteCarInsurance(parent, {id}, context, info) {
   var data={deleted:true}
   await context.prisma.car_insurance.update({data:data,
              where: {
                id: id *1
              }})
   return {statut_code:1, message:"car Insurance deleted"}
}

module.exports = {
  login,
  signup,
  forgotPassword,
  recoverPassword,
  createUser,
  updateUser,
  updateUserPassword,
  updateMyProfile,
  updateMyPassword,
  deleteUser,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  createBill,
  updateBill,
  deleteBill,
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
  convertBookingToRental,
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
  deleteTechnicalControl,
  createCarInsurance,
  updateCarInsurance,
  deleteCarInsurance
}
