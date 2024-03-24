import styled from "styled-components";

export const BooksContainer = styled.div`
  padding: 20px;
`;

export const BookRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

export const BookInfo = styled.div`
  flex: 1;
`;

export const StatusCheckboxContainer = styled.label`
  margin: 0 5px;
`;

export const Checkbox = styled.input`
  margin-right: 5px;
`;

export const DeleteButton = styled.button`
  padding: 5px 10px;
  margin-left:60px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff7875;
  }
`;

export const AddButton = styled.button`
  padding: 10px 10px;
  background-color: #00308F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width:100%
`;

export const LoginButton = styled.button`
  padding: 10px 10px;
  background-color: #00308F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width:50%
`;

export const LogutButton = styled.button`
  padding: 10px 10px;
  background-color: #00308F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left:95%;
  margin-bottom:2%;

`;
