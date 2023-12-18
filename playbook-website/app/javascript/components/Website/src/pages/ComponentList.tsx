import React from "react";
import { NavLink, Outlet, useLoaderData, useOutlet } from "react-router-dom";

import { KitCard } from "../components/KitCard";
import { Hero } from "../components/Hero";
import { KitGrid } from "../components/KitGrid";
import { PageContainer } from "../components/PageContainer";
import { CategoryTitle } from "../components/CategoryTitle";

const description =
  "Components are the reusable building blocks of our design system. Each component meets a specific interaction or UI need, and has been specifically created to work together to create patterns and intuitive user experiences.";

export default function ComponentList() {
  const outlet = useOutlet();
  const { kits } = useLoaderData();

  return (
    <>
      {!outlet && (
        <>
          <Hero description={description} title="Components" />
          <PageContainer>
            {kits.map(({ name, components }, index) => (
              <section
                className="category mb_xl"
                key={`${name}-${index}`}
                id={name}
              >
                <NavLink to={`/beta/kit_category/${name}`}>
                  <CategoryTitle name={name} />
                </NavLink>
                <KitGrid>
                  {components.map(({ name, description }, index) => (
                    <KitCard
                      description={description}
                      name={name}
                      key={`${name}-${index}`}
                    />
                  ))}
                </KitGrid>
              </section>
            ))}
          </PageContainer>
        </>
      )}

      <Outlet />
    </>
  );
}
