
const { AuthenticationError, SchemaDirectiveVisitor } = require('apollo-server-express')
const {
  GraphQLDirective,
  DirectiveLocation,
  GraphQLList,
  defaultFieldResolver
}  = require("graphql");

class HasRoleDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: "hasRole",
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        roles: {
          type: new GraphQLList(schema.getType("String"))
        }
      }
    });
  }
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const roles = this.args.roles;
    field.resolve = async function(...args) {
      //console.log(args)
      const [, , context] = args;
      //await ensureAuthenticated(context);
      if(!context.user)
        throw new AuthenticationError("You are not authenticated");
      const userRoleId = context.user.roleId;
      //console.log(userRoleId)
      var userRole
      switch(userRoleId){
        case 1:
          userRole = "ADMIN"
          break
        case 2:
          userRole = "GestLocation"
          break;

      }
      console.log(roles)
      if (roles.indexOf(userRole) !== -1) {
        console.log("yes")
        const result = await resolve.apply(this, args);
        console.log(result)
        return result;
      }
      throw new AuthenticationError("You are not authorized for this resource");
    };
  }
}
module.exports = HasRoleDirective
