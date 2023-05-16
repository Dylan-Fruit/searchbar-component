/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Hero from "./Hero";

let container = null;

beforeEach(() => {
  // Configure un élément DOM comme cible du rendu
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Nettoie en sortie de chaque test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("affiche les titres correctement", () => {
  act(() => {
    render(<Hero />, container);
  });

  const h2 = container.querySelector("h2");
  expect(h2.textContent).toBe("Laissez-vous transporter par Omio");

  const h1 = container.querySelector("h1");
  expect(h1.textContent).toBe("Billets de train, bus et avion");
});
