import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import Toistuvat from "../sivut/toistuvat";
import * as toistuvaApi from "../api/toistuvaApi";

vi.mock("../api/toistuvaApi");

const mockToistuva = {
  id: 1,
  kuvaus: "Vuokra",
  tyyppi: "meno",
  summa: 600,
  toistuvuus: "kuukausittain",
  aloitusPvm: "2026-01-01",
  lopetusPvm: null,
  kategoria: { nimi: "Asuminen" },
  aktiivinen: true,
};

beforeEach(() => {
  vi.clearAllMocks();
  toistuvaApi.haeToistuvat.mockResolvedValue([mockToistuva]);
});

describe("Toistuvat", () => {
  it("näyttää lataustilanteen heti alussa", () => {
    toistuvaApi.haeToistuvat.mockReturnValue(new Promise(() => {}));
    render(<Toistuvat />);

    expect(screen.getByText("Ladataan...")).toBeInTheDocument();
  });

  it("renderöi toistuvan tapahtuman latauksen jälkeen", async () => {
    render(<Toistuvat />);

    await waitFor(() =>
      expect(screen.getByText("Vuokra")).toBeInTheDocument()
    );
    expect(screen.getByText("kuukausittain")).toBeInTheDocument();
    expect(screen.getByText("Aktiivinen")).toBeInTheDocument();
  });

  it("näyttää tyhjän tilan kun ei toistuvia", async () => {
    toistuvaApi.haeToistuvat.mockResolvedValue([]);
    render(<Toistuvat />);

    await waitFor(() =>
      expect(screen.getByText("Ei toistuvia tapahtumia")).toBeInTheDocument()
    );
  });

  it("kutsuu vaihdaAktiivinen-funktiota kun painetaan deaktivointipainiketta", async () => {
    toistuvaApi.vaihdaAktiivinen.mockResolvedValue({
      ...mockToistuva,
      aktiivinen: false,
    });
    render(<Toistuvat />);

    await waitFor(() =>
      expect(screen.getByText("Vuokra")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: "Poista käytöstä" }));

    await waitFor(() =>
      expect(toistuvaApi.vaihdaAktiivinen).toHaveBeenCalledWith(1)
    );
  });

  it("poistaa rivin ja kutsuu poistaToistuva-funktiota", async () => {
    toistuvaApi.poistaToistuva.mockResolvedValue();
    render(<Toistuvat />);

    await waitFor(() =>
      expect(screen.getByText("Vuokra")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: "Poista" }));

    await waitFor(() => {
      expect(toistuvaApi.poistaToistuva).toHaveBeenCalledWith(1);
      expect(screen.queryByText("Vuokra")).not.toBeInTheDocument();
    });
  });

  it("näyttää virheviestin kun poisto epäonnistuu", async () => {
    toistuvaApi.poistaToistuva.mockRejectedValue(
      new Error("Poistaminen epäonnistui.")
    );
    render(<Toistuvat />);

    await waitFor(() =>
      expect(screen.getByText("Vuokra")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: "Poista" }));

    await waitFor(() =>
      expect(screen.getByText("Poistaminen epäonnistui.")).toBeInTheDocument()
    );
  });

  it("ei saavutettavuusvirheitä datalla", async () => {
    const { container } = render(<Toistuvat />);
    await waitFor(() =>
      expect(screen.getByText("Vuokra")).toBeInTheDocument()
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
