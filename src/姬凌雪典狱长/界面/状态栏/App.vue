<template>
  <div class="prison-status">
    <!-- 铁栏装饰条 -->
    <div class="bars-decor"></div>

    <!-- 第一栏位：顶部信息栏（固定显示） -->
    <HeaderBar />

    <!-- 第二、三栏位：可折叠分视窗 -->
    <div class="panels-container">
      <CollapsibleSection
        v-model="char_open"
        title="姬凌雪状态"
        icon="⛓"
        accent="accent"
      >
        <CharacterPanel />
      </CollapsibleSection>

      <CollapsibleSection
        v-model="prison_open"
        title="监狱管控"
        icon="▣"
        accent="danger"
      >
        <PrisonPanel />
      </CollapsibleSection>
    </div>

    <!-- 底部铁栏装饰 -->
    <div class="bars-decor bars-bottom"></div>
  </div>
</template>

<script setup lang="ts">
import CharacterPanel from './components/CharacterPanel.vue';
import CollapsibleSection from './components/CollapsibleSection.vue';
import HeaderBar from './components/HeaderBar.vue';
import PrisonPanel from './components/PrisonPanel.vue';

const char_open = useLocalStorage<boolean>('status_bar:char_open', true);
const prison_open = useLocalStorage<boolean>('status_bar:prison_open', true);
</script>

<style lang="scss" scoped>
.prison-status {
  width: 100%;
  max-width: 720px;
  background-color: var(--c-bg);
  border: 2px solid var(--c-border);
  display: flex;
  flex-direction: column;
  font-family: var(--font-prison);
  color: var(--c-text);
  font-size: 13px;
  line-height: 1.4;
  margin: 0 auto;
  box-shadow:
    0 0 0 1px var(--c-border-strong) inset,
    0 4px 20px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: hidden;
}

/* 铁栏装饰条 */
.bars-decor {
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    var(--c-border) 0px,
    var(--c-border) 3px,
    var(--c-bg) 3px,
    var(--c-bg) 8px
  );
  flex-shrink: 0;
}

.bars-bottom {
  border-top: 1px solid var(--c-border);
}

.panels-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}
</style>
