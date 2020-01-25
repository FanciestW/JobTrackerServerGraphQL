const { User } = require('./models/User');

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        uid: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        passwordDigest: { type: GraphQLString },
        createAt: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            // Arguments passed while making the query.
            args: {
                uid: { type: GraphQLID },
                email: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                // Here we define how to get data from database source.

                // this will return the book with id passed in argument.
                return await User.findOne({ $or: [{ email: args.email }, { uid: args.uid }] });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
