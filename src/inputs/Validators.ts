export type Validator<T> = (value: T) => string | null;

export function required(fieldName: string = "value"): Validator<string> {
  function _required(value: string): string | null {
    if (value === "") {
      return `${fieldName} mustn't be empty.`;
    }

    return null;
  }

  return _required;
}

export function minLength(
  min: number,
  fieldName: string = "value"
): Validator<string> {
  function _minLength(value: string): string | null {
    if (value.length >= min) {
      return null;
    } else {
      return `${fieldName} must be at least ${min} characters long.`;
    }
  }

  return _minLength;
}

export function range(
  min: number,
  max: number,
  fieldName: string = "value"
): Validator<number> {
  if (min > max) {
    console.warn(`min value (${min}) greater than max value (${max})`);
  }

  return (value: number) => {
    if (min <= value && value <= max) {
      return null;
    } else {
      return `${fieldName} ${value} not between ${min} and ${max}`;
    }
  };
}
