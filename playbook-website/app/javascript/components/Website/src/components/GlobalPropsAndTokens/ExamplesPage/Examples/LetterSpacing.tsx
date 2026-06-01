import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const LetterSpacing = () => {
    return (
        <>
            <ShowPage
                pageType="tokens"
                title="Letter Spacing"
                description="Letter Spacing tokens control the spacing between characters in text. They are useful for fine-tuning typographic tone in headings, buttons, and labels."
            >
                <PropsExamplesTable
                    headers={["Token", "Value", "SASS Example"]}
                    rows={[
                        [
                            "$lspace_tightest",
                            "-.1em",
                            <ExampleCodeCard
                                id="lspace-tightest"
                                text="letter-spacing: $lspace_tightest;"
                            />
                        ],
                        [
                            "$lspace_tighter",
                            "-.07em",
                            <ExampleCodeCard
                                id="lspace-tighter"
                                text="letter-spacing: $lspace_tighter;"
                            />
                        ],
                        [
                            "$lspace_tight",
                            "-.01em",
                            <ExampleCodeCard
                                id="lspace-tight"
                                text="letter-spacing: $lspace_tight;"
                            />
                        ],
                        [
                            "$lspace_normal",
                            ".003em",
                            <ExampleCodeCard
                                id="lspace_normal"
                                text="letter-spacing: $lspace_normal;"
                            />
                        ],
                        [
                            "lspace_loose",
                            ".03em",
                            <ExampleCodeCard
                                id="lspace_loose"
                                text="letter-spacing: $lspace_loose"
                            />
                        ],
                        [
                            "lspace_looser",
                            ".07em",
                            <ExampleCodeCard
                                id="lspace_looser"
                                text="letter-spacing: $lspace_looser;"
                            />
                        ],
                        [
                            "lspace_loosest",
                            ".1em",
                            <ExampleCodeCard
                                id="lspace_loosest"
                                text="letter-spacing: $lspace_loosest;"
                            />
                        ],
                        [
                            "lspace_super_loosest",
                            ".2em",
                            <ExampleCodeCard
                                id="lspace_super_loosest"
                                text="letter-spacing: $lspace_super_loosest;"
                            />
                        ],

                    ]}
                >

                </PropsExamplesTable>
            </ShowPage>
        </>
    )
}

export default LetterSpacing;