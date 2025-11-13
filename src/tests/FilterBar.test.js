import { render, screen, fireEvent } from "@testing-library/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FilterBar from "../components/FilterBar";

describe("FilterBar Component", () => {
  let mockFilter, mockReset;

  beforeEach(() => {
    mockFilter = jest.fn();
    mockReset = jest.fn();

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FilterBar onFilter={mockFilter} onReset={mockReset} />
      </LocalizationProvider>
    );
  });

  test("renders heading and inputs", () => {
    expect(screen.getByText("Filter User Transactions")).toBeInTheDocument();
    expect(screen.getByLabelText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  test("updates filters when typing in Customer Name", () => {
    const input = screen.getByLabelText("Customer Name");
    fireEvent.change(input, { target: { value: "John Doe" } });
    expect(input.value).toBe("John Doe");
  });

  test("calls onFilter with current filters when Search clicked", () => {
    const input = screen.getByLabelText("Customer Name");
    fireEvent.change(input, { target: { value: "Jane" } });

    fireEvent.click(screen.getByText("Search"));
    expect(mockFilter).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Jane" })
    );
  });

  test("calls onReset and clears inputs", () => {
    const input = screen.getByLabelText("Customer Name");
    fireEvent.change(input, { target: { value: "ResetMe" } });

    fireEvent.click(screen.getByText("Reset"));
    expect(mockReset).toHaveBeenCalled();
    expect(input.value).toBe("");
  });
});
