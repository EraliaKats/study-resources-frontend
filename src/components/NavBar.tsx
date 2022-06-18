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
      <section className="navbar navbar-dark bg-dark">
        <select
          className="m-2 btn btn-primary dropdown-toggle"
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
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-nav">
            <Link to={"/"} state={{ userData: props.currentUser }}>
              <button className="nav-link btn">Home</button>
            </Link>
            <Link to={"/create"} state={{ userData: props.currentUser }}>
              <button className="nav-link btn">Create Resource</button>
            </Link>
            <Link to={"/study-list"} state={{ userData: props.currentUser }}>
              <button className="nav-link btn"> My Study List</button>
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <Link
              to={"/"}
              onClick={() => props.setCurrentUser({ user_id: "not-signed-in" })}
              state={{ userData: props.currentUser }}
            >
              <button className="btn btn-danger ">
                {" "}
                Sign-out from{" "}
                {props.currentUser && props.currentUser.name
                  ? props.currentUser.name
                  : "Not loaded yet"}
              </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
