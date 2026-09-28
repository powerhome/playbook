import { Background } from "playbook-ui";
import OnClick from "./Examples/OnClick";

const COMPONENT_MAP = {
  on_click: OnClick,
};

type GlobalEventPropsExamplesProps = {
  routeParamName?: string,
}

const GlobalEventPropsExamples = ({ routeParamName }: GlobalEventPropsExamplesProps = {}) => {
  function getGlobalEventPropsExample(pathname: string): string | null {
    const parts: string[] = pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("global_event_props");
    return idx >= 0 ? parts[idx + 1] ?? null : null;
  }

  const key = routeParamName ?? getGlobalEventPropsExample(window.location.pathname);
  type ComponentKey = keyof typeof COMPONENT_MAP;

  const ExampleComponent = COMPONENT_MAP[key as ComponentKey] || null;

  return (
    <Background backgroundColor="white">
      {ExampleComponent ? <ExampleComponent /> : null}
    </Background>
  );
};

export default GlobalEventPropsExamples;
