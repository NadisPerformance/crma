const { GraphQLServer } = require('graphql-yoga')
const { AuthenticationError } = require("apollo-server");
const path = require('path');
const express= require('express')
const { generateContract } = require('./helpers/contractToPdf')
//const { prisma } = require('./generated/prisma-client')
const { PrismaClient }= require('./prisma-client') ;
const prisma = new PrismaClient()

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Car = require('./resolvers/Car')
const Booking = require('./resolvers/Booking')
const Rental = require('./resolvers/Rental')
const Image = require('./resolvers/Image')
const Album = require('./resolvers/Album')
const Customer = require('./resolvers/Customer')
const After_rental = require('./resolvers/After_rental')
const Before_rental = require('./resolvers/Before_rental')
const Car_insurance = require('./resolvers/Car_insurance')

const After_rentalConnection = require('./resolvers/After_rentalConnection')
const Before_rentalConnection = require('./resolvers/Before_rentalConnection')
const CarConnection = require('./resolvers/CarConnection')
const AlbumConnection = require('./resolvers/AlbumConnection')
const BookingConnection = require('./resolvers/BookingConnection')
const RentalConnection = require('./resolvers/RentalConnection')
const ImageConnection = require('./resolvers/ImageConnection')
const UserConnection = require('./resolvers/UserConnection')
const IsAdminDirective = require("./directives/isAdminDirective");
const LoginResponse = require('./resolvers/LoginResponse')
const {getPayload} = require('./utils')

// 2
const resolvers = {
  Query,
  Mutation,
  User,
  UserConnection,
  LoginResponse,
  Car,
  CarConnection,
  Booking,
  Rental,
  Image,
  Album,
  Customer,
  Car_insurance,
  After_rental,
  Before_rental,
  AlbumConnection,
  ImageConnection,
  BookingConnection,
  RentalConnection,
  After_rentalConnection,
  Before_rentalConnection
}

const authenticate = async (resolve, root, args, context, info) => {
    let token;
    //try {
        token = context.req.get("Authorization")
        console.log(token)
        const { user, loggedIn } = getPayload(token);
    /*} catch (e) {
        return new AuthenticationError("Not authorised");
    }
    */
    context.user = token.user;
    const result = await resolve(root, args, context, info);
    return result;
};
// 3
const server = new GraphQLServer({
  typeDefs:'./src/schema.graphql',
  resolvers,
  //context: { prisma },
  context: ({ request}) => {
    // get the user token from the headers
    const token = request.headers.authorization || '';
    // try to retrieve a user with the token
    //console.log(token)
    const { user, loggedIn } = getPayload(token);
    //console.log(user)
    // add the user to the context
    return { prisma, user, loggedIn };
  },
  schemaDirectives: {
    isAdmin: IsAdminDirective
  },
  //middlewares: [authenticate]
})
const moment = require('moment') ;
server.express.get("/contracts/download", async function(req, res) {
  //res.send("OKoo") ;
  // end and display the document in the iframe to the right
  if(!req.query.rentalId)
    return res.send("Rental id not given")
    let rentalId = req.query.rentalId
    prisma.rental.findOne({
  		 where:{id: parseInt(rentalId) }
     }).then(async (rental)=>{
      if(!rental)
        return res.send("rental not found")
      rental.date_begin = moment(rental.date_begin).format("DD/MM/YYYY")
      rental.date_end = moment(rental.date_end).format("DD/MM/YYYY")
      rental.car = await prisma.car.findOne({where:{id:rental.carId}})
      rental.customer = await prisma.customer.findOne({where:{id:rental.customerId}})
      if(rental.car)
        rental.car.brand = await prisma.brand.findOne({where:{id:rental.car.brandId}})
      console.log(rental)
      generateContract(res,rental) ;
    })

});
server.express.use( '/static',express.static('public'))
server.start({port: 4008})
console.log(`Server is running on http://localhost:4008`)
