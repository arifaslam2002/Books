import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"
const App = () => {
  const API = "http://localhost:5000/api/books";
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    department: "",
    condition: "",
    ownerName: "",
  });
  const [editId, setEditId] = useState(null);

  const getBooks = async () => {
    try {
      const res = await axios.get(API);
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(API, form);
      }

      setForm({
        title: "",
        author: "",
        department: "",
        condition: "",
        ownerName: "",
      });
      getBooks();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      department: book.department,
      condition: book.condition,
      ownerName: book.ownerName,
    });
    setEditId(book._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h1>Student Book Exchange</h1>
      <form className="form" onSubmit={handleSubmit}>
      <h2>Form for Adding New Book</h2>
        <input
          name="title"
          type="text"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="author"
          placeholder="Book author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="department"
          placeholder="department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <br />
        <select 
          name="condition" 
          value={form.condition} 
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select condition</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
        </select>
        <br />
        <input
          type="text"
          name="ownerName" // 
          placeholder="Owner Name"
          value={form.ownerName}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">{editId ? "Update Book" : "Add Book"}</button>
        
      </form>
      <hr />
      <h2>Available Books</h2>
      
      {books?.map((book) => (
        <div key={book._id}>
          <h3>Title: {book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Department: {book.department}</p>
          <p>Condition: {book.condition}</p>
          <p>Owner: {book.ownerName}</p>
          <button onClick={() => handleEdit(book)}>Edit</button>
          <button onClick={() => handleDelete(book._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
