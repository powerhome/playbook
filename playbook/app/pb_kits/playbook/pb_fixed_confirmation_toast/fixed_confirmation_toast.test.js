import React from 'react'
import { render, waitFor } from '../utilities/test-utils'

import { FixedConfirmationToast } from 'playbook-ui'

beforeEach(() => {
    // Silences error logs within the test suite.
    jest.spyOn(console, 'error')
    // eslint-disable-next-line
    console.error.mockImplementation(() => {})
})
  
afterEach(() => {
    // eslint-disable-next-line
    console.error.mockRestore()
})

test('renders with default props', () => {
    const { container } = render(<FixedConfirmationToast />);
    expect(container.firstChild).toBeInTheDocument();
});

test('renders with text', () => {
    const { getByText } = render(<FixedConfirmationToast text="Message Text" />);
    expect(getByText('Message Text')).toBeInTheDocument();
});

test('does not render if open prop is false', () => {
    const { container } = render(<FixedConfirmationToast open={false} />);
    expect(container.firstChild).toBeNull();
});

test('closes after autoClose duration', async () => {
    jest.useFakeTimers();
    const onCloseMock = jest.fn();
    render(
        <FixedConfirmationToast 
            autoClose={1000} 
            onClose={onCloseMock}
            open
        />
    );
    
    jest.advanceTimersByTime(1000);
    await waitFor(() => expect(onCloseMock).toHaveBeenCalled());
});

test('renders success status with icon', () => {
    const { container } = render(<FixedConfirmationToast status="success" />);
    expect(container.querySelector('.pb_fixed_confirmation_toast_kit_success')).toBeInTheDocument();
    expect(container.querySelector('.pb_icon')).toBeInTheDocument();
});
  
test('renders custom icon when provided', () => {
    const { container } = render(<FixedConfirmationToast icon="wrench" />);
    expect(container.querySelector('.custom_icon')).toBeInTheDocument();
});

test("renders no icon when icon prop is 'none'", () => {
    const { container } = render(<FixedConfirmationToast icon="none" />);
    expect(container.querySelector('.pb_icon')).not.toBeInTheDocument();
    expect(container.querySelector('.custom_icon')).not.toBeInTheDocument();
});

test('renders correctly with multiLine prop', () => {
    const { container } = render(<FixedConfirmationToast multiLine />);
    expect(container.querySelector('.pb_fixed_confirmation_toast_kit_neutral_multi_line')).toBeInTheDocument();
});

test('renders position when provided', () => {
    const { container } = render(
        <FixedConfirmationToast 
            horizontal="right"
            vertical="bottom" 
        />
    );
    expect(container.querySelector('.positioned_toast')).toBeInTheDocument();
});

test('renders max zIndex by default', () => {
    const { container } = render(<FixedConfirmationToast />);
    expect(container.querySelector('.z_index_max')).toBeInTheDocument();
});

test('applies custom zIndex when provided', () => {
    const { container } = render(<FixedConfirmationToast zIndex={10} />);
    expect(container.querySelector('.z_index_10')).toBeInTheDocument();
});