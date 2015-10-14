import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export var MyGraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'ExampleQuery',
    description: 'Root query type description',
    fields: {
      hello: {
        type: GraphQLString,
        description: 'Hello to the world',
        resolve() {
          return 'world';
        }
      }
    }
  })
});

