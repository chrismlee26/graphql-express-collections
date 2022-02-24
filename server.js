// Dependencies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Schemas
const schema = buildSchema(`
type Query {
  getAbout: About
  getMeal(time: MealTime!): Meal
  getPet(id: Int!): Pet
  allPets: [Pet!]!
  getBike(id: Int!): Bike
  allBikes: [Bike!]!
}

type About {
  message: String!
}

type Meal {
  description: String!
}

enum MealTime {
  breakfast
  lunch 
  dinner
}

type Pet {
  name: String!
  species: String!
}

type Bike {
  year: String!
  build: String!
  Model: String!
  cc: Float!
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
  }


}

const petList = [
  { name: 'Fluffy', species: 'Dog' },
  { name: 'Sassy', species: 'Cat' },
  { name: 'Goldberg', species: 'Frog' }
]

const bikesList = [
  { year: '2019', build: 'Aprilia', model: 'RSV4RF-LE', cc: '999.6' },
  { year: '2019', build: 'Honda', model: 'CRF250L', cc: '249.6' },
  { year: '2008', build: 'Yamaha', model: 'R6', cc: '599' },
  { year: '2007', build: 'Ducati', model: 'SportClassic LE', cc: '992' },
  { year: '1998', build: 'Suzuki', model: 'RM250', cc: '249' },
  { year: '1979', build: 'Honda', model: 'CB750K', cc: '748' },
  { year: '1972', build: 'Yamaha', model: 'GT80', cc: '72' },
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