import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe } from "jest-axe";
import Tapahtumat from "../sivut/tapahtumat";
import * as tuloApi from "../api/tuloApi";
import * as menoApi from "../api/menoApi";
import * as toistuvaApi from "../api/toistuvaApi";

vi.mock("../api/tuloApi");
vi.mock("../api/menoApi");
vi.mock("../api/toistuvaApi");

const mockTulot = [
  {
    id: 1,
    kuvaus: "Palkka",
    maara: 2000,
    pvm: "2026-05-01",
    kategoria: { nimi: "Työ" },
  },
];

const mockMenot = [
  {
    id: 1,
    kuvaus: "Ruoka",
    summa: 50,
    pvm: "2026-05-02",
    kategoria: { nimi: "Ruokailu" },
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  tuloApi.haeTulot.mockResolvedValue(mockTulot);
  menoApi.haeMenot.mockResolvedValue(mockMenot);
  toistuvaApi.haeToistuvat.mockResolvedValue([]);
});

describe("Tapahtumat", () => {
  it("näyttää lataustilanteen heti alussa", () => {
    tuloApi.haeTulot.mockReturnValue(new Promise(() => {}));
    render(<Tapahtumat />);

    expect(screen.getByText("Ladataan...")).toBeInTheDocument();
  });

  it("renderöi tapahtumat taulukkoon latauksen jälkeen", async () => {
    render(<Tapahtumat />);

    await waitFor(() =>
      expect(screen.getByText("Palkka")).toBeInTheDocument()
    );
    expect(screen.getByText("Ruoka")).toBeInTheDocument();
  });

  it("näyttää tyhjän tilan kun ei tapahtumia valitulle kuukaudelle", async () => {
    tuloApi.haeTulot.mockResolvedValue([]);
    menoApi.haeMenot.mockResolvedValue([]);
    render(<Tapahtumat />);

    await waitFor(() =>
      expect(screen.getByText("Ei tapahtumia")).toBeInTheDocument()
    );
  });

  it("näyttää virheviestin kun haku epäonnistuu", async () => {
    tuloApi.haeTulot.mockRejectedValue(new Error("Yhteys katkesi"));
    render(<Tapahtumat />);

    await waitFor(() =>
      expect(screen.getByText("Yhteys katkesi")).toBeInTheDocument()
    );
  });

  it("poistaa menorivin ja kutsuu poistaMeno-funktiota", async () => {
    menoApi.poistaMeno.mockResolvedValue();
    render(<Tapahtumat />);

    await waitFor(() =>
      expect(screen.getByText("Ruoka")).toBeInTheDocument()
    );

    // Ruoka (meno, pvm 2026-05-02) on listan ensimmäinen koska järjestetty laskevasti
    const poistaButtons = screen.getAllByRole("button", { name: "Poista" });
    fireEvent.click(poistaButtons[0]);

    await waitFor(() => {
      expect(menoApi.poistaMeno).toHaveBeenCalledWith(1);
      expect(screen.queryByText("Ruoka")).not.toBeInTheDocument();
    });
  });

  it("ei saavutettavuusvirheitä datalla", async () => {
    const { container } = render(<Tapahtumat />);
    await waitFor(() =>
      expect(screen.getByText("Palkka")).toBeInTheDocument()
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
