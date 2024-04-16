<template>
  <main>
    <section>
      <h2>Dropdowns and menus</h2>
      <div class="row-of-things">
        <VDropdown>
          <template v-slot:button="{ show }">
            <VButton @click="show">Click me to open a dropdown!</VButton>
          </template>
          <template v-slot:content>
            <VCard size="small">
              <span>This is a dropdown!</span>
              <MyTextInput
                :id="inputId"
                label-text="An input in a dropdown!"
                helper-text="Amazing!"
                v-model:input-state="input"
              />
            </VCard>
          </template>
        </VDropdown>

        <VDropdown>
          <template v-slot:button="{ show }">
            <VButton @click="show">Click me to open a menu!</VButton>
          </template>
          <template v-slot:content="{ hide }">
            <VMenu>
              <VMenuItem>Hello world!</VMenuItem>
              <VMenuItem>This is a menu!</VMenuItem>
              <VMenuItem>
                It even supports...
                <VMenu>
                  <VMenuItem>multi-level</VMenuItem>
                  <VMenuItem :disabled="true">menus!</VMenuItem>
                  <VMenuItem>
                    It really does!
                    <VMenu>
                      <VMenuItem disabled>Look!</VMenuItem>
                      <VMenuItem>A third level item!</VMenuItem>
                    </VMenu>
                  </VMenuItem>
                </VMenu>
              </VMenuItem>
              <VMenuItem @click="hide()"> Click and hide me! </VMenuItem>
              <VMenuItem @click="hide(openModal)">
                I'll show you a modal!
              </VMenuItem>
            </VMenu>
          </template>
        </VDropdown>
      </div>
    </section>
    <VSeparator />
    <section>
      <h2>Simple selection</h2>
      <div>
        <h3>Different vertical alignment:</h3>
        <div class="row-of-things">
          <VSelectSingle
            :options="options"
            v-model="simpleSelection1"
            horizontal-position="left"
            display-checkmark
          />
          <VSelectSingle
            :options="options"
            v-model="simpleSelection2"
            horizontal-position="center"
            display-checkmark
          />
          <VSelectSingle
            :options="options"
            v-model="simpleSelection3"
            horizontal-position="right"
            display-checkmark
          />
        </div>
      </div>
      <div>
        <h3>Icons!</h3>
        <div class="row-of-things">
          <VSelectSingle
            :options="languageSelectionOptions"
            v-model="selectedLanguageOption"
          />
        </div>
      </div>
    </section>
    <VSeparator />
    <section>
      <h2>Selection with an input</h2>
      <p>Clear the input and see all the available options!</p>
      <div class="row-of-things">
        <VSelectSingle
          :options="filteredWordsOptions"
          v-model="selectedWordOption"
          @update:modelValue="updateInputState"
        >
          <template v-slot:selected="{ show }">
            <MyTextInput
              v-model:input-state="selectedWordInputState"
              @click="() => show()"
            />
          </template>
        </VSelectSingle>
      </div>
    </section>
    <VSeparator />
    <section>
      <h2>Multiple selection</h2>
      <p>Choose your favorite fruits!</p>
      <div class="row-of-things">
        <VSelectMultiple
          :options="fruitOptions"
          v-model="selectedMultiple"
          horizontal-position="right"
        >
          <template v-slot:selected="{ show, selected }">
            <VButton @click.stop="show">
              Selected {{ selected.length }} fruit(s)
            </VButton>
          </template>
        </VSelectMultiple>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import VButton from "@/common/components/VButton.vue";
import VMenu from "@/common/components/VMenu.vue";
import MyTextInput from "@/inputs/MyTextInput.vue";
import { useInput } from "@/inputs/InputUtils";
import VMenuItem from "@/common/components/VMenuItem.vue";
import VDropdown from "@/common/components/VDropdown.vue";
import VCard from "@/common/components/VCard.vue";
import { useModalStore } from "@/modals/store";
import VSeparator from "@/common/components/VSeparator.vue";
import VSelectMultiple from "@/common/components/VSelectMultiple.vue";
import VSelectSingle from "@/common/components/VSelectSingle.vue";
import type { SelectionOption } from "@/common/components/SelectionOption";
import { computed, ref } from "vue";
import VIconAbc from "@/common/icons/VIconAbc.vue";
import VIconCss from "@/common/icons/VIconCss.vue";
import VIconHtml from "@/common/icons/VIconHtml.vue";
import VIconPhp from "@/common/icons/VIconPhp.vue";

// dropdowns and menus

const inputId = "input";
const input = useInput<string>(inputId, "");

const { setModalProps } = useModalStore();

function openModal() {
  setModalProps("Amazing!", "This menu can do everything!");
}

// simple selections

const options: SelectionOption<string>[] = [
  {
    value: "first",
    key: "first",
    label: "first",
  },
  {
    value: "second",
    key: "second",
    label: "second",
  },
];

const simpleSelection1 = ref<SelectionOption<string>>(options[0]);
const simpleSelection2 = ref<SelectionOption<string>>(options[0]);
const simpleSelection3 = ref<SelectionOption<string>>(options[0]);

// selection with icons

const languageSelectionOptions = ref<SelectionOption<string>[]>([
  {
    value: "ABC",
    label: "ABC",
    key: "ABC",
    icon: VIconAbc,
  },
  {
    value: "CSS",
    label: "CSS",
    key: "CSS",
    icon: VIconCss,
  },
  { value: "HTML", label: "HTML", key: "HTML", icon: VIconHtml },
  { value: "PHP", label: "PHP", key: "PHP", icon: VIconPhp },
]);
const selectedLanguageOption = ref<SelectionOption<string>>(
  languageSelectionOptions.value[0],
);

// input selection

const words = ref<string[]>([
  "Arsenal",
  "Argument",
  "Arrival",
  "Artist",
  "Article",
  "Arrange",
  "Arrest",
  "Area",
  "Arithmetic",
  "Army",
]);
const wordsOptions = computed<SelectionOption<string>[]>(() =>
  words.value.map((word) => ({
    value: word,
    key: word,
    label: word,
  })),
);

const selectedWordOption = ref<SelectionOption<string>>(wordsOptions.value[0]);

const selectedWordInputState = useInput<string>(
  "select-input",
  wordsOptions.value[0].label,
);

const filteredWordsOptions = computed(() => {
  return wordsOptions.value.filter((wordOption) =>
    wordOption.value.includes(selectedWordInputState.value.inputValue.trim()),
  );
});

function updateInputState(option: SelectionOption<string>) {
  selectedWordInputState.value.inputValue = option.value;
}

// multiple selection

const fruits = ref<string[]>([
  "Mango",
  "Pineapple",
  "Dragonfruit",
  "Kiwi",
  "Papaya",
]);
const fruitOptions = computed(() => {
  return fruits.value.map((fruit) => ({
    value: fruit,
    key: fruit,
    label: fruit,
  }));
});
const selectedMultiple = ref<Array<SelectionOption<string>>>([]);
</script>

<style scoped lang="scss">
.row-of-things {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  max-width: 768px;
  margin: 0 auto;
}

section > div {
  margin: var(--space-5) 0;
}
</style>
