<template>
  <div class="char-panel">
    <!-- 当前行动 -->
    <div class="field-block field-action">
      <div class="field-label">
        <span class="label-icon">▶</span>
        <span>当前行动</span>
      </div>
      <div class="field-content">{{ store.data.姬凌雪.当前行动 }}</div>
    </div>

    <!-- 内心想法 -->
    <div class="field-block field-thought">
      <div class="field-label">
        <span class="label-icon">♡</span>
        <span>内心想法</span>
      </div>
      <div class="field-content field-thought-content">"{{ store.data.姬凌雪.内心想法 }}"</div>
    </div>

    <!-- 欲望值进度条 -->
    <div class="field-block field-desire">
      <div class="field-label">
        <span class="label-icon">🔥</span>
        <span>欲望值</span>
        <span class="value-badge" :style="{ color: desireColor }">{{ store.data.姬凌雪.欲望值 }}%</span>
      </div>
      <div class="desire-bar">
        <div
          class="desire-fill"
          :style="{ width: store.data.姬凌雪.欲望值 + '%', background: desireGradient }"
        ></div>
        <div class="desire-marker desire-marker-25"></div>
        <div class="desire-marker desire-marker-50"></div>
        <div class="desire-marker desire-marker-75"></div>
      </div>
      <div class="desire-status" :style="{ color: desireColor }">{{ desireStatus }}</div>
    </div>

    <!-- 穿着 -->
    <div class="field-block field-attire">
      <div class="field-label">
        <span class="label-icon">👗</span>
        <span>穿着</span>
      </div>
      <div class="field-content">{{ store.data.姬凌雪.穿着 }}</div>
    </div>

    <!-- 身体状态网格 -->
    <div class="body-grid">
      <div class="body-cell">
        <div class="body-cell-label"><span>口腔</span></div>
        <div class="body-cell-content">{{ store.data.姬凌雪.口腔 }}</div>
      </div>
      <div class="body-cell">
        <div class="body-cell-label"><span>胸部</span></div>
        <div class="body-cell-content">{{ store.data.姬凌雪.胸部 }}</div>
      </div>
      <div class="body-cell">
        <div class="body-cell-label"><span>小穴</span></div>
        <div class="body-cell-content">{{ store.data.姬凌雪.小穴 }}</div>
      </div>
      <div class="body-cell">
        <div class="body-cell-label"><span>后庭</span></div>
        <div class="body-cell-content">{{ store.data.姬凌雪.后庭 }}</div>
      </div>
      <div class="body-cell body-cell-wide">
        <div class="body-cell-label">
          <span>子宫精液量</span>
          <span class="semen-value">{{ store.data.姬凌雪.子宫精液量 }}ml</span>
        </div>
        <div class="semen-bar">
          <div
            class="semen-fill"
            :style="{ width: store.data.姬凌雪.子宫精液量 + '%' }"
          ></div>
          <div class="semen-tick semen-tick-25"></div>
          <div class="semen-tick semen-tick-50"></div>
          <div class="semen-tick semen-tick-75"></div>
          <span class="semen-tick-label semen-tick-label-0">0</span>
          <span class="semen-tick-label semen-tick-label-25">25</span>
          <span class="semen-tick-label semen-tick-label-50">50</span>
          <span class="semen-tick-label semen-tick-label-75">75</span>
          <span class="semen-tick-label semen-tick-label-100">100ml</span>
        </div>
      </div>
      <div class="body-cell body-cell-wide">
        <div class="body-cell-label">
          <span>是否怀孕</span>
        </div>
        <div class="body-cell-content">
          <span
            class="pregnancy-tag"
            :class="{ 'pregnancy-yes': isPregnant }"
          >{{ store.data.姬凌雪.是否怀孕 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const desireColor = computed(() => {
  const v = store.data.姬凌雪.欲望值;
  if (v >= 80) return 'var(--c-danger)';
  if (v >= 60) return 'var(--c-warning)';
  if (v >= 40) return 'var(--c-accent)';
  if (v >= 20) return '#6b8a7a';
  return 'var(--c-text-dim)';
});

const desireGradient = computed(() => {
  const v = store.data.姬凌雪.欲望值;
  if (v >= 80) return 'linear-gradient(90deg, var(--c-warning), var(--c-danger))';
  if (v >= 60) return 'linear-gradient(90deg, var(--c-accent), var(--c-warning))';
  if (v >= 40) return 'linear-gradient(90deg, #6b8a7a, var(--c-accent))';
  if (v >= 20) return 'linear-gradient(90deg, var(--c-text-dim), #6b8a7a)';
  return 'var(--c-text-dim)';
});

const desireStatus = computed(() => {
  const v = store.data.姬凌雪.欲望值;
  if (v >= 80) return '欲火难耐';
  if (v >= 60) return '渴望释放';
  if (v >= 40) return '隐秘兴奋';
  if (v >= 20) return '微有波澜';
  return '冷淡压抑';
});

const isPregnant = computed(() => {
  const v = store.data.姬凌雪.是否怀孕;
  return v && v !== '否' && !v.includes('无');
});
</script>

<style lang="scss" scoped>
.char-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-block {
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-left: 3px solid var(--c-accent);
  padding: 7px 9px;
}

.field-thought {
  border-left-color: #6b4a7a;
}

.field-desire {
  border-left-color: var(--c-danger);
}

.field-attire {
  border-left-color: #4a6a8a;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.label-icon {
  font-size: 0.82rem;
}

.value-badge {
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: none;
  letter-spacing: 0;
}

.field-content {
  font-size: 0.82rem;
  color: var(--c-text);
  line-height: 1.45;
}

.field-thought-content {
  font-style: italic;
  color: #c4b8d4;
}

/* 欲望值进度条 */
.desire-bar {
  position: relative;
  height: 12px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  overflow: hidden;
  margin-bottom: 3px;
}

.desire-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  transition: width 0.3s ease, background 0.3s ease;
  box-shadow: 0 0 6px rgba(200, 134, 42, 0.3);
}

.desire-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--c-border);
  opacity: 0.5;
}

