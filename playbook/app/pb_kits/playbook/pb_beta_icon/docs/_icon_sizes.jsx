import React from 'react'

import Icon from '../_icon'

const IconSizes = (props) => {
  return (
    <div>
      <p>
        <Icon
            icon="user"
            size="lg"
            {...props}
        />
        {' '}
        <span>{'Large'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="sm"
            {...props}
        />
        {' '}
        <span>{'Small'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="xs"
            {...props}
        />
        {' '}
        <span>{'XSmall'}</span>
      </p>

      <br />
      <br />

      <p>
        <Icon
            icon="user"
            size="1x"
            {...props}
        />
        {' '}
        <span>{'1x'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="2x"
            {...props}
        />
        {' '}
        <span>{'2x'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="3x"
            {...props}
        />
        {' '}
        <span>{'3x'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="4x"
            {...props}
        />
        {' '}
        <span>{'4x'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="5x"
            {...props}
        />
        {' '}
        <span>{'5x'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="6x"
            {...props}
        />
        {' '}
        <span>{'6x'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="7x"
            {...props}
        />
        {' '}
        <span>{'7x'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="8x"
            {...props}
        />
        {' '}
        <span>{'8x'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="9x"
            {...props}
        />
        {' '}
        <span>{'9x'}</span>
      </p>
      <p>
        <Icon
            icon="user"
            size="10x"
            {...props}
        />
        {' '}
        <span>{'10x'}</span>
      </p>
    </div>
  )
}

export default IconSizes
