// Dependencies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Schemas
const schema = buildSchema(`
type Query {
  getAbout: About
  getMeal(time: MealType!): Meal
  getPet(id: Int!): Pet
  allPets: [Pet!]!
  getBike(id: Int!): Bike
  allBikes: [Bike!]!
  getTime: [Time!]!
  getRandom(range: Int!): Random
}

type About {
  message: String!
}

type Meal {
  description: String!
}

enum MealType {
  breakfast
  lunch 
  dinner
}

enum DietType {
  ominvore
  paleo
  vegitarian
  vegan
  insectivore
}

type Recipe {
  mealType: MealType!
  dietType: DietType!
}

type Pet {
  name: String!
  species: String!
}

type Bike {
  year: String!
  build: String!
  model: String!
  cc: Float!
  hp: Float!
}

type Time {
  hour: Int!
  minute: Int!
  second: Int!
}

type Random {
  range: Int!
}
`)

// Resolvers
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  },
  getMeal: ({ time }) => {
    const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza' }
    const meal = allMeals[time]
    return { description: meal }
  },
  getPet: ({ id }) => {
    return petList[id]
  },
  allPets: () => {
    return petList
  },
  getBike: ({ id }) => {
    return bikesList[id]
  },
  allBikes: () => {
    return BikesList
  },
  getTime: () => {
    return { hours, minutes, seconds }
  },
  getRandom: ({ range }) => {
    return Math.floor(Math.random() * range)
  },
}

const petList = [
  { name: 'Fluffy', species: 'Dog' },
  { name: 'Sassy', species: 'Cat' },
  { name: 'Goldberg', species: 'Frog' },
]

const bikesList = [
  { year: '2019', build: 'Aprilia', model: 'RSV4RF-LE', cc: '999.6', hp: '201' },
  { year: '2019', build: 'Honda', model: 'CRF250L', cc: '249.6', hp: '22.8' },
  { year: '2008', build: 'Yamaha', model: 'R6', cc: '599', hp: '118' },
  { year: '2007', build: 'Ducati', model: 'SportClassic LE', cc: '992', hp: '96' },
  { year: '1998', build: 'Suzuki', model: 'RM250', cc: '249', hp: '40' },
  { year: '1979', build: 'Honda', model: 'CB750K', cc: '748', hp: '76' },
  { year: '1972', build: 'Yamaha', model: 'GT80', cc: '72', hp: '3.9' },
]

// Create Express App
const app = express()

// Define GraphQL Route
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

// Start App
const port = 4000
app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})