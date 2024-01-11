<template>
  <div>
    <h1>Drag and drop</h1>
    <span>Look into the console for more info!</span>
    <div
      draggable="true"
      class="drag-element"
      @drag="drag"
      @dragstart="dragstart"
      @dragend="dragend"
    >
      <h2>Drag me!</h2>
      <div>
        <label for="drag-data"> Drag data</label>
        <input
          @dragenter.prevent.stop
          @dragover.prevent.stop
          @drop.prevent.stop
          id="drag-data"
          type="text"
          v-model="dragData"
        />
      </div>
      <div>
        <label for="drag-feedback-image-type">Drag feedback image type</label>
        <select v-model="dragFeedbackImageType" id="drag-feedback-image-type">
          <option value="standard" selected>Usual feedback image</option>
          <option value="custom-image">Custom image</option>
          <option value="other-element">Other element</option>
        </select>
      </div>
      <fieldset>
        <legend>Allowed effects:</legend>

        <input type="checkbox" id="copy" v-model="copyDragEffectAllowed" />
        <label for="copy">Copy</label>

        <input type="checkbox" id="move" v-model="moveDragEffectAllowed" />
        <label for="move">Move</label>

        <input type="checkbox" id="link" v-model="linkDragEffectAllowed" />
        <label for="link">Link</label>
      </fieldset>
    </div>
    <div
      class="drag-element"
      @dragenter="dragenter"
      @dragleave="dragleave"
      @dragover="dragover"
    >
      {{
        intermediateDragElementEntered
          ? "You can't drop it here!"
          : "Hover on me while dragging!"
      }}
    </div>
    <div
      class="drag-element"
      @dragenter.prevent="finalDragEnter"
      @dragover.prevent="finalDragOver"
      @dragleave.prevent.stop="finalDragElementEntered = false"
      @drop.prevent="drop"
      :class="{ 'drag-entered': finalDragElementEntered }"
    >
      <h2>{{ finalDragElementEntered ? "Yes, here!" : "Drop me here!" }}</h2>
      <div>Drop effect: {{ dropEffect }}</div>
    </div>
    <div>
      <h3>Target data:</h3>
      <span>{{ targetData }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

type DragFeedbackImageType = "standard" | "custom-image" | "other-element";
const dragFeedbackImageType = ref<DragFeedbackImageType>("standard");
const dragData = ref<string>("");

const copyDragEffectAllowed = ref<boolean>(false);
const moveDragEffectAllowed = ref<boolean>(false);
const linkDragEffectAllowed = ref<boolean>(false);

const allowedDragEffect = computed(() => {
  if (
    !copyDragEffectAllowed.value &&
    !moveDragEffectAllowed.value &&
    !linkDragEffectAllowed.value
  ) {
    return "none";
  } else if (
    !copyDragEffectAllowed.value &&
    !moveDragEffectAllowed.value &&
    linkDragEffectAllowed.value
  ) {
    return "link";
  } else if (
    !copyDragEffectAllowed.value &&
    moveDragEffectAllowed.value &&
    !linkDragEffectAllowed.value
  ) {
    return "move";
  } else if (
    !copyDragEffectAllowed.value &&
    moveDragEffectAllowed.value &&
    linkDragEffectAllowed.value
  ) {
    return "linkMove";
  } else if (
    copyDragEffectAllowed.value &&
    !moveDragEffectAllowed.value &&
    !linkDragEffectAllowed.value
  ) {
    return "copy";
  } else if (
    copyDragEffectAllowed.value &&
    !moveDragEffectAllowed.value &&
    linkDragEffectAllowed.value
  ) {
    return "copyLink";
  } else if (
    copyDragEffectAllowed.value &&
    moveDragEffectAllowed.value &&
    !linkDragEffectAllowed.value
  ) {
    return "copyMove";
  } else if (
    copyDragEffectAllowed.value &&
    moveDragEffectAllowed.value &&
    linkDragEffectAllowed.value
  ) {
    return "all";
  }
  return "uninitialized";
});

const intermediateDragElementEntered = ref<boolean>(false);
const finalDragElementEntered = ref<boolean>(false);

type DropEffectType = "copy" | "link" | "move" | "none";
const dropEffect = ref<DropEffectType | undefined>(undefined);
const targetData = ref<string>("");

function dragstart(event: DragEvent) {
  console.log(event);

  if (dragFeedbackImageType.value === "custom-image") {
    const img = new Image();
    img.src = "https://i.iplsc.com/andrzej-duda/000A20DDGMS49WR7-C122-F4.jpg";
    event.dataTransfer?.setDragImage(img, 0, 0);
  } else if (dragFeedbackImageType.value === "other-element") {
    const header = document.getElementById("header");
    if (header) {
      event.dataTransfer?.setDragImage(header, 0, 0);
    }
  }

  event.dataTransfer?.setData("text/plain", dragData.value);

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = allowedDragEffect.value;
  }
}

function drag(event: DragEvent) {
  //console.log("drag event with interesting data");
}

function dragend(event: DragEvent) {
  console.log(event);
  dropEffect.value = undefined;
}

function dragenter(event: DragEvent) {
  console.log(event);
  intermediateDragElementEntered.value = true;
}

function finalDragEnter(event: DragEvent) {
  finalDragElementEntered.value = true;
}

function finalDragOver(event: DragEvent) {
  dropEffect.value = event.dataTransfer?.dropEffect;
}

function dragover() {
  console.log("drag/dragover event with interesting data");
}

function dragleave(event: DragEvent) {
  console.log(event);
  intermediateDragElementEntered.value = false;
}

function drop(event: DragEvent) {
  console.log(event);
  finalDragElementEntered.value = false;
  dropEffect.value = undefined;

  const data = event.dataTransfer?.getData("text/plain") ?? "";
  if (event.dataTransfer?.dropEffect === "copy") {
    targetData.value = data;
  } else if (event.dataTransfer?.dropEffect === "move") {
    targetData.value = data;
    dragData.value = "";
  } else if (event.dataTransfer?.dropEffect === "link") {
    targetData.value = "link!";
  }
}
</script>
<style scoped lang="scss">
.drag-element {
  text-align: center;
  padding: 50px;
  margin: 50px 0;
  border: 1px grey dashed;
  border-radius: 20px;
}

.drag-entered {
  background-color: gray;

  & * {
    pointer-events: none;
  }
}

input {
  margin: 0 5px;
}

label {
  margin-right: 10px;
}
</style>
