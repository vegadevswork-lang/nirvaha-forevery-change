import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Users } from "lucide-react";
import CompactTile from "../CompactTile";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useNavigate: () => navigateMock };
});

const renderTile = (overrides = {}) =>
  render(
    <MemoryRouter>
      <CompactTile
        title="Nirvaha Space"
        subtitle="Anonymous community"
        icon={Users}
        to="/community"
        tone="community"
        label="Connect"
        {...overrides}
      />
    </MemoryRouter>
  );

describe("CompactTile", () => {
  it("renders title, subtitle and category label", () => {
    renderTile();
    expect(screen.getByText("Nirvaha Space")).toBeInTheDocument();
    expect(screen.getByText("Anonymous community")).toBeInTheDocument();
    expect(screen.getByText("Connect")).toBeInTheDocument();
  });

  it("navigates to `to` on click", () => {
    navigateMock.mockClear();
    renderTile();
    fireEvent.click(screen.getByRole("button"));
    expect(navigateMock).toHaveBeenCalledWith("/community");
  });
});
