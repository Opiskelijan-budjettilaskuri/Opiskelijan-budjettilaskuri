import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";
import Kirjaudu from "../sivut/kirjaudu";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
  vi.stubGlobal("location", { href: "" });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

function renderKirjaudu() {
  return render(
    <MemoryRouter>
      <Kirjaudu />
    </MemoryRouter>
  );
}

describe("Kirjaudu", () => {
  it("renderöi käyttäjätunnus- ja salasanakentät sekä kirjaudu-painikkeen", () => {
    renderKirjaudu();

    expect(screen.getByLabelText("Käyttäjätunnus")).toBeInTheDocument();
    expect(screen.getByLabelText("Salasana")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Kirjaudu" })).toBeInTheDocument();
  });

  it("näyttää virheilmoituksen väärillä tunnuksilla", async () => {
    fetch.mockResolvedValue({ ok: false, status: 401 });
    renderKirjaudu();

    fireEvent.change(screen.getByLabelText("Käyttäjätunnus"), {
      target: { value: "testi" },
    });
    fireEvent.change(screen.getByLabelText("Salasana"), {
      target: { value: "väärä" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Kirjaudu" }));

    await waitFor(() =>
      expect(
        screen.getByText("Väärä käyttäjätunnus tai salasana")
      ).toBeInTheDocument()
    );
  });

  it("näyttää virheilmoituksen verkkovirheellä", async () => {
    fetch.mockRejectedValue(new Error("Network error"));
    renderKirjaudu();

    fireEvent.change(screen.getByLabelText("Käyttäjätunnus"), {
      target: { value: "testi" },
    });
    fireEvent.change(screen.getByLabelText("Salasana"), {
      target: { value: "salasana" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Kirjaudu" }));

    await waitFor(() =>
      expect(
        screen.getByText("Tapahtui virhe. Yritä uudestaan.")
      ).toBeInTheDocument()
    );
  });

  it("onnistunut kirjautuminen ohjaa yhteenvetoon", async () => {
    fetch.mockResolvedValue({ ok: true });
    renderKirjaudu();

    fireEvent.change(screen.getByLabelText("Käyttäjätunnus"), {
      target: { value: "testi" },
    });
    fireEvent.change(screen.getByLabelText("Salasana"), {
      target: { value: "oikea" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Kirjaudu" }));

    await waitFor(() => expect(window.location.href).toBe("/yhteenveto"));
  });

  it("ei saavutettavuusvirheitä", async () => {
    const { container } = renderKirjaudu();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
