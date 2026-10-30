
<script setup lang="ts">
import Decimal from 'break_eternity.js'
import { ref, watch } from 'vue'

defineOptions({ name: 'PlayerEditorNode' })

const props = defineProps<{
  label: string
  value: any
}>()

const emit = defineEmits(['update:value'])

function isDecimal(value: any): boolean {
  return value !== null &&
    typeof value === 'object' &&
    'mag' in value &&
    'layer' in value &&
    'sign' in value
}

function isEditableObject(value: any) {
  return value !== null &&
    typeof value === 'object' &&
    !isDecimal(value)
}

const draft = ref('')

watch(
  () => props.value,
  () => {
    // Don't overwrite what you're typing.
  }
)

function editValue() {
  const input = draft.value.trim()
  if (!input) return

  if (isDecimal(props.value)) {
    emit('update:value', new Decimal(input))
  } else if (typeof props.value === 'number') {
    const number = Number(input)
    if (Number.isFinite(number)) {
      emit('update:value', number)
    }
  } else if (typeof props.value === 'string') {
    emit('update:value', input)
  }

  draft.value = ''
}

function updateChild(key: string | number, newValue: any) {
  props.value[key] = newValue
}
</script>



<template>
  <details v-if="isEditableObject(value)" class="node">
    <summary>{{ label }}</summary>

    <div class="children">
      <template v-for="(child, key) in value" :key="key">
        <PlayerEditorNode
          v-if="typeof child !== 'function'"
          :label="String(key)"
          :value="child"
          @update:value="updateChild(key, $event)"
        />
      </template>
    </div>
  </details>

  <div v-else class="field">
    <label>{{ label }}</label>

    <div class="value-editor">
      <div class="current-value">
        <span class="value-label">CURRENT VALUE</span>
        <span class="value-text">{{ String(value) }}</span>
      </div>

      <div
        v-if="typeof value === 'boolean'"
        class="boolean-editor"
      >
        <button @click="emit('update:value', !value)">
          Set to {{ !value }}
        </button>
      </div>

      <form
        v-else-if="isDecimal(value) || typeof value === 'number' || typeof value === 'string'"
        class="edit-form"
        @submit.prevent="editValue"
      >
        <input
          v-model="draft"
          type="text"
          placeholder="Enter new value..."
        />

        <button type="submit">Set</button>
      </form>
    </div>
  </div>
</template>


<style scoped>

.value-editor {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 55%;
  min-width: 0;
}

.current-value {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  background: #0b1220;
  border: 1px solid #334155;
  border-radius: 6px;
  min-width: 0;
}

.value-label {
  color: #64748b;
  font-size: 10px;
  letter-spacing: 1px;
}

.value-text {
  color: #67e8f9;
  font-size: 13px;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.edit-form {
  display: flex;
  gap: 6px;
  min-width: 0;
}

.edit-form input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  padding: 8px;
  color: white;
  background: #1e293b;
  border: 1px solid #475569;
  border-radius: 5px;
  font-family: monospace;
}

.edit-form input:focus {
  outline: none;
  border-color: #22d3ee;
}

.edit-form button,
.boolean-editor button {
  padding: 7px 12px;
  color: #a5f3fc;
  background: #164e63;
  border: 1px solid #0891b2;
  border-radius: 5px;
  cursor: pointer;
  font-family: monospace;
}

.edit-form button:hover,
.boolean-editor button:hover {
  background: #0e7490;
  color: white;
}

@media (max-width: 500px) {
  .value-editor {
    width: 100%;
  }
}

</style>
