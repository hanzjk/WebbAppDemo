import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Modal background with animation
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

// Modal content area with more styling
const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Styled form fields
const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
`;

// Styled buttons
const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.2s ease-in-out;

  &:first-of-type {
    background-color: #007bff;
    color: white;
  }

  &:last-of-type {
    background-color: #dc3545;
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const BookModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('to_read');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, status });
    onClose(); // Close modal after submission
    setTitle('');
    setAuthor('');
    setStatus('to_read');
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title: </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Author: </label>
            <Input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Status: </label>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="to_read">To Read</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
            </Select>
          </div>
          <div>

            <br></br>
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default BookModal;
