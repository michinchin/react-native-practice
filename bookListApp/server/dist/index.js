import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// Should be able to add books
// cannot change title and author
const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
    getBookByTitle(title: String): Book
  }
  type Mutation {
    addBook(title: String, author: String): Book
    editBook(oldTitle: String, newTitle: String, newAuthor: String): Book
    deleteBook(title:String, author:String): String
  }
`;
const generateBooks = () => {
    return [{
            title: 'The Catcher in the Rye',
            author: 'JD Salinger',
        },
        {
            title: 'Ender\'s Game',
            author: 'Orson Scott Card',
        },
        {
            title: "The BFG",
            author: 'Roald Dahl'
        }];
};
const books = [...generateBooks()];
const resolvers = {
    Query: {
        books: () => books,
        getBookByTitle: (parent, args, contextValue, info) => books.find((b) => b.title === args.title),
    },
    Mutation: {
        addBook: (parent, args) => {
            const book = { ...args };
            books.push(book);
            return book;
        },
        editBook: (parent, args) => {
            const { oldTitle, newTitle, newAuthor } = args;
            const idx = books.findIndex((b) => b.title === oldTitle);
            if (idx !== -1) {
                const book = { title: newTitle, author: newAuthor };
                books[idx] = book;
                return book;
            }
            return undefined;
        },
        deleteBook: (parent, args) => {
            const { title, author } = args;
            const idx = books.findIndex((b) => b.title === title && b.author == author);
            if (idx !== -1) {
                books.splice(idx, 1);
                return "Success";
            }
            return "Failure to Delete";
        }
    }
};
const server = new ApolloServer({
    typeDefs, resolvers,
});
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 Server ready at ${url}`);
