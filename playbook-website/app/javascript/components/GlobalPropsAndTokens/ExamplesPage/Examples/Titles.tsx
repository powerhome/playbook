import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const Titles = () => {
    return (
        <>
            <ShowPage
                pageType="tokens"
                title="Titles"
                description="Title tokens define typographic styles for headings and page titles. Includes size, weight, and spacing to ensure consistent hierarchy and structure across the UI."
            >
                <PropsExamplesTable
                    headers={["Token", "Value", "SASS Example"]}
                    rows={[
                        [
                            "pb_title",
                            <>
                                {`font-size: 44px ($heading_1)
                                    font-weight: 300 ($lighter)
                                    line-height: $lh_tighter (from line_height file)
                                    letter-spacing: -0.01em ($lspace_tight)
                                    color: $text_lt_default
                                    font-family: 'Power Centra', 'Helvetica Neue', Helvetica, Arial, sans_serif`
                                    .split('\n')
                                    .map((line, idx) => (
                                        <span key={idx}>
                                            {line}
                                            <br />
                                        </span>
                                    ))
                                }
                            </>,
                            <>
                                <ExampleCodeCard
                                    id="pb_title_example_1"
                                    text=".class-name { @include pb_title; }"
                                />
                                <br />
                                <ExampleCodeCard
                                    id="pb_title_example_2"
                                    text=".class-name { @include pb_title($heading_2, $bolder, 1.4, $lspace_normal); }"
                                />
                            </>,

                        ],
                        [
                            "pb_title_1",
                            <>
                                {`font-size: 44px ($heading_1)
                                    font-weight: 300 ($lighter)
                                    line-height: $lh_tighter (from line_height file)
                                    letter-spacing: -0.01em ($lspace_tight)
                                    color: $text_lt_default
                                    font-family: "Power Centra", "Helvetica Neue", Helvetica, Arial, sans_serif`
                                    .split('\n')
                                    .map((line, idx) => (
                                        <span key={idx}>
                                            {line}
                                            <br />
                                        </span>
                                    ))
                                }
                            </>,
                            <>
                                <ExampleCodeCard
                                    id="pb_title_1_example_1"
                                    text=".class-name { @include pb_title_1; }"
                                />
                                <br />
                                <ExampleCodeCard
                                    id="pb_title_1_example_2"
                                    text=".class-name { @include pb_title($heading_1, $lighter, $lh_tighter, $lspace_tight); }"
                                />
                            </>,
                        ],
                        [
                            "pb_title_2",
                            <>
                                {`font-size: 32px ($heading_2)
                                    font-weight: 300
                                    line-height: 0.96
                                    letter-spacing: -0.01em`
                                    .split('\n')
                                    .map((line, idx) => (
                                        <span key={idx}>
                                            {line}
                                            <br />
                                        </span>
                                    ))
                                }
                            </>,
                            <>
                                <ExampleCodeCard
                                    id="pb_title_2_example_1"
                                    text=".class-name { @include pb_title_2; }"
                                />
                                <br />
                                <ExampleCodeCard
                                    id="pb_title_2_example_2"
                                    text=".class-name { @include pb_title($heading_2, $lighter, 0.96, $lspace_tight); }"
                                />
                            </>,
                        ],
                        [
                            "pb_title_3",
                            <>
                                {`font-size: 15.5px ($heading_4 = $font_base)
                                    font-weight: 700 ($bolder)
                                    letter-spacing: 0.003em ($lspace_normal)`
                                    .split('\n')
                                    .map((line, idx) => (
                                        <span key={idx}>
                                            {line}
                                            <br />
                                        </span>
                                    ))
                                }
                            </>,
                            <>
                                <ExampleCodeCard
                                    id="pb_title_3_example_1"
                                    text=".class-name { @include pb_title_3; }"
                                />
                                <br />
                                <ExampleCodeCard
                                    id="pb_title_3_example_2"
                                    text=".class-name { @include pb_title($heading_3, $lighter, $lh_tighter, $lspace_tight); }"
                                />
                            </>,
                        ],
                        [
                            "pb_title_4",
                            <>
                                {`font-size: 27px ($heading_3 = $font_larger)
                                    font-weight: 300 ($lighter)
                                    line-height: $lh_tighter (from line_height file)
                                    letter-spacing: -0.01em ($lspace_tight)
                                    color: $text_lt_default
                                    font-family: "Power Centra", "Helvetica Neue", Helvetica, Arial, sans_serif`
                                    .split('\n')
                                    .map((line, idx) => (
                                        <span key={idx}>
                                            {line}
                                            <br />
                                        </span>
                                    ))
                                }
                            </>,
                            <>
                                <ExampleCodeCard
                                    id="pb_title_4_example_1"
                                    text=".class-name { @include pb_title_4; }"
                                />
                                <br />
                                <ExampleCodeCard
                                    id="pb_title_4_example_2"
                                    text=".class-name { @include pb_title($heading_4, $bolder, $lh_tighter, $lspace_normal);}"
                                />
                            </>,
                        ],
                        [
                            "pb_title_bold",
                            "font-weight: 700 ($bolder)",
                            <ExampleCodeCard
                                id="pb_title_bold_example_1"
                                text=".class-name { @include pb_title_bold; }"
                            />
                        ],
                        [
                            "pb_title_thin",

                            <>
                                {`font-weight: 300 ($lighter)
                                    letter-spacing: -0.01em ($lspace_tight)`
                                    .split('\n')
                                    .map((line, idx) => (
                                        <span key={idx}>
                                            {line}
                                            <br />
                                        </span>
                                    ))
                                }
                            </>,
                            <>
                                <ExampleCodeCard
                                    id="pb_title_thin_example_1"
                                    text=".class-name { @include pb_title_thin; }"
                                />
                            </>
                        ],
                    ]}
                >
                </PropsExamplesTable>
            </ShowPage>
        </>
    )
}

export default Titles;