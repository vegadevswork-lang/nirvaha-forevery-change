import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmotionChips from "../EmotionChips";

describe("EmotionChips", () => {
  it("shows the four primary emotions by default", () => {
    render(<EmotionChips selected={null} onSelect={() => {}} />);
    expect(screen.getByText("Excited")).toBeInTheDocument();
    expect(screen.getByText("Joyful")).toBeInTheDocument();
    expect(screen.getByText("Grateful")).toBeInTheDocument();
    expect(screen.getByText("Calm")).toBeInTheDocument();
    expect(screen.queryByText("Stressed")).not.toBeInTheDocument();
  });

  it("expands to reveal all emotions when 'More' is tapped", () => {
    render(<EmotionChips selected={null} onSelect={() => {}} />);
    fireEvent.click(screen.getByLabelText("Show more emotions"));
    expect(screen.getByText("Stressed")).toBeInTheDocument();
    expect(screen.getByText("Hurt")).toBeInTheDocument();
  });

  it("calls onSelect with the chosen label", () => {
    const onSelect = vi.fn();
    render(<EmotionChips selected={null} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Calm"));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toBe("Calm");
  });
});
