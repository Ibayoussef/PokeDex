import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { isTSAnyKeyword } from "@babel/types";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App></App>, div);
});

it("renders correctly", () => {
  const { getByTestId } = render(<App></App>);
  expect(getByTestId("App")).toHaveTextContent("Loading...");
});

it("matches snapshot", () => {
  const tree = renderer.create(<App></App>).toJSON();
  expect(tree).toMatchSnapshot();
});
