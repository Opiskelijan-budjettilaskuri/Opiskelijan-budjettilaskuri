import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import Yhteenveto from "../sivut/yhteenveto";
import * as yhteenvetoApi from "../api/yhteenvetoApi";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: () => null,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  PieChart: () => null,
  Pie: () => null,
  Cell: () => null,
  AreaChart: () => null,
  Area: () => null,
}));

vi.mock("../api/yhteenvetoApi");

const mockData = {
  aikavali: "toukokuu 2026",
  tulot: 2000,
  menot: 1500,
  saldo: 500,
  menotKategorioittain: [{ kategoria: "Ruoka", summa: 500 }],
  tulotKategorioittain: [{ kategoria: "Työ", summa: 2000 }],
};

beforeEach(() => {
  vi.clearAllMocks();
  yhteenvetoApi.haeYhteenveto.mockResolvedValue(mockData);
});

describe("Yhteenveto", () => {
  it("näyttää lataustilanteen haun aikana", async () => {
    yhteenvetoApi.haeYhteenveto.mockReturnValue(new Promise(() => {}));
    render(<Yhteenveto />);

    expect(screen.getByText("Ladataan...")).toBeInTheDocument();
  });

  it("renderöi KPI-arvot latauksen jälkeen", async () => {
    render(<Yhteenveto />);

    await waitFor(() =>
      expect(screen.getByText("2000.00 €")).toBeInTheDocument()
    );
    expect(screen.getByText("1500.00 €")).toBeInTheDocument();
    expect(screen.getByText("500.00 €")).toBeInTheDocument();
  });

  it("näyttää aikavälin nimen", async () => {
    render(<Yhteenveto />);

    await waitFor(() =>
      expect(screen.getByText("toukokuu 2026")).toBeInTheDocument()
    );
  });

  it("aikavälipikavalintapainikkeet renderöityvät", () => {
    render(<Yhteenveto />);

    expect(
      screen.getByRole("button", { name: "Tämä kuukausi" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Viimeiset 3 kk" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tämä vuosi" })
    ).toBeInTheDocument();
  });

  it("aikavälin vaihto kutsuu haeYhteenveto uudelleen", async () => {
    render(<Yhteenveto />);

    await waitFor(() =>
      expect(screen.getByText("2000.00 €")).toBeInTheDocument()
    );
    const callsBefore = yhteenvetoApi.haeYhteenveto.mock.calls.length;

    fireEvent.click(screen.getByRole("button", { name: "Tämä vuosi" }));

    await waitFor(() =>
      expect(yhteenvetoApi.haeYhteenveto.mock.calls.length).toBeGreaterThan(
        callsBefore
      )
    );
  });

  it("näyttää virheviestin kun API epäonnistuu", async () => {
    yhteenvetoApi.haeYhteenveto.mockRejectedValue(
      new Error("Yhteenvetoa ei voitu hakea.")
    );
    render(<Yhteenveto />);

    await waitFor(() =>
      expect(
        screen.getByText("Yhteenvetoa ei voitu hakea.")
      ).toBeInTheDocument()
    );
  });

  it("ei saavutettavuusvirheitä datalla", async () => {
    const { container } = render(<Yhteenveto />);
    await waitFor(() =>
      expect(screen.getByText("2000.00 €")).toBeInTheDocument()
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
