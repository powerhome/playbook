import React from "react"
import {
  FieldValues,
  Path,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form"

export type WithReactHookFormProps<T extends FieldValues> = {
  name?: Path<T>
  register?: UseFormRegister<T>
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >
}

function getDisplayName(WrappedComponent: React.ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function withReactHookForm<
  P extends {
    onChange?: (event: React.ChangeEvent<any>) => void
    onBlur?: (event: React.FocusEvent<any>) => void
    ref?: React.Ref<any>
    name?: string
  },
  T extends FieldValues = FieldValues
>(WrappedComponent: React.ComponentType<P> & { displayName?: string }) {
  const WithReactHookFormComponent = React.forwardRef<HTMLElement, P & WithReactHookFormProps<T>>(
    (props, ref) => {
      const { register, rules, ...rest } = props

      if (!register) {
        return React.createElement(WrappedComponent, { ...rest as P, ref })
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Type instantiation is excessively deep and possibly infinite
      const fieldRegistration = register(props.name, rules)

      const fieldProps = {
        ...rest,
        ...fieldRegistration,
        ref: ref || fieldRegistration.ref,
        onChange: (event: React.ChangeEvent<any>) => {
          fieldRegistration.onChange?.(event)
          ;(rest as P).onChange?.(event)
        },
        onBlur: (event: React.FocusEvent<any>) => {
          fieldRegistration.onBlur?.(event)
          ;(rest as P).onBlur?.(event)
        },
      }

      return React.createElement(WrappedComponent, fieldProps as P)
    }
  )

  WithReactHookFormComponent.displayName = `WithReactHookForm(${getDisplayName(WrappedComponent)})`
  return WithReactHookFormComponent
}
