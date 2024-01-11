import type { ValidationResults } from "@/inputs/ValidationState";
import { ref } from "vue";

export interface InputState<T> {
  inputValue: T;
  validationResults: ValidationResults;
}

export function useInput<T>(id: string, initialValue: T) {
  return ref({
    inputValue: initialValue,
    validationResults: [],
  });
}
