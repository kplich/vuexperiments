<template>
  <section>
    <div>
      <MyTextInput
        id="text"
        label-text="Text input label"
        label-position="top"
        helper-text="This is just a helper text."
        helper-text-position="right"
        v-model:input-state="textInputState"
        :validators="[required('text'), minLength(3, 'text')]"
      />
      <pre>{{ JSON.stringify(textInputState.validationResults) }}</pre>
    </div>
    <div>
      <MyNumberInput
        label="Number input"
        helper-text="Input a number here."
        v-model="numberInputValue"
        label-position="top"
        :validators="[range(5, 10)]"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import MyTextInput from "@/inputs/MyTextInput.vue";
import MyNumberInput from "@/inputs/MyNumberInput.vue";
import { required, minLength, range } from "@/inputs/Validators";
import { ref } from "vue";
import { useInput } from "@/inputs/InputUtils";

const textInputState = useInput<string>("text", "");
const numberInputValue = ref(0);
</script>

<style scoped lang="scss">
section div {
  padding: 5px;
}

pre {
  overflow: scroll;
}
</style>
