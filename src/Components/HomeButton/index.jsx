import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../services/routes";

export default function HomeButton() {
  return <Link to={routes.root.path}>Home</Link>;
}
