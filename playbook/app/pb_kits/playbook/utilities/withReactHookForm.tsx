import React from 'react'
import { FieldValues, Path, UseFormRegister, RegisterOptions } from 'react-hook-form'

export type WithReactHookFormProps<T extends FieldValues> = {
  name: Path<T>
  register?: UseFormRegister<T>
  rules?: Omit<RegisterOptions<T>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
  disabled?: boolean
}

export function withReactHookForm<
  P extends { onChange?: (...args: any[]) => void, onBlur?: (...args: any[]) => void, ref?: any },
  T extends FieldValues = FieldValues
>(
  WrappedComponent: React.ComponentType<P>
) {
  const WithReactHookFormComponent = React.forwardRef<
    HTMLElement,
    P & WithReactHookFormProps<T>
  >((props, ref) => {
    const { register, name, rules, disabled, ...rest } = props

    // If register is provided, use it to get field registration
    const fieldRegistration = register ? register(name, rules) : {}

    // Merge the registration with existing props, prioritizing registration
    const fieldProps = {
      ...rest,
      ...fieldRegistration,
      disabled: disabled || rest.disabled,
      ref: ref || fieldRegistration.ref,
      // Merge onChange handlers if both exist
      onChange: (...args: any[]) => {
        fieldRegistration.onChange?.(...args)
        ;(rest as P).onChange?.(...args)
      },
      // Merge onBlur handlers if both exist
      onBlur: (...args: any[]) => {
        fieldRegistration.onBlur?.(...args)
        ;(rest as P).onBlur?.(...args)
      }
    }

    return <WrappedComponent {...(fieldProps as P)} />
  })

  WithReactHookFormComponent.displayName = `WithReactHookForm(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`

  return WithReactHookFormComponent
} 