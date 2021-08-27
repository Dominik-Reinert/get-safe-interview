import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../routes/routes";

interface SummaryStepProps {
  firstName: string;
  name: string;
  email: string;
  age: number;
}

const SummaryStep: React.FC<SummaryStepProps> = (props) => {
  return (
    <>
      <div>FirstName: {props.firstName}</div>
      <div>Name: {props.name}</div>
      <div>Email: {props.email}</div>
      <div>Age: {props.age}</div>
      <div>
        <Link to={Routes.SUCCESS}>Purchase</Link>
      </div>
    </>
  );
};

export default SummaryStep;
