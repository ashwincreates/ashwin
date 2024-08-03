import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client"

export const getGraphQL = () => {
    const apolloLink = new ApolloLink((operation, forward) => {
        operation.setContext({
        headers: {
            "Authorization": `Bearer ${process.env.GITHUB_KEY}`
        }})
        return forward(operation)
    })
    const httpLink = new HttpLink({
            uri: 'https://api.github.com/graphql',
            fetch
        })
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([apolloLink, httpLink]),
    })
}