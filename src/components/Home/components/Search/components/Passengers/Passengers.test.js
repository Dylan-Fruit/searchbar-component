/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Passengers from "./Passengers";

let container = null;

beforeEach(() => {
  // Mettre en place un élément DOM comme cible de rendu
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Nettoyer à la sortie
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("affiche le nombre total de passagers", () => {
  act(() => {
    render(<Passengers />, container);
  });

  const totalPassengers = container.querySelector(".numberOfPassengers p");
  expect(totalPassengers.textContent).toBe("1");
});

it("incrémente le nombre de passagers adultes lorsqu'on clique sur le bouton plus", () => {
  act(() => {
    render(<Passengers />, container);
  });

  const plusButton = container.querySelector(".passengersAdult .plusSVG");
  const countText = container.querySelector(
    ".passengersAdult .passengersCountText span"
  );

  act(() => {
    plusButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(countText.textContent).toBe("2");
});

it("désactive le bouton plus lorsque le nombre total de passagers atteint 9", () => {
  act(() => {
    render(<Passengers />, container);
  });

  const plusButton = container.querySelector(".plusSVG");

  act(() => {
    for (let i = 1; i <= 9; i++) {
      plusButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(plusButton.disabled).toBe(true);
});

// Ajoutez d'autres tests unitaires pour couvrir les différentes fonctionnalités du composant Passengers