.desire-marker-25 { left: 25%; }
.desire-marker-50 { left: 50%; }
.desire-marker-75 { left: 75%; }

.desire-status {
  font-size: 0.72rem;
  text-align: right;
  font-weight: bold;
}

/* 身体状态网格 */
.body-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.body-cell {
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  padding: 6px 8px;
}

.body-cell-wide {
  grid-column: 1 / -1;
}

.body-cell-label {
  font-size: 0.72rem;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.body-cell-label::before {
  content: '◆';
  color: var(--c-accent);
  font-size: 0.6rem;
}

.body-cell-content {
  font-size: 0.78rem;
  color: var(--c-text);
  line-height: 1.4;
}

.pregnancy-tag {
  display: inline-block;
  padding: 1px 6px;
  border: 1px solid var(--c-border);
  font-size: 0.75rem;
  color: var(--c-text-muted);
}

.pregnancy-tag.pregnancy-yes {
  color: var(--c-danger);
  border-color: var(--c-danger);
  background: rgba(184, 52, 58, 0.1);
  font-weight: bold;
}

/* 子宫精液量动态条 */
.semen-value {
  margin-left: auto;
  font-size: 0.78rem;
  font-weight: bold;
  color: #e8e0d0;
  text-transform: none;
  letter-spacing: 0;
}

.semen-bar {
  position: relative;
  height: 14px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  overflow: hidden;
  margin-top: 2px;
}

.semen-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(180deg, #f5f0e8 0%, #e8dfd0 50%, #ddd4c4 100%);
  transition: width 0.3s ease;
  box-shadow: 0 0 4px rgba(245, 240, 232, 0.3);
}

.semen-tick {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--c-border);
  opacity: 0.4;
}

.semen-tick-25 { left: 25%; }
.semen-tick-50 { left: 50%; }
.semen-tick-75 { left: 75%; }

.semen-tick-label {
  position: absolute;
  bottom: -1px;
  font-size: 0.55rem;
  color: var(--c-text-dim);
  line-height: 1;
  transform: translateX(-50%);
}

.semen-tick-label-0 { left: 2%; transform: translateX(0); }
.semen-tick-label-25 { left: 25%; }
.semen-tick-label-50 { left: 50%; }
.semen-tick-label-75 { left: 75%; }
.semen-tick-label-100 { left: 98%; transform: translateX(-100%); }

@media (max-width: 600px) {
  .body-grid {
    grid-template-columns: 1fr;
  }
}
</style>
