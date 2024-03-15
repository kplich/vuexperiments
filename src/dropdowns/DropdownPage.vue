<template>
  <section>
    <h2>Dropdowns, menus and selections!</h2>
    <div class="buttons">
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
</template>

<script setup lang="ts">
import VButton from "@/common/VButton.vue";
import VMenu from "@/dropdowns/VMenu.vue";
import MyTextInput from "@/inputs/MyTextInput.vue";
import { useInput } from "@/inputs/InputUtils";
import VMenuItem from "@/dropdowns/VMenuItem.vue";
import VDropdown from "@/dropdowns/VDropdown.vue";
import VCard from "@/common/VCard.vue";
import { useModalStore } from "@/modals/store";

const inputId = "input";
const input = useInput<string>(inputId, "");

const { setModalProps } = useModalStore();

function openModal() {
  setModalProps("Amazing!", "This menu can do everything!");
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  flex-flow: row wrap;
  gap: var(--space-5);
}
</style>
