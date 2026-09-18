import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all notes on initial mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await axios.post(API_URL, { title, content });
      // prepend the new note so it shows up immediately at the top
      setNotes((prevNotes) => [res.data, ...prevNotes]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Student Notes</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          style={{ display: "block", width: "100%", marginBottom: "8px", padding: "8px" }}
        />
        <button type="submit">Add Note</button>
      </form>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes yet — add one above!</p>
      ) : (
        <div>
          {notes.map((note) => (
            <div
              key={note._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "12px",
                marginBottom: "12px",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0" }}>{note.title}</h3>
              <p style={{ margin: "0 0 8px 0" }}>{note.content}</p>
              <small style={{ color: "#666" }}>
                {new Date(note.createdAt).toLocaleString()}
              </small>
              <div style={{ marginTop: "8px" }}>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
