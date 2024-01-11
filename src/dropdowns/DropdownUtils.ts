import type { Ref, UnwrapNestedRefs } from "vue";
import { reactive, ref } from "vue";

type WithKey<K extends string, T> = {
  [k in K]: T;
};

type VoidFunction = () => void;

export type FancyDropdownComposable<Name extends string> =
  | WithKey<`${Name}Visible`, Ref<boolean>>
  | WithKey<`show${Capitalize<Name>}`, VoidFunction>
  | WithKey<`hide${Capitalize<Name>}`, VoidFunction>;

export function useFancyDropdown<Name extends string>(
  name: Name
): FancyDropdownComposable<Name> {
  const isVisible = ref(false);

  function show() {
    isVisible.value = true;
  }

  function hide() {
    isVisible.value = false;
  }

  // @ts-ignore
  return {
    [`${name}Visible`]: isVisible,
    [`show${name.replace(/^\w/, (c) => c.toUpperCase())}`]: show,
    [`hide${name.replace(/^\w/, (c) => c.toUpperCase())}`]: hide,
  };
}

interface DropdownComposable {
  visible: Ref<boolean>;
  show: () => void;
  hide: () => void;
}

export function useDropdown(): UnwrapNestedRefs<DropdownComposable> {
  const visible = ref(false);

  const show = () => {
    visible.value = true;
  };

  const hide = () => {
    visible.value = false;
  };

  return reactive({ visible, show, hide });
}
