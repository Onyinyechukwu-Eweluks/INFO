import { fireEvent, render } from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom/extend-expect";

test("check if the quality option is returning a value", () => {
  const { getByTestId } = render(<Home />);
  const qualityEl = getByTestId("qualityValue");

  fireEvent.select(qualityEl, {
    target: {
      value: "GOOD",
    },
  });
  expect(qualityEl.value).toBeTruthy();
});
