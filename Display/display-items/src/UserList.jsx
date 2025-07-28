import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1",
        {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1"
    }
  }
    )
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

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar} alt={user.first_name} width="50" />
            <p>
              {user.first_name} {user.last_name}
            </p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
