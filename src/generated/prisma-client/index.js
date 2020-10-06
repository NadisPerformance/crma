"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Employe",
    embedded: false
  },
  {
    name: "Client",
    embedded: false
  },
  {
    name: "Person",
    embedded: false
  },
  {
    name: "Structure",
    embedded: false
  },
  {
    name: "Contact",
    embedded: false
  },
  {
    name: "Country",
    embedded: false
  },
  {
    name: "Department",
    embedded: false
  },
  {
    name: "DevisModele",
    embedded: false
  },
  {
    name: "Document",
    embedded: false
  },
  {
    name: "DocumentType",
    embedded: false
  },
  {
    name: "EmpInfo",
    embedded: false
  },
  {
    name: "Entity",
    embedded: false
  },
  {
    name: "File",
    embedded: false
  },
  {
    name: "Job",
    embedded: false
  },
  {
    name: "LegalType",
    embedded: false
  },
  {
    name: "Maction",
    embedded: false
  },
  {
    name: "Movement",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
