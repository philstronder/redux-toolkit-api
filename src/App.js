import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersAsync,
  addUser,
  removeUser,
} from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(addUser({ id: users.length + 1, name: newUserName }));
  };

  const handleRemoveUser = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Enter new user name"
      />
      <button onClick={handleAddUser}>Add User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}{" "}
            <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
