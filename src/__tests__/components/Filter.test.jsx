import { render, screen } from "@testing-library/react";

import Filter from "../../components/Filter";

describe("Filter and sort options component", () => {
  test("changes value when forked filter button is clicked", () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Filter onChange={handleChange} checked={"all"} />
    );

    const allRadioButton = screen.getByTestId("filter-all");
    const forkedRadioButton = screen.getByTestId("filter-forked");
    const notForkedRadioButton = screen.getByTestId("filter-not-forked");

    expect(allRadioButton.checked).toEqual(true);

    rerender(<Filter onChange={handleChange} checked={"forked"} />);
    expect(forkedRadioButton.checked).toEqual(true);
    expect(allRadioButton.checked).toEqual(false);

    rerender(<Filter onChange={handleChange} checked={"not-forked"} />);
    expect(notForkedRadioButton.checked).toEqual(true);
    expect(allRadioButton.checked).toEqual(false);
    expect(forkedRadioButton.checked).toEqual(false);
  });
});
