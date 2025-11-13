import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AIAssistant from "../components/AiAssistant";
import { getAIResponse } from "../utils/aiHelper";

jest.mock("../utils/aiHelper", () => ({
  getAIResponse: jest.fn(),
}));

describe("AIAssistant Component", () => {
  const mockTransactions = [
    {
      customerName: "John Doe",
      productPurchased: "Laptop",
      price: 150,
      purchaseDate: "2024-02-10",
    },
    {
      customerName: "",
      productPurchased: null,
      price: 0,
      purchaseDate: "",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing and shows title", () => {
    render(<AIAssistant transactions={[]} />);
    expect(
      screen.getByText("💡 AI Insights Assistant")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask AI/i)).toBeInTheDocument();
    expect(screen.getByText("Ask")).toBeInTheDocument();
  });

  test("does nothing if prompt is empty", async () => {
    render(<AIAssistant transactions={mockTransactions} />);
    const askButton = screen.getByText("Ask");
    fireEvent.click(askButton);
    expect(getAIResponse).not.toHaveBeenCalled();
  });

  test("calls getAIResponse when prompt is entered", async () => {
    getAIResponse.mockResolvedValue("John has highest rewards");

    render(<AIAssistant transactions={mockTransactions} />);

    const input = screen.getByPlaceholderText(/Ask AI/i);
    fireEvent.change(input, { target: { value: "Who earned most points?" } });
    fireEvent.click(screen.getByText("Ask"));

    // Loading state should appear immediately
    expect(screen.getByText("Thinking...")).toBeInTheDocument();

    // Wait for async AI response to render
    await waitFor(() => {
      expect(getAIResponse).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/AI says:/)).toBeInTheDocument();
      expect(screen.getByText(/John has highest rewards/)).toBeInTheDocument();
    });

    expect(screen.getByText("Ask")).toBeInTheDocument();
  });

  test("shows fallback values for missing transaction data", async () => {
    getAIResponse.mockResolvedValue("Fallback checked");

    render(<AIAssistant transactions={mockTransactions} />);

    const input = screen.getByPlaceholderText(/Ask AI/i);
    fireEvent.change(input, { target: { value: "Show unknown entries" } });
    fireEvent.click(screen.getByText("Ask"));

    await waitFor(() => {
      expect(getAIResponse).toHaveBeenCalled();
    });

    const calledPrompt = getAIResponse.mock.calls[0][0];
    expect(calledPrompt).toContain("Unknown");
    expect(calledPrompt).toContain("Unknown Product");
    expect(calledPrompt).toContain("Unknown Date");
  });

  test("renders AI response alert correctly", async () => {
    getAIResponse.mockResolvedValue("AI completed successfully");

    render(<AIAssistant transactions={mockTransactions} />);

    const input = screen.getByPlaceholderText(/Ask AI/i);
    fireEvent.change(input, { target: { value: "Test alert display" } });
    fireEvent.click(screen.getByText("Ask"));

    await waitFor(() => {
      expect(screen.getByText(/AI says:/)).toBeInTheDocument();
      expect(screen.getByText(/AI completed successfully/)).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveClass("alert-info");
    });
  });
});
