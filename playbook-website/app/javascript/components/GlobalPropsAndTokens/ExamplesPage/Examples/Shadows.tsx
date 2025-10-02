import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Shadows = () => {
    return (
        <>
            <ShowPage
                pageType="tokens"
                title="Shadow"
                description="Shadow tokens define box-shadow styles to create depth and visual hierarchy. Commonly used for modals, cards, and elevated UI components."
            >
                <PropsExamplesTable
                    headers={["Token", "Value", "SASS Example"]}
                    rows={[
                        [
                            "$shadow_none",
                            "0 0 0 0 transparent",
                            <ExampleCodeCard
                                id="shadow_none"
                                text="box-shadow: $shadow_none;"
                            />
                        ],
                          [
                            "$shadow_deep",
                            "0 4px 10px 0 rgba($shadow, 0.16)",
                            <ExampleCodeCard
                                id="shadow_deep"
                                text="box-shadow: $shadow_deep;"
                            />
                        ],
                          [
                            "$shadow_deeper",
                            "0 12px 28px 0 rgba($shadow, 0.18)",
                            <ExampleCodeCard
                                id="shadow_deeper"
                                text="box-shadow: $shadow_deeper;"
                            />
                        ],
                          [
                            "$shadow_deepest",
                            "0 30px 38px 4px $shadow, 0 2px 14px 4px rgba($shadow, 0.1)",
                            <ExampleCodeCard
                                id="shadow_deepest"
                                text="box-shadow: $shadow_deepest;"
                            />
                        ],
                    ]}
                >

                </PropsExamplesTable>
            </ShowPage>
        </>
    )
}

export default Shadows;