import React, { useEffect, useState } from "react";
import axios from "../../axios";
import TodoList from "../TodoList";
import { Container } from "./styles";
import { performRequestWithRetry } from "../../performRequestWithRetry";
function Todo() {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([{}]);

  
  const fetchData = async () => {
    try {
      const options = {
        method: 'GET',
      };
      const response = await performRequestWithRetry('/books',options);
      setBooks(response.data);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <Container>
      <h2>List of Books </h2>
      <TodoList books={books} fetchData={fetchData} />
    </Container>
  );
}

export default Todo;
