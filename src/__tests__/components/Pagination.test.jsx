import { fireEvent, render, screen } from "@testing-library/react";

import Pagination from "../../components/Pagination";

describe("Pagination component", () => {
  test("should render the correct amount of dropdown items", () => {
    const props = { currentPage: 1, totalPages: 12 };
    render(<Pagination {...props} />);

    expect(screen.getByTestId("dropdown-list")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("dropdown-button"));
    fireEvent.click(screen.getByTestId("dropdown-button"));
  });

  test("should return a number when a page is selected", () => {
    const handleClick = jest.fn();
    const props = { currentPage: 1, totalPages: 12, onChange: handleClick };
    render(<Pagination {...props} />);

    fireEvent.click(screen.getAllByText("2")[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getAllByText("5")[0]);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
