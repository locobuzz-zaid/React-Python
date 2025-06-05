import React, { useEffect, useState } from "react";
import axios from "axios";

// Dummy: Replace with your real token retrieval logic
const getToken = () => localStorage.getItem("access_token");

const api = axios.create({
  baseURL: "http://localhost:8000/api/blog",
  headers: {
    "Content-Type": "application/json",
  },
});

const Navbar = () => (
  <nav
    style={{
      background: "#1976d2",
      color: "#fff",
      padding: "1rem",
      textAlign: "center",
    }}
  >
    <h2>Todo List App</h2>
  </nav>
);

const Footer = () => (
  <footer
    style={{
      background: "#1976d2",
      color: "#fff",
      padding: "0.5rem",
      textAlign: "center",
      position: "fixed",
      width: "100%",
      bottom: 0,
    }}
  >
    <small>&copy; {new Date().getFullYear()} Todo App</small>
  </footer>
);

const Notes = () => {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [editIdx, setEditIdx] = useState(null);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await api.get("http://localhost:8000/api/blog", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTodos(res.data);
    } catch (err) {
      alert("Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add or update todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIdx === null) {
        await api.post(
          "http://localhost:8000/api/add-blog",
          { id: Math.random(), title: form.title, body: form.body, user_id: 1 }, // user_id as required by your backend
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
      } else {
        await api.put(
          `http://localhost:8000/api/update-blog/${todos[editIdx].id}`,
          { title: form.title, body: form.body, user_id: 1 },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
      }
      setForm({ title: "", body: "" });
      setEditIdx(null);
      fetchTodos();
    } catch (err) {
      alert("Failed to save todo");
    }
  };

  // Edit
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setForm({ title: todos[idx].title, body: todos[idx].body });
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:8000/api/delete-blog/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchTodos();
    } catch (err) {
      alert("Failed to delete todo");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "3rem",
        background: "#f5f5f5",
      }}
    >
      <Navbar />
      <div
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          background: "#fff",
          padding: "2rem",
          borderRadius: 8,
          boxShadow: "0 2px 8px #0001",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: 8, marginBottom: 16 }}
        >
          <input
            name="title"
            placeholder="Todo Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ flex: 2, padding: 8 }}
            required
          />
          <input
            name="body"
            placeholder="Description"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            style={{ flex: 3, padding: 8 }}
          />
          <button
            type="submit"
            style={{
              padding: "0 16px",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 4,
            }}
          >
            {editIdx === null ? "Add" : "Update"}
          </button>
        </form>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e3e3e3" }}>
              <th style={{ padding: 8, border: "1px solid #ddd" }}>Title</th>
              <th style={{ padding: 8, border: "1px solid #ddd" }}>
                Description
              </th>
              <th style={{ padding: 8, border: "1px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  style={{ textAlign: "center", padding: 16, color: "#888" }}
                >
                  No todos yet.
                </td>
              </tr>
            ) : (
              todos.map((todo, idx) => (
                <tr key={todo.id}>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>
                    {todo.title}
                  </td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>
                    {todo.body}
                  </td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>
                    <button
                      onClick={() => handleEdit(todo?.id)}
                      style={{
                        marginRight: 8,
                        background: "#ffc107",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: 4,
                      }}
                    >
                      Edit
                    </button>
                    {console.log("Todo ID:", todo)}
                    <button
                      onClick={() => handleDelete(todo?.id)}
                      style={{
                        background: "#d32f2f",
                        color: "#fff",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: 4,
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Notes;
