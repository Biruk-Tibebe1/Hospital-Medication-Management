import React, { useEffect, useState } from 'react';

interface Item {
  _id: string;
  name: string;
}

const ItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch items from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(setItems);
  }, []);

  // Add new item
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem }),
    });
    const item = await res.json();
    setItems(prev => [...prev, item]);
    setNewItem('');
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Items from Backend</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          className="border px-2 py-1 rounded"
          placeholder="New item name"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded"
          disabled={loading}
        >
          Add
        </button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id} className="py-1 border-b">{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;