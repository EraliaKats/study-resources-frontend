import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserInterface, NoUserInterface } from "./Interfaces";

interface CreateResourcePageProps {
  currentUser: UserInterface | NoUserInterface;
  setCurrentUser: (arg0: UserInterface | NoUserInterface) => void;
}

type StateType = { userData: UserInterface }
export default function CreateResourcePage(
  props: CreateResourcePageProps
): JSX.Element {
  const { userData } = useLocation().state as StateType
  console.log("THis is userData", userData, userData.name, Object.keys(userData));
  console.log("This is current User", props.currentUser);

  useEffect(() => props.setCurrentUser(userData));

  return <p>Hello {userData.name}</p>;
}
