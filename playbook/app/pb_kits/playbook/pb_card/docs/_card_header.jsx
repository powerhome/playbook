import React from 'react'
import Card from '../_card'
import Title from '../../pb_title/_title'
import Body from '../../pb_body/_body'

const CardHeader = (props) => {
    return (
        <>
            <Title
                {...props}
                marginBottom='sm'
                size={4}
                tag="h4"
                text="Category Colors"
            />

            <Card
                {...props}
                marginBottom='sm'
                padding="none"
            >
                <Card.Header headerColor="category_1" >
                    <Body
                        dark
                        text="Category 1"
                    />
                </Card.Header>
                <Card.Body>
                    <Body
                        {...props}
                        text="Body"
                    />
                </Card.Body>
            </Card>

            <Card
                {...props}
                marginBottom='sm'
                padding="none"
            >
                <Card.Header
                    headerColor="category_3"
                >
                    <Body text="Category 3" />
                </Card.Header>
                <Card.Body
                    padding="md"
                >
                    <Body
                        {...props}
                        text="Body"
                    />
                </Card.Body>
            </Card>


            <Title
                {...props}
                marginBottom='sm'
                size={4}
                tag="h4"
                text="Product Colors"
            />

            <Card
                {...props}
                marginBottom='sm'
                padding="none"
            >
                <Card.Header
                    headerColor="product_2_background"
                >
                    <Body
                        {...props}
                        dark
                        text="Product 2 Background"
                    />
                </Card.Header>
                <Card.Body>
                    <Body
                        {...props}
                        text="Body"
                    />
                </Card.Body>
            </Card>

            <Card
                {...props}
                marginBottom='sm'
                padding="none"
            >
                <Card.Header headerColor="product_6_background" >
                    <Body
                        {...props}
                        dark
                        text="Product 6 Background"
                    />
                </Card.Header>
                <Card.Body>
                    <Body
                        {...props}
                        text="Body"
                    />
                </Card.Body>
            </Card>


            <Title
                {...props}
                marginBottom='sm'
                size={4}
                tag="h4"
                text="Background Colors"
            />

            <Card
                {...props}
                marginBottom='sm'
                padding="none"
            >
                <Card.Header
                    headerColor="white"
                >
                    <Body text="White" />
                </Card.Header>
                <Card.Body>
                    <Body
                        {...props}
                        text="Body"
                    />
                </Card.Body>
            </Card>

            <Card
                {...props}
                marginBottom='sm'
                padding="none"
            >
                <Card.Header
                    headerColor="dark"
                >
                    <Body
                        dark
                        text="Dark"
                    />
                </Card.Header>
                <Card.Body>
                    <Body
                        {...props}
                        text="Body"
                    />
                </Card.Body>
            </Card>

            <Title
                {...props}
                marginBottom='sm'
                size={4}
                tag="h4"
                text="Striped Colors"
            />

            <Card
                {...props}
                marginBottom='sm'
                padding="none"
            >
                <Card.Header
                    headerColor="category_1"
                    headerColorStriped
                >
                    <Body
                        dark
                        text="Striped Category 1"
                    />
                </Card.Header>
                <Card.Body>
                    <Body
                        {...props}
                        text="Body"
                    />
                </Card.Body>
            </Card>

            <Title
                {...props}
                marginBottom='sm'
                size={4}
                tag="h4"
                text="Subtle Status Colors"
            />

            <Card
                {...props}
                marginBottom='sm'
                padding="none"
            >
                <Card.Header
                    headerColor="error_subtle"
                >
                    <Body
                        {...props}
                        text="Error Subtle"
                    />
                </Card.Header>
                <Card.Body>
                    <Body
                        {...props}
                        text="Body"
                    />
                </Card.Body>
            </Card>
        </>
    )
}

export default CardHeader
