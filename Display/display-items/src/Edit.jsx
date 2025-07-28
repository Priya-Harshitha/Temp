import { useEffect, useState } from "react";

function Edit() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({ first_name: "", last_name: "" });

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"
      }
    })
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

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedData({ first_name: user.first_name, last_name: user.last_name });
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = (userId) => {
    fetch(`https://reqres.in/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"
      },
      body: JSON.stringify(editedData)
    })
      .then((res) => res.json())
      .then((data) => {
        // Update local user list
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, ...editedData } : user
          )
        );
        setEditingUserId(null);
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar} alt={user.first_name} width="50" />
            {editingUserId === user.id ? (
              <>
                <input
                  type="text"
                  name="first_name"
                  value={editedData.first_name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="last_name"
                  value={editedData.last_name}
                  onChange={handleInputChange}
                />
                <button onClick={() => handleSave(user.id)}>Save</button>
              </>
            ) : (
              <>
                <p>
                  {user.first_name} {user.last_name}
                </p>
                <p>{user.email}</p>
                <button onClick={() => handleEditClick(user)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Edit;
