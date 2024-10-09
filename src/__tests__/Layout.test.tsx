import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useInitializeUser } from "../hook/useInitializeUser";

vi.mock("../hook/useInitializeUser", () => ({
  useInitializeUser: vi.fn(),
}));

vi.mock("../components/loading/Loading", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("../components/error/Error", () => ({
  default: () => <div>Error!</div>,
}));

vi.mock("../components/header/Header", () => ({
  default: () => <header>Header</header>,
}));

vi.mock("../components/footer/Footer", () => ({
  default: () => <footer>Footer</footer>,
}));

describe("Layout Component", () => {
  it("should display loading state when data is loading", () => {
    (useInitializeUser as vi.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
    });

    render(
      <Router>
        <Layout>
          <div>Child Content</div>
        </Layout>
      </Router>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display error state when there is an error", () => {
    (useInitializeUser as vi.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
    });

    render(
      <Router>
        <Layout>
          <div>Child Content</div>
        </Layout>
      </Router>
    );

    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("should render children and layout components when not loading and no error", async () => {
    (useInitializeUser as vi.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
    });

    render(
      <Router>
        <Layout>
          <div>Child Content</div>
        </Layout>
      </Router>
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
