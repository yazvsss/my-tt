<template>
  <div class="header-bar">
    <div class="header-row">
      <div class="header-cell header-date">
        <span class="cell-icon">▦</span>
        <span class="cell-label">日期</span>
        <span class="cell-value">{{ store.data.世界.日期 }}</span>
      </div>

      <div class="header-cell header-weekday">
        <span class="cell-icon">▣</span>
        <span class="cell-label">星期</span>
        <span class="cell-value">{{ store.data.世界.星期 }}</span>
      </div>
    </div>

    <div class="header-row">
      <div class="header-cell header-time">
        <span class="cell-icon">◐</span>
        <span class="cell-label">时间</span>
        <span class="cell-value">{{ store.data.世界.当前时间 }}</span>
      </div>

      <div class="header-cell header-location">
        <span class="cell-icon">◈</span>
        <span class="cell-label">地点</span>
        <span class="cell-value">{{ store.data.世界.地点 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--c-surface-raised) 0%, var(--c-surface) 100%);
  border-bottom: 2px solid var(--c-border);
  flex-shrink: 0;
}

.header-row {
  display: flex;
  flex: 1;
}

.header-row:first-child {
  border-bottom: 1px solid var(--c-border);
}

.header-cell {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 10px;
  border-right: 1px solid var(--c-border);
  font-size: 0.82rem;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
}

.header-cell:last-child {
  border-right: none;
}

.cell-icon {
  color: var(--c-accent);
  font-size: 0.9rem;
  flex-shrink: 0;
}

.cell-label {
  color: var(--c-text-dim);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  flex-shrink: 0;
}

.cell-value {
  color: var(--c-text);
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

@media (max-width: 600px) {
  .header-row {
    flex-direction: column;
  }

  .header-cell {
    border-right: none;
    border-bottom: 1px solid var(--c-border);
  }

  .header-cell:last-child {
    border-bottom: none;
  }
}
</style>
