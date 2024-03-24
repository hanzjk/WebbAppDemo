import {useState} from "react";
import axios from "../../axios";
import BookModal from "../Form";
import {BookInfo,BookRow,BooksContainer,Checkbox,StatusCheckboxContainer,DeleteButton,AddButton} from "./styles";
import { performRequestWithRetry } from "../../performRequestWithRetry";
function TodoList({ books, fetchData }) {

  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleStatusChange = async (uuid, newStatus) => {
    try {

      const options = {
        method: 'PUT',
        data:{
          status:newStatus
        }
      };
      const response = await performRequestWithRetry(`/books/${uuid}`,options);
      console.log('Book updated:', response.data);
      fetchData();
      // Optionally, refresh the list of books here if your UI does not automatically update
    } catch (error) {
      console.error('Error updating book:', error);
      // Handle errors, such as displaying a message to the user
    }
  }

  const handleAddBook = async (book) => {
    try {
      const options = {
        method: 'POST',
        data:book
      };
      const response = await performRequestWithRetry('/books',options);
      console.log('Book added:', response.data);
      setIsModalOpen(false); // Close the modal on success
      fetchData();
      // Optionally, refresh the list of books here if your UI does not automatically update
    } catch (error) {
      console.error('Error adding book:', error);
      // Handle errors, such as displaying a message to the user
    }
  };

  const handleDeleteBook = async (uuid) => {
    try {
      const options = {
        method: 'DELETE',
      };
      await performRequestWithRetry(`/books/${uuid}`,options);
      fetchData(); // Refresh the list of books after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
    return (
    <div>
       <BooksContainer>

       <BooksContainer>
        <AddButton onClick={() => setIsModalOpen(true)}>Add Book</AddButton>
        <br></br>
        <br></br>

      </BooksContainer>
      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBook}
      />

     
      {Object.entries(books).length>0 && Object.entries(books).map(([uuid, book]) => (
        <BookRow key={uuid}>
          <BookInfo>
            <strong>Title:</strong> {book.title}<br/>
            <strong>Author:</strong> {book.author}
          </BookInfo>
          <div>
            <StatusCheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={book.status === 'to_read'}
                onChange={() => handleStatusChange(uuid, 'to_read')}
              />
              To Read
            </StatusCheckboxContainer>
            <StatusCheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={book.status === 'reading'}
                onChange={() => handleStatusChange(uuid, 'reading')}
              />
              Reading
            </StatusCheckboxContainer>
            <StatusCheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={book.status === 'read'}
                onChange={() => handleStatusChange(uuid, 'read')}
              />
              Completed
            </StatusCheckboxContainer>
          </div>
          <DeleteButton onClick={() => handleDeleteBook(uuid)}>Delete</DeleteButton>

        </BookRow>
      ))}
    </BooksContainer>
    </div>
  );
}

export default TodoList;
