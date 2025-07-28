import { useEffect, useState } from "react";

function Add() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Simulate delete locally
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  const handleAdd = () => {
    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        const addedUser = {
          id: Math.random(), // Fake id
          ...newUser,
          avatar: "https://via.placeholder.com/150", // fake avatar
        };
        setUsers([...users, addedUser]);
        setNewUser({ first_name: "", last_name: "", email: "" });
      })
      .catch((err) => console.error("Error adding user:", err));
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>All Users</h2>

      {/* Add User Form */}
      <div>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="First Name"
          value={newUser.first_name}
          onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.last_name}
          onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAdd}>Add User</button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar} alt={user.first_name} width="50" />
            <p>
              {user.first_name} {user.last_name}
            </p>
            <p>{user.email}</p>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Add;
