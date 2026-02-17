import React from 'react'
import Button from "../../pb_button/_button"
import Caption from "../../pb_caption/_caption"

const ButtonIconVariant = (props) => (
  <div>
    <Caption 
        marginY="md" 
        text="Small Size (sm)" 
    />
    <Button
        icon="plus"
        marginRight='lg'
        size="sm"
        tabIndex={0}
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        marginRight='lg'
        size="sm"
        tabIndex={0}
        variant="secondary"
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        marginRight='lg'
        size="sm"
        tabIndex={0}
        variant="link"
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        marginRight='lg'
        size="sm"
        tabIndex={0}
        variant="danger"
        {...props}
    />
    {' '}
    <Button
        disabled
        icon="plus"
        marginRight='lg'
        size="sm"
        tabIndex={0}
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        loading
        marginRight='lg'
        size="sm"
        tabIndex={0}
        {...props}
    />
    <br/>
    <Caption 
        marginY="md" 
        text="Medium Size (md)" 
    />
    <Button
        icon="plus"
        marginRight='lg'
        size="md"
        tabIndex={0}
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        marginRight='lg'
        size="md"
        tabIndex={0}
        variant="secondary"
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        marginRight='lg'
        size="md"
        tabIndex={0}
        variant="link"
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        marginRight='lg'
        size="md"
        tabIndex={0}
        variant="danger"
        {...props}
    />
    {' '}
    <Button
        disabled
        icon="plus"
        marginRight='lg'
        size="md"
        tabIndex={0}
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        loading
        marginRight='lg'
        size="md"
        tabIndex={0}
        {...props}
    />
    <br/>
    <Caption 
        marginY="md" 
        text="Large Size (lg)" 
    />
    <Button
        icon="plus"
        marginRight='lg'
        size="lg"
        tabIndex={0}
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        marginRight='lg'
        size="lg"
        tabIndex={0}
        variant="secondary"
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        marginRight='lg'
        size="lg"
        tabIndex={0}
        variant="link"
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        marginRight='lg'
        size="lg"
        tabIndex={0}
        variant="danger"
        {...props}
    />
    {' '}
    <Button
        disabled
        icon="plus"
        marginRight='lg'
        size="lg"
        tabIndex={0}
        {...props}
    />
    {' '}
    <Button
        icon="plus"
        loading
        marginRight='lg'
        size="lg"
        tabIndex={0}
        {...props}
    />
  </div>
)

export default ButtonIconVariant
