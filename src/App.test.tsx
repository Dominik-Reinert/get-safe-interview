import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import * as assert from "power-assert";
import AgeStep from "./buyflow/AgeStep";
import EmailStep from "./buyflow/EmailStep";
import NameStep from "./buyflow/NameStep";
import SummaryStep from "./buyflow/SummaryStep";
import { BrowserRouter as Router } from "react-router-dom";

/**
 * Happy path tests
 */
test("renders app without errors", () => {
  assert.doesNotThrow(() => render(<App />));
});

test("renders all steps without errors", () => {
  assert.doesNotThrow(() =>
    render(
      <AgeStep age={0} onDone={() => undefined} onSetAge={() => undefined} />
    )
  );
  assert.doesNotThrow(() =>
    render(
      <EmailStep
        email=""
        onDone={() => undefined}
        onSetEmail={() => undefined}
      />
    )
  );
  assert.doesNotThrow(() =>
    render(
      <NameStep
        firstName=""
        name=""
        onDone={() => undefined}
        onSetFirstName={() => undefined}
        onSetName={() => undefined}
      />
    )
  );
  assert.doesNotThrow(() =>
    render(
      /* router is needed because of the <link> in the component */
      <Router>
        <SummaryStep firstName="" name="" email="" age={0} />
      </Router>
    )
  );
});

test(`email input should accept valid value`, async () => {
  const input = render(
    <EmailStep
      email={"me@asdf.com"}
      onDone={() => undefined}
      onSetEmail={() => undefined}
    />
  );
  expect(await input.findByText("Next")).toBeEnabled();
});

test(`name input should accept valid value `, async () => {
  const input = render(
    <NameStep
      name={"name"}
      firstName={"first name"}
      onDone={() => undefined}
      onSetFirstName={() => undefined}
      onSetName={() => undefined}
    />
  );
  expect(await input.findByText("Next")).toBeEnabled();
});

/**
 * Unhappy path tests
 */

[undefined, null, "", "   "].forEach((invalidValue) => {
  test(`name input should not accept invalid value ${invalidValue}`, async () => {
    const input = render(
      <NameStep
        name={invalidValue as any}
        firstName={"first name" /* valid input */}
        onDone={() => undefined}
        onSetFirstName={() => undefined}
        onSetName={() => undefined}
      />
    );
    expect(await input.findByText("Next")).toHaveAttribute("disabled");
  });

  test(`first name input should not accept invalid value ${invalidValue}`, async () => {
    const input = render(
      <NameStep
        name={"name" /* valid input */}
        firstName={invalidValue as any}
        onDone={() => undefined}
        onSetFirstName={() => undefined}
        onSetName={() => undefined}
      />
    );
    expect(await input.findByText("Next")).toHaveAttribute("disabled");
  });

  test(`email input should not accept invalid value ${invalidValue}`, async () => {
    const input = render(
      <EmailStep
        email={invalidValue as any}
        onDone={() => undefined}
        onSetEmail={() => undefined}
      />
    );
    expect(await input.findByText("Next")).toHaveAttribute("disabled");
  });
});

["ma@", "me@asdfcom", "me.at.com", "me@asdf", "@asdf.com"].forEach(
  (invalidValue) => {
    test(`email input should not accept invalid value ${invalidValue}`, async () => {
      const input = render(
        <EmailStep
          email={invalidValue as any}
          onDone={() => undefined}
          onSetEmail={() => undefined}
        />
      );
      expect(await input.findByText("Next")).toHaveAttribute("disabled");
    });
  }
);
