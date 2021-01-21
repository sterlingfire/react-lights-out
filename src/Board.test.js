import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./board";

it("Should display a cell", function (){
  render(<Board />);
});

it("Should display an empty Board", function (){
  expect(render(<Board chanceLightStartsOn={0} />).asFragment())
  .toMatchSnapshot();
});
it("Should display a full Board", function (){
  expect(render(<Board chanceLightStartsOn={1} />).asFragment())
  .toMatchSnapshot();
});
