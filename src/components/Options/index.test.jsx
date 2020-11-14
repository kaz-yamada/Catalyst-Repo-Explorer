import { fireEvent, getByTestId, render } from "@testing-library/react";

import Options from ".";

describe("Filter and sort options component", () => {
  test("changes value when forked filter button is clicked", () => {
    const handleChange = jest.fn();
    const { container } = render(<Options onFilterClick={handleChange} />);

    const radio = getByTestId(container, "all");

    fireEvent.change(radio, { target: { value: "" } });
  });
});
