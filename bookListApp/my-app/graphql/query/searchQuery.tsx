import { gql } from "@apollo/client";

export const searchQuery = gql`
    query GetBooks {
        books {
        title
        author
        }
    }
`;

export const addBookQuery = gql`
    mutation CreateBook($title: String, $author: String) {
        addBook(title: $title, author: $author) {
            title
            author
        }
    }
`;

export const editBookQuery = gql`
    mutation EditBook($oldTitle: String, $newTitle: String, $newAuthor: String) {
        editBook (oldTitle: $oldTitle, newTitle: $newTitle, newAuthor: $newAuthor){
        title
        author
        }
    }
`;

export const deleteQuery = gql`
mutation DeleteBook($title: String, $author: String) {
    deleteBook(title: $title, author: $author)
}
`;
