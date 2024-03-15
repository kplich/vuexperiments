import type { DirectiveBinding, ObjectDirective } from "vue";

// Extend the HTMLElement interface to include the clickOutsideEvent property
declare global {
  interface HTMLElement {
    clickOutsideEvent?: (this: HTMLElement, ev: MouseEvent) => any;
  }
}

export const clickOutside: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: MouseEvent) {
      console.log("clicked outside!");
      // Check that the click was outside the el and its children, and if so, call the provided method.
      if (!(el == event.target || el.contains(event.target as Node))) {
        binding.value(event); // Execute the function provided as the value of the v-click-outside directive.
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el: HTMLElement) {
    if (el.clickOutsideEvent) {
      // Remove the event listener when the element is unmounted to prevent memory leaks.
      document.body.removeEventListener("click", el.clickOutsideEvent);
    }
  },
};
