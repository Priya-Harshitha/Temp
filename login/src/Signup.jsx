import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "x-api-key": "reqres-free-v1"
         },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Signup Successful");
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Signup Failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
