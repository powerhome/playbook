import { UseFormRegister, FieldValues, RegisterOptions, Path } from 'react-hook-form'

export type HookFormProps<T extends FieldValues = FieldValues> = {
  register?: UseFormRegister<T>
  rules?: RegisterOptions
  name: Path<T>
}

export const withHookForm = <T extends FieldValues = FieldValues>(
  props: HookFormProps<T>
) => {
  const { register, name, rules } = props
  if (!register) return {}
  
  const registration = register(name, rules)
  return {
    onChange: registration.onChange,
    onBlur: registration.onBlur,
    ref: registration.ref,
    name: registration.name,
  }
} 