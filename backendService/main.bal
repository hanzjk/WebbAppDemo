
import ballerina/http;

service /hello on new http:Listener(8090) {
    resource function get greeting() returns string {
        return "Hello, World!";
    }
}

// import ballerina/uuid;
// import ballerina/http;
// import ballerina/jwt;
// import ballerina/io;

// enum Status {
//     reading = "reading",
//     read = "read",
//     to_read = "to_read"
// }

// type BookItem record {|
//     string title;
//     string author;
//     string status;
// |};

// type Book record {|
//     *BookItem;
//     string id;
// |};


// map<map<Book>> books = {
//         "ccd06f36-e2db-4701-a124-0888a32f6d40@carbon.super": {
//             "1": {title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "reading", id: "1"},
//             "2": {title: "The Great Gatsby 2", author: "F. Scott Fitzgerald", status: "reading", id: "2"},
//             "3": {title: "The Great Gatsby 3", author: "F. Scott Fitzgerald", status: "reading", id: "3"}
//         },
//         "ccd06f36-e2db-4701-a124-0888a32f6d40@carbon.super-1": {
//         "1": {title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "reading", id: "1"},
//         "2": {title: "The Great Gatsby 2", author: "F. Scott Fitzgerald", status: "reading", id: "2"},
//         "3": {title: "The Great Gatsby 3", author: "F. Scott Fitzgerald", status: "reading", id: "3"}
//     }
// };


// const string DEFAULT_USER = "default";

// service /readinglist on new http:Listener(9090) {

//     resource function get books(http:Headers headers) returns Book[]|http:BadRequest|error {
//         map<Book>|http:BadRequest usersBooks = check getUsersBooks(headers);
//         if (usersBooks is map<Book>) {
//             return usersBooks.toArray();
//         }
//         return <http:BadRequest>usersBooks;
//     }

//     resource function post books(http:Headers headers,
//             @http:Payload BookItem newBook) returns http:Created|http:BadRequest|error {

//         string bookId = uuid:createType1AsString();
//         map<Book>|http:BadRequest usersBooks = check getUsersBooks(headers);
//         if (usersBooks is map<Book>) {
//             usersBooks[bookId] = {...newBook, id: bookId};
//             map<string> locationHeader = {"Location": "/readinglist/books/" + bookId};
//             return <http:Created>{headers: locationHeader};
//         }
//         return <http:BadRequest>usersBooks;
//     }

//     resource function get books/[string bookId](http:Headers headers) returns http:NotFound|http:BadRequest|Book|error {
        
//         //Get the booklist that belongs to the logged in user.
//         map<Book>|http:BadRequest usersBooks = check getUsersBooks(headers);
//         if (usersBooks is map<Book>) {
//             if (usersBooks.hasKey(bookId)) {
//                 //Return matched book.
//                 return usersBooks.get(bookId);
//             }
//             //Return 404 not found since matching book hasn't been found.
//             return <http:NotFound>{};
//         }
//         else {
//             return <http:BadRequest>{};
//         }
//     }

//     resource function delete books(http:Headers headers,
//                                    string id) returns http:Ok|http:BadRequest|error? {
//         map<Book>|http:BadRequest usersBooks = check getUsersBooks(headers);
//         if (usersBooks is map<Book>) {
//             _ = usersBooks.remove(id);
//             return <http:Ok>{};
//         }
//         return <http:BadRequest>usersBooks;
//     }
// }

// // This function is used to get the books of the user who is logged in.
// // User information is extracted from the JWT token.
// function getUsersBooks(http:Headers headers) returns map<Book>|http:BadRequest|error {
//         string|error jwtAssertion = headers.getHeader("API-Key");
//         if (jwtAssertion is error) {
//             http:BadRequest badRequest = {
//                 body: {
//                     "error": "Bad Request",
//                     "error_description": "Error while getting the JWT token"
//                 }
//             };
//             return badRequest;
//         }

//         [jwt:Header, jwt:Payload] [_, payload] = check jwt:decode(jwtAssertion);
//         string username = payload.sub is string ? <string>payload.sub : DEFAULT_USER;
//         io:println(username);
//         if (books[username] is ()) {
//             books[username] = {};
//         }
//         return <map<Book>>books[username];
//     }
