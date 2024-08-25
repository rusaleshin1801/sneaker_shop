import { render, act } from "@testing-library/react";
import { beforeEach, describe, it, expect, vi, afterEach } from "vitest";
import useDebounce from "../hook/useDebounce";

const TestComponent = ({ value, delay }: { value: string; delay: number }) => {
  const debouncedValue = useDebounce(value, delay);
  return <div>{debouncedValue}</div>;
};

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("должен вернуть исходное значение немедленно", () => {
    const { getByText } = render(<TestComponent value="initial" delay={500} />);
    expect(getByText("initial")).toBeTruthy();
  });

  it("должен обновить значение после задержки", () => {
    const { getByText, rerender } = render(
      <TestComponent value="initial" delay={500} />
    );
    rerender(<TestComponent value="updated" delay={500} />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(getByText("updated")).toBeTruthy();
  });

  it("должен сбрасывать таймер при изменении значения", () => {
    const { getByText, rerender } = render(
      <TestComponent value="initial" delay={500} />
    );
    rerender(<TestComponent value="updated" delay={500} />);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender(<TestComponent value="final" delay={500} />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(getByText("final")).toBeTruthy();
  });

  it("должен учитывать изменение задержки", () => {
    const { getByText, rerender } = render(
      <TestComponent value="initial" delay={500} />
    );
    rerender(<TestComponent value="updated" delay={1000} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(getByText("updated")).toBeTruthy();
  });
});
