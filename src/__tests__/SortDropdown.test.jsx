import { fireEvent, render, screen } from "@testing-library/react";

import SortDropdown from "../components/SortDropdown";

describe("Sort dropdown component", () => {
  test("triggers function on sort option", () => {
    const handleChange = jest.fn();
    render(<SortDropdown onChange={handleChange} />);

    const dropdown = screen.getByTestId("sort-dropdown");

    fireEvent.change(dropdown, { target: { value: "created-desc" } });

    expect(handleChange).toHaveBeenCalled();
  });
});
