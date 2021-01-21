import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Cell from "./cell";

it("Should display a cell", function (){
  render(<Cell coord={"0-0"} cell-lit={true}/>);
});

it("Should display a cell", function (){
  expect(render(<Cell coord={"0-0"} cell-lit={true}/>).asFragment())
  .toMatchSnapshot();
});
