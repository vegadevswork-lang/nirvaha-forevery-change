import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SmartActions from "../SmartActions";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("SmartActions", () => {
  it("renders the three default action titles", () => {
    render(
      <MemoryRouter>
        <SmartActions />
      </MemoryRouter>
    );
    expect(screen.getByText("Ground your thoughts")).toBeInTheDocument();
    expect(screen.getByText("Reflect & journal")).toBeInTheDocument();
    expect(screen.getByText("A new perspective")).toBeInTheDocument();
  });

  it("personalizes subtitles when emotion=Stressed", () => {
    render(
      <MemoryRouter>
        <SmartActions emotion="Stressed" />
      </MemoryRouter>
    );
    expect(screen.getByText("Soften your chest")).toBeInTheDocument();
    expect(screen.getByText("Name what's heavy")).toBeInTheDocument();
    expect(screen.getByText("Loosen the grip")).toBeInTheDocument();
  });

  it("personalizes subtitles when emotion=Joyful", () => {
    render(
      <MemoryRouter>
        <SmartActions emotion="Joyful" />
      </MemoryRouter>
    );
    expect(screen.getByText("Savor this moment")).toBeInTheDocument();
    expect(screen.getByText("Capture this light")).toBeInTheDocument();
  });

  it("falls back to defaults for unknown emotions", () => {
    render(
      <MemoryRouter>
        <SmartActions emotion="Unknown" />
      </MemoryRouter>
    );
    expect(screen.getByText("2 min calm reset")).toBeInTheDocument();
  });
});
