import React from "react";
import { render } from "../utilities/test-utils";

import StarRating from "./_star_rating";

describe("Star Rating Kit", () => {
  test("Displays two highlighted stars", () => {
    render(
      <StarRating rating={2} />
    );

    const highlight = document.querySelector(".pb_star_rating_highlight");
    const stars = highlight.querySelectorAll(".far.fa-star");
    const count = stars.length;

    expect(count).toBe(2);
  });
  test("Displays three highlighted stars and a half star", () => {
    render(
      <StarRating rating={3.5} />
    );

    const highlight = document.querySelector(".pb_star_rating_highlight");
    const stars = highlight.querySelectorAll(".far.fa-star");
    const halfStars = highlight.querySelectorAll(".far.fa-star-half");
    const starCount = stars.length;
    const halfStarCount = halfStars.length;

    expect(starCount).toBe(3);
    expect(halfStarCount).toBe(1);
  });
});
