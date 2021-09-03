import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'Albert King',
    url: 'www.google.com',
    title: 'Born Under A Bad Sign'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Born Under A Bad Sign by Albert King'
  )


  expect()

  // method 2
  const element = component.getByText(
    'Born Under A Bad Sign by Albert King'
  )
  expect(element).toBeDefined()

  component.debug()
  const li = component.container.querySelector('div')
  console.log(prettyDOM(li))

// mock functions are useful replacements for the dependencies the component might have
// automated tests are epic!
// https://testing-library.com/docs/queries/about/#queries
}
)