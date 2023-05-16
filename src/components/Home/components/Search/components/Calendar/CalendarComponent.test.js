/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import CalendarComponent from "./CalendarComponent";

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

jest.mock("is-mobile");

it("render le composant CalendarComponent avec succès", () => {
  act(() => {
    render(<CalendarComponent />, container);
  });

  // Vérifie si le composant a été rendu sans erreur
  expect(container.querySelector(".Calendar")).not.toBe(null);
});

it("affiche la date de départ par défaut", () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  act(() => {
    render(<CalendarComponent />, container);
  });

  // Vérifie si la date de départ par défaut est correctement affichée
  expect(
    container.querySelector(".departureDateContent span").textContent
  ).toBe(
    new Intl.DateTimeFormat("fr-FR", {
      month: "short",
      day: "numeric",
      weekday: "short",
    }).format(tomorrow)
  );
});

it("affiche le message 'Ajouter retour' lorsque la date de retour n'est pas sélectionnée", () => {
  act(() => {
    render(<CalendarComponent />, container);
  });

  // Vérifie si le message 'Ajouter retour' est affiché lorsque la date de retour n'est pas sélectionnée
  expect(
    container.querySelector(".arrivalDateContent .addReturn").textContent
  ).toBe("Ajouter retour");
});

it("affiche le calendrier de départ lors du clic sur la date de départ", () => {
  act(() => {
    render(<CalendarComponent />, container);
  });

  const departureDate = container.querySelector(".departureDate");
  act(() => {
    departureDate.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Vérifie si le calendrier de départ est affiché après le clic sur la date de départ
  expect(container.querySelector(".calendarModal")).not.toBe(null);
});
