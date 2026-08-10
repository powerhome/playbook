import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Highlight from './_highlight'
import Body from '../pb_body/_body'
import { findHighlightChunks } from './_highlightChunks'

describe('findHighlightChunks', () => {
  test('returns a single non-highlight chunk when there are no matches', () => {
    expect(findHighlightChunks('hello world', ['missing'])).toEqual([
      { start: 0, end: 11, highlight: false },
    ])
  })

  test('finds a single search term case-insensitively', () => {
    expect(findHighlightChunks('Hello World', ['world'])).toEqual([
      { start: 0, end: 6, highlight: false },
      { start: 6, end: 11, highlight: true },
    ])
  })

  test('finds multiple matches of the same term', () => {
    expect(findHighlightChunks('foo bar foo', ['foo'])).toEqual([
      { start: 0, end: 3, highlight: true },
      { start: 3, end: 8, highlight: false },
      { start: 8, end: 11, highlight: true },
    ])
  })

  test('finds multiple search terms', () => {
    expect(findHighlightChunks('red and blue', ['red', 'blue'])).toEqual([
      { start: 0, end: 3, highlight: true },
      { start: 3, end: 8, highlight: false },
      { start: 8, end: 12, highlight: true },
    ])
  })

  test('merges overlapping matches into one highlight chunk', () => {
    expect(findHighlightChunks('highlight', ['high', 'highlight'])).toEqual([
      { start: 0, end: 9, highlight: true },
    ])
  })

  test('merges adjacent matches into one highlight chunk', () => {
    expect(findHighlightChunks('foobar', ['foo', 'bar'])).toEqual([
      { start: 0, end: 6, highlight: true },
    ])
  })

  test('matches regex special characters literally', () => {
    expect(findHighlightChunks('cost is $5.00 (approx)', ['$5.00', '(approx)'])).toEqual([
      { start: 0, end: 8, highlight: false },
      { start: 8, end: 13, highlight: true },
      { start: 13, end: 14, highlight: false },
      { start: 14, end: 22, highlight: true },
    ])
  })

  test('ignores empty search terms', () => {
    expect(findHighlightChunks('hello', ['', 'hello'])).toEqual([
      { start: 0, end: 5, highlight: true },
    ])
  })
})

