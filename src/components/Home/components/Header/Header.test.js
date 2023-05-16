/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Header from "./Header";
import isMobile from "is-mobile";

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

jest.mock("is-mobile", () => ({
  __esModule: true,
  default: jest.fn(),
}));

it("render le composant Header avec succès", () => {
  act(() => {
    render(<Header />, container);
  });

  // Vérifie si le composant a été rendu sans erreur
  expect(container.querySelector(".header")).not.toBe(null);
});

it("affiche le logo omio", () => {
  act(() => {
    render(<Header />, container);
  });

  // Vérifie si le logo omio est présent dans le composant
  expect(container.querySelector("img").getAttribute("alt")).toBe("logo omio");
});

it("affiche la navigation mobile pour les appareils mobiles", () => {
  // Mock la détection d'appareil mobile
  isMobile.mockReturnValue(true);

  act(() => {
    render(<Header />, container);
  });

  // Vérifie si la navigation mobile est présente pour les appareils mobiles
  expect(container.querySelector("nav")).not.toBe(null);
});

it("affiche la navigation normale pour les appareils non mobiles", () => {
  // Mock la détection d'appareil mobile
  isMobile.mockReturnValue(false);

  act(() => {
    render(<Header />, container);
  });

  // Vérifie si la navigation normale est présente pour les appareils non mobiles
  expect(container.querySelector(".nav")).not.toBe(null);
});
