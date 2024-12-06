import { UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form'

export type HookFormProps<T extends FieldValues = FieldValues> = {
  register?: UseFormRegister<T>
  rules?: RegisterOptions
  name: string
}

export const withHookForm = <T extends FieldValues = FieldValues>(
  props: HookFormProps<T>
) => {
  const { register, name, rules } = props
  if (!register) return {}
  
  return register(name, rules) 
} 