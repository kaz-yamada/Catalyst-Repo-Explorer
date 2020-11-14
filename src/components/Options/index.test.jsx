import { fireEvent, render, screen } from "@testing-library/react";

import Options from ".";

describe("Filter and sort options component", () => {
  test("changes value when forked filter button is clicked", () => {
    const handleChange = jest.fn();
    render(<Options onFilterChange={handleChange} />);

    const allRadioButton = screen.getByTestId("filter-all");
    const forkedRadioButton = screen.getByTestId("filter-forked");
    const notForkedRadioButton = screen.getByTestId("filter-not-forked");

    expect(allRadioButton.checked).toEqual(true);

    fireEvent.click(forkedRadioButton, { target: { checked: true } });
    expect(forkedRadioButton.checked).toEqual(true);
    expect(allRadioButton.checked).toEqual(false);

    fireEvent.click(notForkedRadioButton, { target: { checked: true } });
    expect(notForkedRadioButton.checked).toEqual(true);
    expect(allRadioButton.checked).toEqual(false);
    expect(forkedRadioButton.checked).toEqual(false);
  });

  test("triggers function on sort option", () => {
    const handleChange = jest.fn();
    render(<Options onSortChange={handleChange} />);

    const dropdown = screen.getByTestId("sort-dropdown");

    fireEvent.change(dropdown, { target: { value: "created-desc" } });

    expect(handleChange).toHaveBeenCalled();
  });
});
