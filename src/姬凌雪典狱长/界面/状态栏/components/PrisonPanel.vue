<template>
  <div class="prison-panel">
    <!-- 监狱稳定度 & 上级压力度 -->
    <div class="metric-row">
      <div class="metric-block">
        <div class="metric-header">
          <span class="metric-icon">💥</span>
          <span class="metric-name">监狱稳定度</span>
          <span class="metric-value" :style="{ color: stabilityColor }">{{ store.data.监狱.监狱稳定度 }}%</span>
        </div>
        <div class="metric-bar">
          <div
            class="metric-fill"
            :style="{ width: store.data.监狱.监狱稳定度 + '%', background: stabilityGradient }"
          ></div>
        </div>
        <div class="metric-status" :style="{ color: stabilityColor }">{{ stabilityStatus }}</div>
      </div>

      <div class="metric-block">
        <div class="metric-header">
          <span class="metric-icon">⚡</span>
          <span class="metric-name">上级压力度</span>
          <span class="metric-value" :style="{ color: pressureColor }">{{ store.data.监狱.上级压力度 }}%</span>
        </div>
        <div class="metric-bar">
          <div
            class="metric-fill"
            :style="{ width: store.data.监狱.上级压力度 + '%', background: pressureGradient }"
          ></div>
        </div>
        <div class="metric-status" :style="{ color: pressureColor }">{{ pressureStatus }}</div>
      </div>
    </div>

    <!-- 帮派忠诚度 -->
    <div class="faction-section">
      <div class="faction-title">
        <span class="faction-title-icon">⚔</span>
        <span>帮派忠诚度</span>
      </div>
      <div class="faction-list">
        <div
          v-for="faction in factions"
          :key="faction.key"
          class="faction-row"
        >
          <div class="faction-info">
            <span class="faction-dot" :style="{ background: faction.color }"></span>
            <span class="faction-name">{{ faction.name }}</span>
            <span class="faction-territory">{{ faction.territory }}</span>
          </div>
          <div class="faction-bar-wrapper">
            <div class="faction-bar">
              <div
                class="faction-bar-fill"
                :style="{
                  width: factionLoyalty(faction.key) + '%',
                  background: faction.color,
                }"
              ></div>
            </div>
            <span class="faction-value" :style="{ color: faction.color }">{{ factionLoyalty(faction.key) }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 黑石卡持有者 -->
    <div class="card-block">
      <div class="card-label">
        <span class="card-icon">🔑</span>
        <span>黑石卡持有者</span>
      </div>
      <div class="card-holder" :class="{ 'card-empty': !hasCardHolder }">
        <span v-if="hasCardHolder" class="holder-name">{{ store.data.黑石卡.持有者 }}</span>
        <span v-else class="holder-empty">— 无 —</span>
      </div>
      <div v-if="hasCardHolder" class="card-hint">持卡人可随时前往典狱长办公室兑现要求</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const factions = [
  { key: '黑虎会忠诚度', name: '黑虎会', territory: 'A区东翼', color: 'var(--c-faction-tiger)' },
  { key: '北极帮忠诚度', name: '北极帮', territory: 'A区西翼', color: 'var(--c-faction-polar)' },
  { key: '南十字忠诚度', name: '南十字', territory: 'B区东翼', color: 'var(--c-faction-cross)' },
  { key: '铁锤帮忠诚度', name: '铁锤帮', territory: 'B区西翼', color: 'var(--c-faction-hammer)' },
  { key: '雅利安兄弟会忠诚度', name: '雅利安兄弟会', territory: 'C区', color: 'var(--c-faction-aryan)' },
] as const;

function factionLoyalty(key: string): number {
  return store.data.帮派[key as keyof typeof store.data.帮派];
}

const hasCardHolder = computed(() => {
  const v = store.data.黑石卡.持有者;
  return v && v !== '无' && v !== '暂无' && !v.includes('无');
});

// 监狱稳定度颜色与状态
const stabilityColor = computed(() => {
  const v = store.data.监狱.监狱稳定度;
  if (v < 30) return 'var(--c-extreme)';
  if (v < 50) return 'var(--c-danger)';
  if (v < 70) return 'var(--c-warning)';
  if (v < 90) return 'var(--c-safe)';
  return '#5a9a6a';
});

const stabilityGradient = computed(() => {
  const v = store.data.监狱.监狱稳定度;
  if (v < 30) return 'linear-gradient(90deg, var(--c-danger), var(--c-extreme))';
  if (v < 50) return 'linear-gradient(90deg, var(--c-warning), var(--c-danger))';
  if (v < 70) return 'linear-gradient(90deg, var(--c-accent), var(--c-warning))';
  if (v < 90) return 'linear-gradient(90deg, #5a8a6a, var(--c-safe))';
  return 'linear-gradient(90deg, var(--c-safe), #5a9a6a)';
});

const stabilityStatus = computed(() => {
  const v = store.data.监狱.监狱稳定度;
  if (v < 30) return '暴动边缘';
  if (v < 50) return '动荡不安';
  if (v < 70) return '紧张平衡';
  if (v < 90) return '稳定可控';
  return '铁腕太平';
});

// 上级压力度颜色与状态
const pressureColor = computed(() => {
  const v = store.data.监狱.上级压力度;
  if (v >= 70) return 'var(--c-extreme)';
  if (v >= 50) return 'var(--c-danger)';
  if (v >= 30) return 'var(--c-warning)';
  return 'var(--c-safe)';
});

const pressureGradient = computed(() => {
  const v = store.data.监狱.上级压力度;
  if (v >= 70) return 'linear-gradient(90deg, var(--c-danger), var(--c-extreme))';
  if (v >= 50) return 'linear-gradient(90deg, var(--c-warning), var(--c-danger))';
  if (v >= 30) return 'linear-gradient(90deg, var(--c-accent), var(--c-warning))';
  return 'linear-gradient(90deg, #4a7a5a, var(--c-safe))';
});

const pressureStatus = computed(() => {
  const v = store.data.监狱.上级压力度;
  if (v >= 70) return '高压危险';
  if (v >= 50) return '需要警惕';
  if (v >= 30) return '常规监控';
  return '安全区间';
});
</script>

<style lang="scss" scoped>
.prison-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 指标行 */
.metric-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.metric-block {
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  padding: 7px 9px;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}

.metric-icon {
  font-size: 0.82rem;
}

.metric-name {
  font-size: 0.75rem;
  color: var(--c-text-muted);
  letter-spacing: 0.5px;
}

.metric-value {
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: bold;
}

.metric-bar {
  height: 10px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  overflow: hidden;
  margin-bottom: 3px;
}

.metric-fill {
  height: 100%;
  transition: width 0.3s ease, background 0.3s ease;
}

.metric-status {
  font-size: 0.72rem;
  font-weight: bold;
  text-align: right;
}

/* 帮派忠诚度 */
.faction-section {
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  padding: 8px 9px;
}

.faction-title {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--c-border);
}

