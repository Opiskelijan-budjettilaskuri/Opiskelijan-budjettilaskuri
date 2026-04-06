import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import LisaaTapahtuma from "../sivut/LisaaTapahtuma";
import * as tuloApi from "../api/tuloApi";
import * as menoApi from "../api/menoApi";

vi.mock("../api/tuloApi");
vi.mock("../api/menoApi");

beforeEach(() => {
  vi.clearAllMocks();
  tuloApi.haeKategoriat.mockResolvedValue([{ id: 1, nimi: "Ruoka" }]);
  tuloApi.lisaaTulo.mockResolvedValue({ id: 1 });
  menoApi.lisaaMeno.mockResolvedValue({ id: 1 });
});

describe("LisaaTapahtuma", () => {
  it("renderöi otsikon ja lomakekentät", async () => {
    const { container } = render(<LisaaTapahtuma />);
    // Odotetaan kategorioiden latauksen päättymistä
    await waitFor(() => expect(tuloApi.haeKategoriat).toHaveBeenCalledOnce());

    expect(screen.getByRole("heading", { name: "Lisää tapahtuma" })).toBeInTheDocument();
    expect(container.querySelector("input[type='text']")).toBeInTheDocument();
    expect(container.querySelector("input[type='number']")).toBeInTheDocument();
    expect(container.querySelector("input[type='date']")).toBeInTheDocument();
  });

  it("vaihto meno-välilehdelle muuttaa lähetysnapin tekstin", async () => {
    const { container } = render(<LisaaTapahtuma />);
    await waitFor(() => expect(tuloApi.haeKategoriat).toHaveBeenCalledOnce());

    const submitBtn = container.querySelector("button[type='submit']");
    expect(submitBtn).toHaveTextContent("Lisää tulo");

    fireEvent.click(screen.getAllByRole("button", { name: "Lisää meno" })[0]);
    expect(submitBtn).toHaveTextContent("Lisää meno");
  });

  it("näyttää validointivirheen kun kuvaus on tyhjä", async () => {
    const { container } = render(<LisaaTapahtuma />);
    await waitFor(() => expect(tuloApi.haeKategoriat).toHaveBeenCalledOnce());

    fireEvent.change(container.querySelector("input[type='number']"), {
      target: { value: "50" },
    });
    fireEvent.submit(container.querySelector("form"));

    expect(screen.getByText("Kuvaus on pakollinen.")).toBeInTheDocument();
  });

  it("onnistunut tulon lähetys kutsuu API:a ja näyttää onnistumisviestin", async () => {
    const { container } = render(<LisaaTapahtuma />);
    await waitFor(() => expect(tuloApi.haeKategoriat).toHaveBeenCalledOnce());

    fireEvent.change(container.querySelector("input[type='text']"), {
      target: { value: "Palkka" },
    });
    fireEvent.change(container.querySelector("input[type='number']"), {
      target: { value: "2000" },
    });

    await act(async () => {
      fireEvent.submit(container.querySelector("form"));
    });

    expect(screen.getByText("Tulo lisätty!")).toBeInTheDocument();
    expect(tuloApi.lisaaTulo).toHaveBeenCalledOnce();
    expect(tuloApi.lisaaTulo).toHaveBeenCalledWith(
      expect.objectContaining({ kuvaus: "Palkka", maara: 2000 })
    );
  });
});
