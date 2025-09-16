import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null); // track which item is being edited

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`http://localhost:5000/api/items/${editingId}`, form);
      setEditingId(null); // stop editing
    } else {
      await axios.post("http://localhost:5000/api/items", form);
    }

    setForm({ name: "", description: "" });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({ name: item.name, description: item.description });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">HAHAHHAHAHA</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="border p-2 mr-2 rounded-md"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2 mr-2 rounded-md"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", description: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <ul>
        {items.map((item) => (
          <li key={item._id} className="flex justify-between border-b py-2">
            <span>
              {item.name} - {item.description}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-green-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