.faction-title-icon {
  color: var(--c-danger);
}

.faction-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.faction-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.faction-info {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  width: 140px;
}

.faction-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 4px currentColor;
}

.faction-name {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--c-text);
  white-space: nowrap;
}

.faction-territory {
  font-size: 0.65rem;
  color: var(--c-text-dim);
}

.faction-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.faction-bar {
  flex: 1;
  height: 8px;
  background: var(--c-surface-raised);
  border: 1px solid var(--c-border);
  overflow: hidden;
  min-width: 0;
}

.faction-bar-fill {
  height: 100%;
  transition: width 0.3s ease;
  box-shadow: 0 0 4px currentColor;
}

.faction-value {
  font-size: 0.75rem;
  font-weight: bold;
  min-width: 32px;
  text-align: right;
}

/* 黑石卡 */
.card-block {
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-left: 3px solid var(--c-accent);
  padding: 7px 9px;
}

.card-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.card-icon {
  font-size: 0.85rem;
}

.card-holder {
  font-size: 0.88rem;
  padding: 4px 8px;
  background: var(--c-surface-raised);
  border: 1px solid var(--c-border);
}

.holder-name {
  color: var(--c-accent);
  font-weight: bold;
}

.holder-empty {
  color: var(--c-text-dim);
  font-style: italic;
}

.card-empty {
  border-style: dashed;
}

.card-hint {
  font-size: 0.68rem;
  color: var(--c-text-dim);
  margin-top: 3px;
}

@media (max-width: 600px) {
  .metric-row {
    grid-template-columns: 1fr;
  }

  .faction-info {
    width: 110px;
  }

  .faction-territory {
    display: none;
  }
}
</style>
