// Dependencies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Schemas
const schema = buildSchema(`
type About {
  message: String!
}

type Query {
  getAbout: About
}`)

// Resolvers
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  }
}

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