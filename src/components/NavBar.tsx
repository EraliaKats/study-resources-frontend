import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//eslint-disable-next-line
import { baseURL, frontendURL } from "../utils/URL";
import { NoUserInterface, UserInterface } from "./Interfaces";

interface NavBarProps {
  currentUser: UserInterface | NoUserInterface;
  setCurrentUser: (arg0: UserInterface | NoUserInterface) => void;
}
export default function NavBar(props: NavBarProps): JSX.Element {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get(`${baseURL}/users`);
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  if (props.currentUser.user_id === "not-signed-in") {
    return (
      <section>
        <select
          value={props.currentUser.user_id}
          onChange={(e) => {
            const selectedId = parseInt(e.target.value);
            const selectedUser: UserInterface[] = users.filter(
              (user) => user.user_id === selectedId
            );
            props.setCurrentUser(selectedUser[0]);
          }}
        >
          <option>Choose user...</option>
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.name}
            </option>
          ))}
        </select>
      </section>
    );
  }
  //wait until currentUser is loaded before rendering when redirected to other pages
  else {
    return (
      <section>
        <nav>
          <Link to={"/"} state={{ userData: props.currentUser }}>
            Home
          </Link>
          <Link to={"/create"} state={{ userData: props.currentUser }}>
            Create Resource
          </Link>
          <Link to={"/study-list"} state={{ userData: props.currentUser }}>
            My Study List
          </Link>
          <Link
            to={"/"}
            onClick={() => props.setCurrentUser({ user_id: "not-signed-in" })}
            state={{ userData: props.currentUser }}
          >
            Sign-out from{" "}
            {props.currentUser && props.currentUser.name
              ? props.currentUser.name
              : "Not loaded yet"}
          </Link>
        </nav>
      </section>
    );
  }
}
