import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import StoryRouter from "storybook-react-router";

import "../global.scss";

// UI
import AddPage from "../components/UI/AddPage";
import MapView from "../components/UI/MapView";

storiesOf("UI", module)
  .addDecorator(StoryRouter())
  .addDecorator(withKnobs)
  .add("AddPage", () => (
    <AddPage
      title={text("Title", "Untitled")}
      API={text("API", "TTO7CfG")}
      slug={text("Slug", "https://libds.nus.edu.sg/arfandi_project/")}
    />
  ))
  .add("MapView", () => (
    <MapView
      title={text("Title", "Untitled")}
      API={text("API", "TTO7CfG")}
      slug={text("Slug", "https://libds.nus.edu.sg/arfandi_project/")}
    />
  ));
