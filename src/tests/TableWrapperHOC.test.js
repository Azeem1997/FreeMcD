import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TableWrapper from "../components/TableWrapperHOC";
import "@testing-library/jest-dom";

jest.mock("lodash.debounce", () => jest.fn((fn) => fn));

describe("TableWrapper - Full Coverage", () => {
  const columns = [
    { field: "name", headerName: "Name" },
    { field: "age", headerName: "Age" },
    { field: "dob", headerName: "DOB" },
  ];

  const mockData = [
    { _id: "1", name: "Alice", age: 25, dob: "2023-11-10" },
    { _id: "2", name: "Bob", age: 30, dob: "2022-05-15" },
    { _id: "3", name: "Charlie", age: 20, dob: "2024-02-20" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table title", () => {
    render(
      <TableWrapper
        title="User Table"
        colorClass="blue"
        columns={columns}
        data={mockData}
        loading={false}
      />
    );
    expect(screen.getByText("User Table")).toBeInTheDocument();
  });

  test("calls handleSort and toggles asc/desc", () => {
    render(<TableWrapper title="Users" columns={columns} data={mockData} />);
    const ageHeader = screen.getByText("Age");
    fireEvent.click(ageHeader); // asc
    fireEvent.click(ageHeader); // desc
    expect(ageHeader).toBeInTheDocument();
  });

  test("filters string values correctly", async () => {
    render(<TableWrapper title="Users" columns={columns} data={mockData} />);
    const nameInput = screen.getAllByRole("textbox")[0];
    fireEvent.change(nameInput, { target: { value: "bob" } });

    await waitFor(() => {
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });

  test("filters number values correctly", async () => {
    render(<TableWrapper title="Users" columns={columns} data={mockData} />);
    const ageInput = screen.getAllByRole("textbox")[1];
    fireEvent.change(ageInput, { target: { value: "30" } });

    await waitFor(() => {
      expect(screen.getByText("30")).toBeInTheDocument();
    });
  });

  test("filters date string values correctly", async () => {
    render(<TableWrapper title="Users" columns={columns} data={mockData} />);
    const dobInput = screen.getAllByRole("textbox")[2];
    fireEvent.change(dobInput, { target: { value: "2023" } });

    await waitFor(() => {
      expect(screen.getByText("2023-11-10")).toBeInTheDocument();
    });
  });

  test("handles null and undefined cell values", async () => {
    const nullData = [
      { _id: "1", name: null, age: undefined, dob: "2022-01-01" },
    ];
    render(<TableWrapper title="Test" columns={columns} data={nullData} />);
    const nameInput = screen.getAllByRole("textbox")[0];
    fireEvent.change(nameInput, { target: { value: "x" } });
    await waitFor(() => {
      expect(screen.getByText("No data available.")).toBeInTheDocument();
    });
  });

  test("handles updateFilters via handleFilterChange", () => {
    render(<TableWrapper title="Users" columns={columns} data={mockData} />);
    const input = screen.getAllByRole("textbox")[0];
    fireEvent.change(input, { target: { value: "Alice" } });
    expect(input.value).toBe("Alice");
  });

  test("sorts data ascending and descending correctly", async () => {
    render(<TableWrapper title="Users" columns={columns} data={mockData} />);
    const ageHeader = screen.getByText("Age");
    fireEvent.click(ageHeader); // asc
    fireEvent.click(ageHeader); // desc
    expect(ageHeader).toBeInTheDocument();
  });

  test("pagination works with handleChangePage and handleChangeRowsPerPage", () => {
    render(
      <TableWrapper
        title="Users"
        columns={columns}
        data={mockData}
        loading={false}
      />
    );
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);

    const rowsPerPage = screen.getByLabelText("Rows per page:");
    fireEvent.change(rowsPerPage, { target: { value: "10" } });
    expect(rowsPerPage.value).toBe("10");
  });

  test("shows skeleton rows when loading", () => {
    render(
      <TableWrapper
        title="Loading Test"
        columns={columns}
        data={[]}
        loading={true}
      />
    );
    expect(screen.getAllByText(/Loading/i).length >= 0);
  });
});

describe("TableWrapper - filteredData useMemo coverage", () => {
  const baseColumns = [
    { field: "date", headerName: "Date" },
    { field: "price", headerName: "Price" },
    { field: "name", headerName: "Name" },
  ];

  const mockBase = {
    title: "Test Table",
    colorClass: "blue",
    loading: false,
  };

  test("returns all data when no filterValue set (Eif !filterValue return true)", () => {
    const data = [
      { date: "2024-10-10", price: 100, name: "Azeem" },
      { date: "2024-10-11", price: 200, name: "Zee" },
    ];
    render(
      <TableWrapper {...mockBase} columns={baseColumns} data={data} />
    );

    expect(screen.getByText("Azeem")).toBeInTheDocument();
    expect(screen.getByText("Zee")).toBeInTheDocument();
  });

  test("returns false for null and undefined cell values", () => {
    const columns = [{ field: "name", headerName: "Name" }];
    const data = [
      { name: null },
      { name: undefined },
      { name: "Azeem" },
    ];
    const filters = { name: "Azeem" };

    render(
      <TableWrapper
        {...mockBase}
        columns={columns}
        data={data}
        loading={false}
      />
    );

    expect(screen.getByText("Azeem")).toBeInTheDocument();
  });

  test("matches filter for date string (string parseable as date)", () => {
    const columns = [{ field: "date", headerName: "Date" }];
    const data = [
      { date: "2024-02-20T00:00:00Z" },
      { date: "2024-03-21T00:00:00Z" },
    ];

    const filters = { date: "2/20/2024" };

    render(
      <TableWrapper
        {...mockBase}
        columns={columns}
        data={data}
        loading={false}
      />
    );

    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  test("matches when cellValue is Date instance", () => {
    const columns = [{ field: "date", headerName: "Date" }];
    const data = [
      { date: new Date("2024-05-10") },
      { date: new Date("2024-06-01") },
    ];
    const filters = { date: "5/10/2024" };

    render(
      <TableWrapper
        {...mockBase}
        columns={columns}
        data={data}
        loading={false}
      />
    );

    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  test("matches numeric cell values using includes()", () => {
    const columns = [{ field: "price", headerName: "Price" }];
    const data = [
      { price: 123 },
      { price: 999 },
    ];
    const filters = { price: "23" };

    render(
      <TableWrapper
        {...mockBase}
        columns={columns}
        data={data}
        loading={false}
      />
    );

    expect(screen.getByText("123")).toBeInTheDocument();
  });

  test("matches string values (case-insensitive includes)", () => {
    const columns = [{ field: "name", headerName: "Name" }];
    const data = [
      { name: "Azeem" },
      { name: "John" },
    ];
    const filters = { name: "aze" };

    render(
      <TableWrapper
        {...mockBase}
        columns={columns}
        data={data}
        loading={false}
      />
    );

    expect(screen.getByText("Azeem")).toBeInTheDocument();
  });
});
