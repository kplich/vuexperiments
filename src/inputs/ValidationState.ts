export type ValidationResults = ValidationResult[];

export interface ValidationResult {
  name: string;
  message: string | null;
}
