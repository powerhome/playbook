import React from 'react';

import Title from '../_title';
import Caption from '../../pb_caption/_caption'

const TitleTruncate = (props) => {
  const lorem =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat est quae at commodi natus eos, doloribus ducimus consectetur expedita nisi nihil itaque dolorum fugit ratione earum distinctio reprehenderit! Veniam minus repellat laudantium provident tempora exercitationem unde dignissimos voluptas illo aperiam ut pariatur voluptatibus fugiat, incidunt rem, temporibus porro. Earum optio sint laboriosam eius ad obcaecati, accusamus ab inventore distinctio doloribus architecto sit! Eveniet perspiciatis dolore corporis ratione dicta! Quia, quibusdam."

  return (
    <>
      <Caption text="After first row" />
      <Title
          size={4}
          text={lorem}
          truncate={1}
          {...props}
      />

      <br />

      <Caption text="After second row" />
      <Title
          size={4}
          text={lorem}
          truncate={2}
          {...props}
      />

      <br />

      <Caption text="After third row" />
      <Title
          size={4}
          text={lorem}
          truncate={3}
          {...props}
      />

      <br />

      <Caption text="After fourth row" />
      <Title
          size={4}
          text={lorem}
          truncate={4}
          {...props}
      />

      <br />

      <Caption text="After fifth row" />
      <Title
          size={4}
          text={lorem}
          truncate={5}
          {...props}
      />
    </>
  )
}

export default TitleTruncate
