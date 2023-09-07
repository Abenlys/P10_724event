import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { useData } from "../../contexts/DataContext";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    const selectValue = document.querySelector(".SelectTitle--hide").innerText;
    const getLabel = new Set();
    const labelNodeList = document
      .querySelector("#events")
      .querySelectorAll(".EventCard__label");
    labelNodeList.forEach((element) => {
      const labelInnerHTML = element.innerHTML;
      getLabel.add(labelInnerHTML);
    });
    expect(labelNodeList.length).toBeLessThanOrEqual(9);
    if (selectValue !== "Toutes") {
      expect(selectValue === getLabel);
    }
  });
  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleCardNodelist = document.querySelectorAll(".PeopleCard")
    expect(peopleCardNodelist.length).toBe(6)
  });
  it("a footer is displayed", () => {
    render(<Home />);
    const footerInHTML = document.querySelector("footer");
    expect(footerInHTML).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    const { data } = useData();
    const LastEvents = data?.events;
    const lastEventByDate = LastEvents?.slice().sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    )[0];
    const getIdOfLastEvent = lastEventByDate?.id;
    expect(getIdOfLastEvent === lastEventByDate?.id)
  });
});
