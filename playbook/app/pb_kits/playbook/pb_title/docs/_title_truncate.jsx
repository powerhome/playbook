import React from 'react';

import Title from '../_title';
import Caption from '../../pb_caption/_caption'
import Flex from '../../pb_flex/_flex'

const TitleTruncate = (props) => {
  const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minus. Nisi beatae voluptatum labore sequi. Nemo accusantium corrupti, reiciendis magnam tenetur perferendis esse pariatur voluptas eaque hic vel rem nihil quidem dolorum ex dolor, libero ullam placeat, sapiente eos. Cumque obcaecati dignissimos molestiae, minima quibusdam sint maxime libero accusantium animi quis quia maiores enim ipsum, esse, modi laudantium illum error!"

  return (
    <Flex
        maxWidth="md"
        orientation="column"
    >
      <Caption text="After first row" />
      <Title
          size={4}
          text={lorem}
          truncate="1"
          {...props}
      />

      <br />

      <Caption text="After second row" />
      <Title
          size={4}
          text={lorem}
          truncate="2"
          {...props}
      />

      <br />

      <Caption text="After third row" />
      <Title
          size={4}
          text={lorem}
          truncate="3"
          {...props}
      />

      <br />

      <Caption text="After fourth row" />
      <Title
          size={4}
          text={lorem}
          truncate="4"
          {...props}
      />

      <br />

      <Caption text="After fifth row" />
      <Title
          size={4}
          text={lorem}
          truncate="5"
          {...props}
      />
    </Flex>
  )
}

export default TitleTruncate
