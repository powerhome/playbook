import React from 'react'
import { render, screen, cleanup } from "../utilities/test-utils";

import { HomeAddressStreet } from "..";


const testId = "primary-test"
const address = "70 Prospect Ave"
const city = "West Chester"
const homeId = "8250263"

function HomeAdressStreetTest(props) {
    return (
        <HomeAddressStreet
            address={address}
            addressCont="Apt M18"
            city={city}
            data={{ testid: testId }}
            homeId={homeId}
            homeUrl="https://powerhrg.com/"
            houseStyle="Colonial"
            state="PA"
            territory="PHL"
            zipcode="19382"
            {...props}
    />
    );
  }
  
  test("renders the component", () => {
    render(<HomeAdressStreetTest />);
    const kit = screen.getByTestId("primary-test");
    expect(kit).toBeInTheDocument();
    expect(kit).toHaveClass("pb_home_address_street");

    cleanup()
  });

  test("emphasize street by not setting a prop", () => {
    const { container } = render(<HomeAdressStreetTest />);
    expect(container.getElementsByClassName("pb_title_kit_size_4 pb_home_address_street_address")[0]).toHaveTextContent(address);

    cleanup()
  });

  test("emphasize city", () => {
    const { container } = render(<HomeAdressStreetTest emphasis="city" />);
    expect(container.getElementsByClassName("pb_title_kit_size_4 pb_home_address_street_address")[0]).toHaveTextContent(city);

    cleanup()
  });

  test("renders the hashtag kit", () => {
    const { container } = render(<HomeAdressStreetTest />);
    expect(container.getElementsByClassName("pb_hashtag_kit")[0]).toBeInTheDocument;
    expect(container.getElementsByClassName("pb_hashtag_kit")[0].firstChild).toHaveAttribute("href");
    expect(container.getElementsByClassName("pb_hashtag_kit")[0].firstChild).toHaveTextContent(homeId);

    cleanup()
  });
