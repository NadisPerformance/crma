const { GraphQLServer } = require('graphql-yoga')
const { AuthenticationError } = require("apollo-server");
//const { prisma } = require('./generated/prisma-client')
const { PrismaClient }= require('@prisma/client') ;
const prisma = new PrismaClient()

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Car = require('./resolvers/Car')
const Booking = require('./resolvers/Booking')

const CarConnection = require('./resolvers/CarConnection')
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
  Booking
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
server.start({port: 4004})
console.log(`Server is running on http://localhost:4004`)
