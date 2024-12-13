import React from "react"
import {
  FieldValues,
  Path,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form"

export type WithReactHookFormProps<T extends FieldValues> = {
  name: Path<T>
  register?: UseFormRegister<T>
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >
  disabled?: boolean
}

function getDisplayName(WrappedComponent: React.ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function withReactHookForm<
  P extends {
    onChange?: (...args: any[]) => void
    onBlur?: (...args: any[]) => void
    ref?: any
  },
  T extends FieldValues = FieldValues
>(WrappedComponent: React.ComponentType<P>) {
  const WithReactHookFormComponent = React.forwardRef<HTMLElement, P & WithReactHookFormProps<T>>(
    (props, ref) => {
      const { register, name, rules, disabled, ...rest } = props

      if (!register) {
        return (<WrappedComponent {...(rest as P)}
            ref={ref}
                />)
      }

      const fieldRegistration = register(name, rules)

      const fieldProps = {
        ...rest,
        ...fieldRegistration,
        disabled: disabled || (rest as any).disabled,
        ref: ref || fieldRegistration.ref,
        onChange: (...args: any[]) => {
          fieldRegistration.onChange?.(...args)
          ;(rest as P).onChange?.(...args)
        },
        onBlur: (...args: any[]) => {
          fieldRegistration.onBlur?.(...args)
          ;(rest as P).onBlur?.(...args)
        },
      }

      return <WrappedComponent {...(fieldProps as P)} />
    }
  )

  WithReactHookFormComponent.displayName = `WithReactHookForm(${getDisplayName(WrappedComponent)})`
  return WithReactHookFormComponent
}
