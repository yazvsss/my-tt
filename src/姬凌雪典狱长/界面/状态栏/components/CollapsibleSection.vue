<template>
  <div class="collapsible" :class="{ 'is-open': model }">
    <button class="section-header" type="button" @click="toggle">
      <div class="header-left">
        <span class="section-icon" :style="{ color: accentColor }">{{ icon }}</span>
        <span class="section-title">{{ title }}</span>
      </div>
      <div class="header-right">
        <span class="toggle-indicator" :style="{ color: accentColor }">{{ model ? '▼' : '▶' }}</span>
      </div>
    </button>

    <div class="section-body-wrapper" :style="bodyStyle">
      <div ref="body_ref" class="section-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    icon?: string;
    accent?: 'accent' | 'danger' | 'warning' | 'safe';
  }>(),
  { icon: '◆', accent: 'accent' },
);

const model = defineModel<boolean>({ required: true });

const body_ref = ref<HTMLElement | null>(null);
const body_height = ref(0);

const accentColor = computed(() => {
  const map = {
    accent: 'var(--c-accent)',
    danger: 'var(--c-danger)',
    warning: 'var(--c-warning)',
    safe: 'var(--c-safe)',
  };
  return map[props.accent];
});

const bodyStyle = computed(() => ({
  maxHeight: model.value ? `${body_height.value}px` : '0px',
  opacity: model.value ? '1' : '0',
}));

function updateHeight() {
  if (body_ref.value) {
    body_height.value = body_ref.value.scrollHeight;
  }
}

function toggle() {
  model.value = !model.value;
  if (model.value) {
    nextTick(() => updateHeight());
  }
}

onMounted(() => {
  nextTick(() => updateHeight());
});

watch(
  () => model.value,
  (open) => {
    if (open) {
      nextTick(() => updateHeight());
    }
  },
);

const ro = ref<ResizeObserver | null>(null);
onMounted(() => {
  if (body_ref.value) {
    ro.value = new ResizeObserver(() => {
      if (model.value) {
        updateHeight();
      }
    });
    ro.value.observe(body_ref.value);
  }
});

onBeforeUnmount(() => {
  ro.value?.disconnect();
});
</script>

<style lang="scss" scoped>
.collapsible {
  border-bottom: 1px solid var(--c-border);
}

.collapsible:last-child {
  border-bottom: none;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 9px 12px;
  background: linear-gradient(180deg, var(--c-surface-raised) 0%, var(--c-surface) 100%);
  border: none;
  border-bottom: 1px solid var(--c-border);
  cursor: pointer;
  font-family: var(--font-prison);
  font-size: 0.88rem;
  font-weight: bold;
  color: var(--c-text);
  transition: background 0.2s;
  user-select: none;
}

.section-header:hover {
  background: linear-gradient(180deg, #2a2f38 0%, var(--c-surface-raised) 100%);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 7px;
}

.section-icon {
  font-size: 1rem;
  text-shadow: 0 0 8px currentColor;
}

.section-title {
  letter-spacing: 1px;
}

.toggle-indicator {
  font-size: 0.72rem;
  transition: transform 0.3s ease;
}

.section-body-wrapper {
  overflow: hidden;
  transition:
    max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease;
  background-color: var(--c-surface);
}

.section-body {
  padding: 10px 12px;
}

.is-open .section-header {
  border-bottom: 1px solid var(--c-border);
}
</style>
