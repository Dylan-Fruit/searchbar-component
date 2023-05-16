/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import RoundTrip from "./RoundTrip";

let container = null;
let setReturnDateMock;

beforeEach(() => {
  // Configure un élément DOM comme cible du rendu
  container = document.createElement("div");
  document.body.appendChild(container);
  setReturnDateMock = jest.fn();
});

afterEach(() => {
  // Nettoie en sortie de chaque test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  setReturnDateMock.mockClear();
});

it("affiche le type de voyage par défaut", () => {
  // Rendu initial du composant
  act(() => {
    render(<RoundTrip setReturnDate={setReturnDateMock} />, container);
  });

  // Vérifie que le type de voyage par défaut est affiché
  const tripTypeText = container.querySelector(".dropdown-button span");
  expect(tripTypeText.textContent).toBe("Aller simple");
});

it("affiche le menu déroulant lors du clic sur le bouton", () => {
  // Rendu initial du composant
  act(() => {
    render(<RoundTrip setReturnDate={setReturnDateMock} />, container);
  });

  // Clic sur le bouton pour ouvrir le menu déroulant
  const dropdownButton = container.querySelector(".dropdown-button");
  act(() => {
    dropdownButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Vérifie que le menu déroulant est affiché
  const dropdownMenu = container.querySelector(".dropdown-menu");
  expect(dropdownMenu).not.toBeNull();
});

it("met à jour le type de voyage lors de la sélection dans le menu déroulant", () => {
  // Rendu initial du composant
  act(() => {
    render(<RoundTrip setReturnDate={setReturnDateMock} />, container);
  });

  // Clic sur le bouton pour ouvrir le menu déroulant
  const dropdownButton = container.querySelector(".dropdown-button");
  act(() => {
    dropdownButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Sélection de l'option "Aller-retour" dans le menu déroulant
  const allerRetourOption = container.querySelector(
    ".dropdown-menu li:last-child"
  );
  act(() => {
    allerRetourOption.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Vérifie que le type de voyage a été mis à jour
  const tripTypeText = container.querySelector(".dropdown-button span");
  expect(tripTypeText.textContent).toBe("Aller-retour");
});

it("met à jour la date de retour lorsque le type de voyage est Aller-retour", () => {
  // Rendu initial du composant
  act(() => {
    render(<RoundTrip setReturnDate={setReturnDateMock} />, container);
  });

  // Clic sur le bouton pour ouvrir le menu déroulant
  const dropdownButton = container.querySelector(".dropdown-button");
  act(() => {
    dropdownButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Sélection de l'option "Aller-retour" dans le menu déroulant
  const allerRetourOption = container.querySelector(
    ".dropdown-menu li:last-child"
  );
  act(() => {
    allerRetourOption.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Vérifie que la fonction setReturnDate a été appelée avec une date non nulle
  expect(setReturnDateMock).toHaveBeenCalledWith(expect.any(Date));
});

it("ne met pas à jour la date de retour lorsque le type de voyage est Aller simple", () => {
  // Rendu initial du composant
  act(() => {
    render(<RoundTrip setReturnDate={setReturnDateMock} />, container);
  });

  // Clic sur le bouton pour ouvrir le menu déroulant
  const dropdownButton = container.querySelector(".dropdown-button");
  act(() => {
    dropdownButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Sélection de l'option "Aller simple" dans le menu déroulant
  const allerSimpleOption = container.querySelector(
    ".dropdown-menu li:first-child"
  );
  act(() => {
    allerSimpleOption.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Vérifie que la fonction setReturnDate a été appelée avec une valeur nulle
  expect(setReturnDateMock).toHaveBeenCalled();
  expect(setReturnDateMock.mock.calls[0][0]).toBeNull();
});