describe('Highlight', () => {
  test('highlights a single search term from the text prop', () => {
    render(
      <Highlight
          data={{ testid: 'highlight-single' }}
          highlightedText={['Highlight']}
          text="This is the Highlight Kit."
      />
    )

    const kit = screen.getByTestId('highlight-single')
    const marks = kit.querySelectorAll('mark')

    expect(marks).toHaveLength(1)
    expect(marks[0]).toHaveTextContent('Highlight')
    expect(marks[0]).toHaveClass('pb_highlight_kit')
    expect(kit).toHaveTextContent('This is the Highlight Kit.')
  })

  test('highlights content passed via children', () => {
    render(
      <Highlight
          data={{ testid: 'highlight-children' }}
          highlightedText={['children']}
      >
        Content via children works.
      </Highlight>
    )

    const kit = screen.getByTestId('highlight-children')
    const marks = kit.querySelectorAll('mark')

    expect(marks).toHaveLength(1)
    expect(marks[0]).toHaveTextContent('children')
    expect(kit).toHaveTextContent('Content via children works.')
  })

  test('highlights multiple search terms and multiple matches', () => {
    render(
      <Highlight
          data={{ testid: 'highlight-multi' }}
          highlightedText={['cat', 'dog']}
          text="cat and dog and cat"
      />
    )

    const kit = screen.getByTestId('highlight-multi')
    const marks = Array.from(kit.querySelectorAll('mark')).map((mark) => mark.textContent)

    expect(marks).toEqual(['cat', 'dog', 'cat'])
  })

  test('merges overlapping or adjacent matches into one mark', () => {
    render(
      <Highlight
          data={{ testid: 'highlight-merge' }}
          highlightedText={['foo', 'bar']}
          text="foobar"
      />
    )

    const kit = screen.getByTestId('highlight-merge')
    const marks = kit.querySelectorAll('mark')

    expect(marks).toHaveLength(1)
    expect(marks[0]).toHaveTextContent('foobar')
  })

  test('renders without marks when there are no matches', () => {
    render(
      <Highlight
          data={{ testid: 'highlight-none' }}
          highlightedText={['missing']}
          text="nothing to see"
      />
    )

    const kit = screen.getByTestId('highlight-none')

    expect(kit.querySelectorAll('mark')).toHaveLength(0)
    expect(kit).toHaveTextContent('nothing to see')
  })

  test('matches case-insensitively', () => {
    render(
      <Highlight
          data={{ testid: 'highlight-case' }}
          highlightedText={['highlight']}
          text="HiGhLiGhT text"
      />
    )

    const kit = screen.getByTestId('highlight-case')
    const marks = kit.querySelectorAll('mark')

    expect(marks).toHaveLength(1)
    expect(marks[0]).toHaveTextContent('HiGhLiGhT')
  })

  test('matches regex special characters literally', () => {
    render(
      <Highlight
          data={{ testid: 'highlight-regex' }}
          highlightedText={['a+b', '(x)', 'file.js']}
          text="use a+b or (x) in file.js"
      />
    )

    const kit = screen.getByTestId('highlight-regex')
    const marks = Array.from(kit.querySelectorAll('mark')).map((mark) => mark.textContent)

    expect(marks).toEqual(['a+b', '(x)', 'file.js'])
  })

  test('passes id and htmlOptions through to the wrapper', () => {
    render(
      <Highlight
          data={{ testid: 'highlight-attrs' }}
          htmlOptions={{ 'aria-label': 'highlighted content' }}
          id="highlight-id"
          text="highlight me"
      />
    )

    const kit = screen.getByTestId('highlight-attrs')

    expect(kit).toHaveAttribute('id', 'highlight-id')
    expect(kit).toHaveAttribute('aria-label', 'highlighted content')
  })

  test('uses the default highlightedText of highlight when omitted', () => {
    render(
      <Highlight
          data={{ testid: 'highlight-default' }}
          text="default highlight behavior"
      />
    )

    const kit = screen.getByTestId('highlight-default')
    const marks = kit.querySelectorAll('mark')

    expect(marks).toHaveLength(1)
    expect(marks[0]).toHaveTextContent('highlight')
  })
})

describe('Body with highlighting', () => {
  test('renders Highlight for matching text via text prop', () => {
    render(
      <Body
          data={{ testid: 'body-highlight' }}
          highlightedText={['highlighted', 'Body Kit']}
          highlighting
          text="This is text highlighted in the Body Kit."
      />
    )

    const kit = screen.getByTestId('body-highlight')
    const marks = Array.from(kit.querySelectorAll('mark')).map((mark) => mark.textContent)

    expect(kit).toHaveClass('pb_body_kit')
    expect(marks).toEqual(['highlighted', 'Body Kit'])
    expect(kit).toHaveTextContent('This is text highlighted in the Body Kit.')
  })

  test('renders Highlight for matching text via children', () => {
    render(
      <Body
          data={{ testid: 'body-highlight-children' }}
          highlightedText={['children']}
          highlighting
      >
        Body with children highlight
      </Body>
    )

    const kit = screen.getByTestId('body-highlight-children')
    const marks = kit.querySelectorAll('mark')

    expect(marks).toHaveLength(1)
    expect(marks[0]).toHaveTextContent('children')
  })

  test('does not highlight when highlighting is false', () => {
    render(
      <Body
          data={{ testid: 'body-no-highlight' }}
          highlightedText={['highlighted']}
          text="This is text highlighted in the Body Kit."
      />
    )

    const kit = screen.getByTestId('body-no-highlight')

    expect(kit.querySelectorAll('mark')).toHaveLength(0)
    expect(kit).toHaveTextContent('This is text highlighted in the Body Kit.')
  })
})
