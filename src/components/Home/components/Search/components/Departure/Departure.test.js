/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Departure from "./Departure";

let container = null;

beforeEach(() => {
  // Configure le DOM en tant que cible pour le rendu
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Nettoie le rendu du composant après chaque test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("affiche le champ de départ par défaut vide", () => {
  act(() => {
    render(<Departure />, container);
  });

  // Vérifie si le champ de départ est vide par défaut
  expect(container.querySelector("#departureCity").value).toBe("");
});

it("affiche le champ d'arrivée par défaut vide", () => {
  act(() => {
    render(<Departure />, container);
  });

  // Vérifie si le champ d'arrivée est vide par défaut
  expect(container.querySelector("#arrivalCity").value).toBe("");
});

it("affiche le champ de départ après avoir saisi une valeur", () => {
  act(() => {
    render(<Departure />, container);
  });

  const input = container.querySelector("#departureCity");
  act(() => {
    input.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    input.value = "Paris";
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  // Vérifie si le champ de départ affiche la valeur saisie
  expect(input.value).toBe("Paris");
});

it("affiche le champ d'arrivée après avoir saisi une valeur", () => {
  act(() => {
    render(<Departure />, container);
  });

  const input = container.querySelector("#arrivalCity");
  act(() => {
    input.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    input.value = "Lyon";
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  // Vérifie si le champ d'arrivée affiche la valeur saisie
  expect(input.value).toBe("Lyon");
});
