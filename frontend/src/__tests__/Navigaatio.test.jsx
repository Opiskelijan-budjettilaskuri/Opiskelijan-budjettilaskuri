import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";
import { Navigaatio } from "../komponentit/Navigaatio";

function renderNav(path = "/yhteenveto") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Navigaatio />
    </MemoryRouter>
  );
}

describe("Navigaatio", () => {
  it("renderöi kaikki neljä navigointilinkkiä", () => {
    renderNav();

    expect(screen.getByRole("link", { name: /yhteenveto/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tapahtumat/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /lisää tapahtuma/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /toistuvat/i })).toBeInTheDocument();
  });

  it("linkit osoittavat oikeisiin polkuihin", () => {
    renderNav();

    expect(screen.getByRole("link", { name: /yhteenveto/i })).toHaveAttribute(
      "href",
      "/yhteenveto"
    );
    expect(screen.getByRole("link", { name: /tapahtumat/i })).toHaveAttribute(
      "href",
      "/tapahtumat"
    );
    expect(screen.getByRole("link", { name: /lisää tapahtuma/i })).toHaveAttribute(
      "href",
      "/lisaa-tapahtuma"
    );
    expect(screen.getByRole("link", { name: /toistuvat/i })).toHaveAttribute(
      "href",
      "/toistuvat"
    );
  });

  it("ei saavutettavuusvirheitä", async () => {
    const { container } = renderNav();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
