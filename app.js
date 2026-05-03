const STORAGE_KEY = "idle-town-combat-save-v1";
const STATE_VERSION = 1;
const AUTO_SAVE_MS = 15000;
const OFFLINE_REWARD_RATE = 0.8;
const LOG_LIMIT = 40;
const MAX_OFFLINE_KILLS = 5000;

const GUN_CATALOG = [
  {
    id: "basic-pistol",
    name: "기본 권총",
    family: "Starter Pistol",
    manufacturer: "Civic Arms",
    className: "권총",
    rarity: "기본 지급",
    description: "모든 모험의 출발점이 되는 표준 보급형 권총.",
    damage: 20,
    attackSpeed: 60,
    critChance: 650,
    critMultiplier: 55,
    minStage: 1,
    dropWeight: 1
  },
  {
    id: "m9-service",
    name: "M9 Service",
    family: "Beretta-style Sidearm",
    manufacturer: "Frontline Forge",
    className: "권총",
    rarity: "보급",
    description: "균형 잡힌 반동과 안정적인 명중감을 가진 군용 권총.",
    damage: 25,
    attackSpeed: 54,
    critChance: 720,
    critMultiplier: 58,
    minStage: 1,
    dropWeight: 9
  },
  {
    id: "g17-polymer",
    name: "G17 Polymer",
    family: "Striker Pistol",
    manufacturer: "Vector Defense",
    className: "권총",
    rarity: "보급",
    description: "가벼운 프레임으로 탄착이 빠르게 이어지는 현대식 권총.",
    damage: 23,
    attackSpeed: 48,
    critChance: 810,
    critMultiplier: 52,
    minStage: 1,
    dropWeight: 10
  },
  {
    id: "python-357",
    name: "Python .357",
    family: "Magnum Revolver",
    manufacturer: "High Noon Arms",
    className: "리볼버",
    rarity: "정밀",
    description: "한 발의 존재감이 강한 매그넘 리볼버.",
    damage: 44,
    attackSpeed: 78,
    critChance: 1200,
    critMultiplier: 82,
    minStage: 2,
    dropWeight: 7
  },
  {
    id: "deagle-50",
    name: "Deagle .50",
    family: "Heavy Pistol",
    manufacturer: "Desert Hammer",
    className: "권총",
    rarity: "중화기",
    description: "강렬한 반동 대신 압도적인 단발 위력을 지닌 대구경 권총.",
    damage: 58,
    attackSpeed: 84,
    critChance: 930,
    critMultiplier: 90,
    minStage: 3,
    dropWeight: 6
  },
  {
    id: "mp5k",
    name: "MP5K",
    family: "Compact SMG",
    manufacturer: "Heckler Works",
    className: "기관단총",
    rarity: "기동형",
    description: "짧은 탄막을 순식간에 퍼붓는 근거리 돌격용 SMG.",
    damage: 14,
    attackSpeed: 16,
    critChance: 520,
    critMultiplier: 34,
    minStage: 2,
    dropWeight: 11
  },
  {
    id: "ump-45",
    name: "UMP-45",
    family: "Heavy SMG",
    manufacturer: "Heckler Works",
    className: "기관단총",
    rarity: "보급",
    description: "낮은 발사 템포 대신 묵직한 탄환을 밀어 넣는 기관단총.",
    damage: 19,
    attackSpeed: 21,
    critChance: 600,
    critMultiplier: 38,
    minStage: 2,
    dropWeight: 9
  },
  {
    id: "p90",
    name: "P90",
    family: "PDW",
    manufacturer: "Boreal Systems",
    className: "기관단총",
    rarity: "고속",
    description: "짧은 주기와 넓은 탄량으로 유지 화력이 매우 뛰어난 PDW.",
    damage: 13,
    attackSpeed: 12,
    critChance: 500,
    critMultiplier: 28,
    minStage: 3,
    dropWeight: 10
  },
  {
    id: "vector-45",
    name: "Vector .45",
    family: "Rapid SMG",
    manufacturer: "Kinematics Lab",
    className: "기관단총",
    rarity: "초근접",
    description: "반동 제어 구조 덕분에 매우 짧은 간격으로 발사하는 고속 SMG.",
    damage: 16,
    attackSpeed: 10,
    critChance: 540,
    critMultiplier: 32,
    minStage: 4,
    dropWeight: 8
  },
  {
    id: "m870",
    name: "M870",
    family: "Pump Shotgun",
    manufacturer: "Reliant Tactical",
    className: "산탄총",
    rarity: "근접 제압",
    description: "묵직한 한 방으로 단일 적을 밀어붙이는 펌프액션 산탄총.",
    damage: 72,
    attackSpeed: 94,
    critChance: 1050,
    critMultiplier: 76,
    minStage: 2,
    dropWeight: 8
  },
  {
    id: "saiga-12",
    name: "Saiga-12",
    family: "Auto Shotgun",
    manufacturer: "Volkov Arsenal",
    className: "산탄총",
    rarity: "근접 제압",
    description: "반자동 기구로 연속 사격이 가능한 전술 산탄총.",
    damage: 58,
    attackSpeed: 62,
    critChance: 860,
    critMultiplier: 62,
    minStage: 4,
    dropWeight: 7
  },
  {
    id: "aa12",
    name: "AA-12",
    family: "Full Auto Shotgun",
    manufacturer: "Ward Heavy",
    className: "산탄총",
    rarity: "중화기",
    description: "짧은 시간에 압도적인 근거리 화력을 퍼붓는 자동 산탄총.",
    damage: 46,
    attackSpeed: 28,
    critChance: 740,
    critMultiplier: 48,
    minStage: 7,
    dropWeight: 5
  },
  {
    id: "m4a1",
    name: "M4A1",
    family: "Carbine",
    manufacturer: "Frontline Forge",
    className: "돌격소총",
    rarity: "표준",
    description: "모든 교전 거리에서 안정적인 성능을 내는 표준 카빈.",
    damage: 24,
    attackSpeed: 24,
    critChance: 700,
    critMultiplier: 42,
    minStage: 2,
    dropWeight: 11
  },
  {
    id: "ak-47",
    name: "AK-47",
    family: "Battle Carbine",
    manufacturer: "Volkov Arsenal",
    className: "돌격소총",
    rarity: "표준",
    description: "높은 단발 위력과 단순한 구조로 오래 버티는 대표적 소총.",
    damage: 30,
    attackSpeed: 27,
    critChance: 760,
    critMultiplier: 50,
    minStage: 3,
    dropWeight: 10
  },
  {
    id: "famas-f1",
    name: "FAMAS F1",
    family: "Bullpup Rifle",
    manufacturer: "Arc de Fer",
    className: "돌격소총",
    rarity: "고속",
    description: "빠른 발사 템포와 깔끔한 반동 패턴을 노린 불펍 소총.",
    damage: 22,
    attackSpeed: 18,
    critChance: 720,
    critMultiplier: 37,
    minStage: 4,
    dropWeight: 8
  },
  {
    id: "scar-l",
    name: "SCAR-L",
    family: "Modular Rifle",
    manufacturer: "Boreal Systems",
    className: "돌격소총",
    rarity: "정예",
    description: "정밀한 사격을 길게 유지하기 좋은 모듈형 전투 소총.",
    damage: 29,
    attackSpeed: 23,
    critChance: 900,
    critMultiplier: 55,
    minStage: 5,
    dropWeight: 7
  },
  {
    id: "g3a3",
    name: "G3A3",
    family: "Battle Rifle",
    manufacturer: "Heckler Works",
    className: "전투소총",
    rarity: "관통형",
    description: "느린 템포지만 강한 탄환으로 적 체력을 단숨에 깎는 소총.",
    damage: 42,
    attackSpeed: 40,
    critChance: 980,
    critMultiplier: 62,
    minStage: 5,
    dropWeight: 7
  },
  {
    id: "mk14-ebr",
    name: "MK14 EBR",
    family: "Enhanced Battle Rifle",
    manufacturer: "Frontline Forge",
    className: "지정사수소총",
    rarity: "정밀",
    description: "연사와 정밀 사격의 경계를 오가는 지정사수 플랫폼.",
    damage: 56,
    attackSpeed: 34,
    critChance: 1180,
    critMultiplier: 84,
    minStage: 6,
    dropWeight: 6
  },
  {
    id: "m110",
    name: "M110",
    family: "Semi-Auto DMR",
    manufacturer: "Knight Array",
    className: "지정사수소총",
    rarity: "정밀",
    description: "안정적인 반자동 화력과 높은 치명 배율을 겸비한 장거리 무기.",
    damage: 62,
    attackSpeed: 36,
    critChance: 1350,
    critMultiplier: 95,
    minStage: 8,
    dropWeight: 5
  },
  {
    id: "m249",
    name: "M249",
    family: "LMG",
    manufacturer: "Ward Heavy",
    className: "기관총",
    rarity: "지속 화력",
    description: "전장을 길게 갈아 넣는 표준 경기관총.",
    damage: 22,
    attackSpeed: 14,
    critChance: 560,
    critMultiplier: 30,
    minStage: 5,
    dropWeight: 7
  },
  {
    id: "pkp-pecheneg",
    name: "PKP Pecheneg",
    family: "LMG",
    manufacturer: "Volkov Arsenal",
    className: "기관총",
    rarity: "지속 화력",
    description: "발당 위력을 유지한 채 탄막을 유지하기 좋은 중기관총 계열 무기.",
    damage: 27,
    attackSpeed: 15,
    critChance: 640,
    critMultiplier: 36,
    minStage: 7,
    dropWeight: 6
  },
  {
    id: "r700",
    name: "R700",
    family: "Bolt-Action Rifle",
    manufacturer: "Reliant Tactical",
    className: "저격소총",
    rarity: "정밀",
    description: "매우 긴 간격 대신 강력한 치명타 기대값을 가진 볼트액션 라이플.",
    damage: 108,
    attackSpeed: 108,
    critChance: 1600,
    critMultiplier: 118,
    minStage: 6,
    dropWeight: 5
  },
  {
    id: "awm",
    name: "AWM",
    family: "Magnum Sniper",
    manufacturer: "Crown Precision",
    className: "저격소총",
    rarity: "최상급",
    description: "한 번의 발사로 흐름을 바꾸는 최상급 장거리 저격총.",
    damage: 148,
    attackSpeed: 120,
    critChance: 1850,
    critMultiplier: 140,
    minStage: 10,
    dropWeight: 3
  }
];

const GUN_BY_ID = Object.fromEntries(GUN_CATALOG.map((gun) => [gun.id, gun]));

const GUN_RARITY_TIERS = [
  {
    tier: 0,
    key: "common",
    name: "일반",
    shortLabel: "C",
    color: "#b8c6d0",
    background: "rgba(184, 198, 208, 0.14)",
    borderColor: "rgba(184, 198, 208, 0.3)",
    glow: "rgba(184, 198, 208, 0.12)",
    dropWeight: 400
  },
  {
    tier: 1,
    key: "improved",
    name: "개량",
    shortLabel: "U",
    color: "#8fe2a3",
    background: "rgba(143, 226, 163, 0.14)",
    borderColor: "rgba(143, 226, 163, 0.28)",
    glow: "rgba(143, 226, 163, 0.14)",
    dropWeight: 250
  },
  {
    tier: 2,
    key: "fine",
    name: "고급",
    shortLabel: "F",
    color: "#7fe1d8",
    background: "rgba(127, 225, 216, 0.14)",
    borderColor: "rgba(127, 225, 216, 0.3)",
    glow: "rgba(127, 225, 216, 0.14)",
    dropWeight: 150
  },
  {
    tier: 3,
    key: "rare",
    name: "희귀",
    shortLabel: "R",
    color: "#66b4ff",
    background: "rgba(102, 180, 255, 0.15)",
    borderColor: "rgba(102, 180, 255, 0.32)",
    glow: "rgba(102, 180, 255, 0.18)",
    dropWeight: 90
  },
  {
    tier: 4,
    key: "elite",
    name: "정예",
    shortLabel: "E",
    color: "#8d85ff",
    background: "rgba(141, 133, 255, 0.16)",
    borderColor: "rgba(141, 133, 255, 0.34)",
    glow: "rgba(141, 133, 255, 0.2)",
    dropWeight: 50
  },
  {
    tier: 5,
    key: "heroic",
    name: "영웅",
    shortLabel: "H",
    color: "#d179ff",
    background: "rgba(209, 121, 255, 0.16)",
    borderColor: "rgba(209, 121, 255, 0.36)",
    glow: "rgba(209, 121, 255, 0.22)",
    dropWeight: 25
  },
  {
    tier: 6,
    key: "epic",
    name: "서사",
    shortLabel: "EP",
    color: "#ff88d5",
    background: "rgba(255, 136, 213, 0.18)",
    borderColor: "rgba(255, 136, 213, 0.38)",
    glow: "rgba(255, 136, 213, 0.24)",
    dropWeight: 12
  },
  {
    tier: 7,
    key: "legendary",
    name: "전설",
    shortLabel: "L",
    color: "#ffb261",
    background: "rgba(255, 178, 97, 0.18)",
    borderColor: "rgba(255, 178, 97, 0.38)",
    glow: "rgba(255, 178, 97, 0.26)",
    dropWeight: 6
  },
  {
    tier: 8,
    key: "mythic",
    name: "신화",
    shortLabel: "M",
    color: "#ff7f95",
    background: "rgba(255, 127, 149, 0.18)",
    borderColor: "rgba(255, 127, 149, 0.4)",
    glow: "rgba(255, 127, 149, 0.28)",
    dropWeight: 2
  },
  {
    tier: 9,
    key: "transcendent",
    name: "초월",
    shortLabel: "T",
    color: "#ffe57d",
    background: "rgba(255, 229, 125, 0.2)",
    borderColor: "rgba(255, 229, 125, 0.42)",
    glow: "rgba(255, 229, 125, 0.3)",
    dropWeight: 1
  }
];

const GUN_RARITY_BY_TIER = Object.fromEntries(
  GUN_RARITY_TIERS.map((rarity) => [rarity.tier, rarity])
);

const RELIC_CATALOG = [
  {
    id: "book-of-shadows",
    name: "그림자 서고",
    category: "환생",
    description: "환생 시 획득하는 강화석을 늘려 주는 검은 기록서.",
    effectKey: "stoneGainMultiplier",
    effectValue: 0.08
  },
  {
    id: "crown-of-greed",
    name: "탐욕의 왕관",
    category: "전리품",
    description: "몬스터 전리품 획득량을 끌어올리는 금빛 왕관.",
    effectKey: "trophyGainMultiplier",
    effectValue: 0.06
  },
  {
    id: "powder-chalice",
    name: "화약 성배",
    category: "화력",
    description: "모든 총기의 기본 위력을 끌어올리는 전장의 성배.",
    effectKey: "gunDamageMultiplier",
    effectValue: 0.05
  },
  {
    id: "chronos-gear",
    name: "크로노스 기어",
    category: "속사",
    description: "사격 템포를 압축해 공격 속도를 끌어올리는 시계장치.",
    effectKey: "attackSpeedReduction",
    effectValue: 0.012
  },
  {
    id: "deadeye-monocle",
    name: "데드아이 단안경",
    category: "치명",
    description: "치명타 발생 확률을 높여 주는 사수의 단안경.",
    effectKey: "critChanceFlat",
    effectValue: 45
  },
  {
    id: "execution-rune",
    name: "집행자 룬",
    category: "치명",
    description: "치명타 위력을 강화하는 붉은 각인의 파편.",
    effectKey: "critDamageFlat",
    effectValue: 5
  },
  {
    id: "titan-plate",
    name: "타이탄 장갑판",
    category: "생존",
    description: "최대 HP를 높여 주는 거대 장갑의 심재.",
    effectKey: "hpMultiplier",
    effectValue: 0.06
  },
  {
    id: "treasure-beacon",
    name: "보물 봉화",
    category: "보스",
    description: "보스 무기 드랍 확률을 올려 주는 유도 등대.",
    effectKey: "bossDropChanceFlat",
    effectValue: 0.015
  }
];

const RELIC_BY_ID = Object.fromEntries(RELIC_CATALOG.map((relic) => [relic.id, relic]));

const TEMP_UPGRADE_CONFIG = [
  {
    key: "hp",
    label: "HP 강화",
    description: "이번 생존 동안 최대 HP +8%",
    getCost: (level) => Math.round(24 * Math.pow(1.72, level) + level * 14)
  },
  {
    key: "gunDamage",
    label: "총기 공격력 강화",
    description: "이번 생존 동안 모든 총기 공격력 +4%",
    getCost: (level) => Math.round(32 * Math.pow(1.76, level) + level * 18)
  },
  {
    key: "critChance",
    label: "치명타 확률 강화",
    description: "이번 생존 동안 모든 총기 치명타 확률 +0.7%",
    getCost: (level) => Math.round(36 * Math.pow(1.8, level) + level * 18)
  },
  {
    key: "critDamage",
    label: "치명타 배율 강화",
    description: "이번 생존 동안 모든 총기 치명타 배율 +4%",
    getCost: (level) => Math.round(40 * Math.pow(1.84, level) + level * 20)
  },
  {
    key: "attackSpeed",
    label: "공격 속도 강화",
    description: "이번 생존 동안 모든 총기 공격 속도 스탯 -0.8%",
    getCost: (level) => Math.round(42 * Math.pow(1.86, level) + level * 22)
  },
  {
    key: "slots",
    label: "총기 슬롯 추가",
    description: "이번 생존 동안 장착 슬롯 +1",
    getCost: (level) => Math.round(420 * Math.pow(2.5, level))
  }
];

const PERMANENT_UPGRADE_CONFIG = [
  {
    key: "hp",
    label: "HP 강화",
    description: "최대 HP +5%",
    getCost: (level) => Math.round(3 + 3 * Math.pow(1.44, level))
  },
  {
    key: "gunDamage",
    label: "총기 공격력 강화",
    description: "모든 총기 공격력 +2.5%",
    getCost: (level) => Math.round(4 + 3 * Math.pow(1.5, level))
  },
  {
    key: "critChance",
    label: "치명타 확률 강화",
    description: "모든 총기 치명타 확률 +0.4%",
    getCost: (level) => Math.round(4 + 4 * Math.pow(1.52, level))
  },
  {
    key: "critDamage",
    label: "치명타 배율 강화",
    description: "모든 총기 치명타 배율 +2.5%",
    getCost: (level) => Math.round(5 + 4 * Math.pow(1.56, level))
  },
  {
    key: "attackSpeed",
    label: "공격 속도 강화",
    description: "모든 총기 공격 속도 스탯 -0.4%",
    getCost: (level) => Math.round(5 + 5 * Math.pow(1.6, level))
  },
  {
    key: "trophyGain",
    label: "몬스터 전리품 획득량 증가",
    description: "모든 몬스터 전리품 획득량 +5%",
    getCost: (level) => Math.round(6 + 6 * Math.pow(1.58, level))
  },
  {
    key: "slots",
    label: "총기 슬롯 추가",
    description: "영구 장착 슬롯 +1",
    getCost: (level) => Math.round((18 + 16 * Math.pow(2.4, level)) * 10)
  }
];

const dom = {
  combatStateChip: document.getElementById("combatStateChip"),
  haltStateChip: document.getElementById("haltStateChip"),
  fullResetButton: document.getElementById("fullResetButton"),
  heroHpValue: document.getElementById("heroHpValue"),
  heroHpMeta: document.getElementById("heroHpMeta"),
  stageValue: document.getElementById("stageValue"),
  enemyTag: document.getElementById("enemyTag"),
  trophyValue: document.getElementById("trophyValue"),
  stoneValue: document.getElementById("stoneValue"),
  shardValue: document.getElementById("shardValue"),
  stoneForecast: document.getElementById("stoneForecast"),
  dpsValue: document.getElementById("dpsValue"),
  runSummary: document.getElementById("runSummary"),
  enemyName: document.getElementById("enemyName"),
  enemyFlavor: document.getElementById("enemyFlavor"),
  toggleHaltButton: document.getElementById("toggleHaltButton"),
  reincarnateButton: document.getElementById("reincarnateButton"),
  playerHpLabel: document.getElementById("playerHpLabel"),
  enemyHpLabel: document.getElementById("enemyHpLabel"),
  playerHpBar: document.getElementById("playerHpBar"),
  enemyHpBar: document.getElementById("enemyHpBar"),
  enemyAttackValue: document.getElementById("enemyAttackValue"),
  timeToKillValue: document.getElementById("timeToKillValue"),
  trophyRewardValue: document.getElementById("trophyRewardValue"),
  dropChanceValue: document.getElementById("dropChanceValue"),
  latestEvent: document.getElementById("latestEvent"),
  enemyPortrait: document.getElementById("enemyPortrait"),
  enemyGlyph: document.getElementById("enemyGlyph"),
  arenaStageValue: document.getElementById("arenaStageValue"),
  offlineReport: document.getElementById("offlineReport"),
  battleLog: document.getElementById("battleLog"),
  playerStats: document.getElementById("playerStats"),
  gunSlots: document.getElementById("gunSlots"),
  loadoutTabButton: document.getElementById("loadoutTabButton"),
  loadoutTabAlert: document.getElementById("loadoutTabAlert"),
  slotSummary: document.getElementById("slotSummary"),
  trophyUpgrades: document.getElementById("trophyUpgrades"),
  stoneUpgrades: document.getElementById("stoneUpgrades"),
  dropEmptyState: document.getElementById("dropEmptyState"),
  dropQueueCount: document.getElementById("dropQueueCount"),
  dropActionBar: document.getElementById("dropActionBar"),
  detailTabs: document.getElementById("detailTabs"),
  detailPanels: Array.from(document.querySelectorAll(".detail-panel")),
  dropGunCard: document.getElementById("dropGunCard"),
  dropChoices: document.getElementById("dropChoices"),
  recommendedDropButton: document.getElementById("recommendedDropButton"),
  autoEquipDropsButton: document.getElementById("autoEquipDropsButton"),
  discardDropButton: document.getElementById("discardDropButton"),
  forgeRelicButton: document.getElementById("forgeRelicButton"),
  relicForgeStatus: document.getElementById("relicForgeStatus"),
  relicCollectionSummary: document.getElementById("relicCollectionSummary"),
  relicList: document.getElementById("relicList")
};

let state = loadState();
let frameHandle = 0;
let lastFrameTime = performance.now();
let hiddenStartedAt = null;
let activeDetailTab = "combat";
const renderCache = {
  stats: "",
  gunSlots: "",
  tempUpgrades: "",
  stoneUpgrades: "",
  logs: "",
  dropWorkbench: "",
  relics: ""
};

initialize();

function initialize() {
  state = normalizeState(state);
  const initialOfflineMs = Date.now() - state.lastSavedAt;
  if (initialOfflineMs >= 1000) {
    applyOfflineProgress(initialOfflineMs);
  }

  dom.toggleHaltButton.addEventListener("click", toggleHaltMode);
  dom.reincarnateButton.addEventListener("click", reincarnate);
  dom.fullResetButton.addEventListener("click", hardResetGame);
  dom.trophyUpgrades.addEventListener("pointerdown", handleUpgradeClick);
  dom.stoneUpgrades.addEventListener("pointerdown", handleUpgradeClick);
  dom.detailTabs.addEventListener("click", handleDetailTabClick);
  dom.dropChoices.addEventListener("pointerdown", handleDropChoice);
  dom.recommendedDropButton?.addEventListener("click", equipRecommendedDrop);
  dom.autoEquipDropsButton?.addEventListener("click", autoEquipPendingDrops);
  dom.discardDropButton.addEventListener("pointerdown", discardActiveDrop);
  dom.forgeRelicButton?.addEventListener("click", forgeRelic);
  if (dom.discardDropButton) {
    dom.discardDropButton.textContent = "해체하기";
  }

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("beforeunload", () => saveGame(true));

  openPendingDropIfNeeded();
  render();
  saveGame(true);
  frameHandle = requestAnimationFrame(gameLoop);
}

function createInitialState() {
  const baseState = {
    version: STATE_VERSION,
    player: {
      stage: 1,
      maxStageReached: 1,
      enemyNumber: 1,
      hp: 100,
      trophies: 0,
      stones: 0,
      gunShards: 0,
      haltedStage: null,
      tempUpgrades: {
        hp: 0,
        gunDamage: 0,
        critChance: 0,
        critDamage: 0,
        attackSpeed: 0,
        slots: 0
      },
      permanentUpgrades: {
        hp: 0,
        gunDamage: 0,
        critChance: 0,
        critDamage: 0,
        attackSpeed: 0,
        trophyGain: 0,
        slots: 0
      },
      kills: {
        normal: 0,
        miniboss: 0,
        boss: 0
      },
      lifetimeKills: {
        normal: 0,
        miniboss: 0,
        boss: 0
      },
      relics: {},
      equippedGunIds: [createGunInstance("basic-pistol", 0)]
    },
    currentEnemy: null,
    gunCooldowns: [0],
    enemyAttackCooldown: 1,
    logs: [],
    pendingDrops: [],
    activeDrop: null,
    offlineReport: null,
    lastSavedAt: Date.now(),
    lastAutoSaveAt: Date.now()
  };

  baseState.currentEnemy = createEnemy(baseState.player.stage, baseState.player.enemyNumber);
  baseState.player.hp = getMaxHp(baseState);
  addLog(baseState, "전투 준비 완료. 기본 권총으로 교전을 시작합니다.");
  return baseState;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createInitialState();
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== STATE_VERSION) {
      return createInitialState();
    }

    return parsed;
  } catch (error) {
    console.warn("Failed to load save:", error);
    return createInitialState();
  }
}

function normalizeState(source) {
  const defaults = createInitialState();
  const legacyTempGunLevel = source.player?.tempUpgrades?.gun ?? 0;
  const normalized = {
    ...defaults,
    ...source,
    player: {
      ...defaults.player,
      ...source.player,
      maxStageReached: Math.max(
        source.player?.maxStageReached ?? 1,
        source.player?.stage ?? 1,
        1
      ),
      tempUpgrades: {
        ...defaults.player.tempUpgrades,
        ...source.player?.tempUpgrades,
        gunDamage: source.player?.tempUpgrades?.gunDamage ?? legacyTempGunLevel
      },
      permanentUpgrades: {
        ...defaults.player.permanentUpgrades,
        ...source.player?.permanentUpgrades
      },
      kills: {
        ...defaults.player.kills,
        ...source.player?.kills
      },
      lifetimeKills: {
        ...defaults.player.lifetimeKills,
        ...source.player?.lifetimeKills
      },
      gunShards: Math.max(0, Math.round(Number(source.player?.gunShards) || 0)),
      relics: normalizeRelicCollection(source.player?.relics),
      equippedGunIds: Array.isArray(source.player?.equippedGunIds)
        ? source.player.equippedGunIds
            .map((gunEntry) => (gunEntry === null ? null : normalizeGunInstance(gunEntry)))
            .filter((gunEntry) => gunEntry === null || gunEntry)
        : defaults.player.equippedGunIds
    },
    gunCooldowns: Array.isArray(source.gunCooldowns) ? source.gunCooldowns : defaults.gunCooldowns,
    logs: Array.isArray(source.logs) ? source.logs.slice(0, LOG_LIMIT) : defaults.logs,
    pendingDrops: Array.isArray(source.pendingDrops)
      ? source.pendingDrops.map(normalizeDropEntry).filter(Boolean)
      : [],
    activeDrop: normalizeDropEntry(source.activeDrop),
    offlineReport: source.offlineReport ?? null,
    lastSavedAt: typeof source.lastSavedAt === "number" ? source.lastSavedAt : Date.now(),
    lastAutoSaveAt: Date.now(),
    enemyAttackCooldown: typeof source.enemyAttackCooldown === "number" ? source.enemyAttackCooldown : 1
  };

  syncEquipment(normalized);

  if (
    !normalized.currentEnemy ||
    normalized.currentEnemy.stage !== normalized.player.stage ||
    normalized.currentEnemy.enemyNumber !== normalized.player.enemyNumber
  ) {
    normalized.currentEnemy = createEnemy(normalized.player.stage, normalized.player.enemyNumber);
  } else {
    const freshEnemy = createEnemy(normalized.player.stage, normalized.player.enemyNumber);
    normalized.currentEnemy = {
      ...freshEnemy,
      ...normalized.currentEnemy,
      hp: clamp(normalized.currentEnemy.hp, 1, freshEnemy.maxHp)
    };
  }

  normalized.player.hp = clamp(normalized.player.hp, 0, getMaxHp(normalized));
  if (normalized.player.hp <= 0) {
    normalized.player.hp = getMaxHp(normalized);
  }

  return normalized;
}

function syncEquipment(gameState) {
  const slotCount = getSlotCount(gameState);

  while (gameState.player.equippedGunIds.length < slotCount) {
    gameState.player.equippedGunIds.push(null);
  }
  if (gameState.player.equippedGunIds.length > slotCount) {
    gameState.player.equippedGunIds = gameState.player.equippedGunIds.slice(0, slotCount);
  }

  while (gameState.gunCooldowns.length < slotCount) {
    gameState.gunCooldowns.push(0);
  }
  if (gameState.gunCooldowns.length > slotCount) {
    gameState.gunCooldowns = gameState.gunCooldowns.slice(0, slotCount);
  }

  if (!gameState.player.equippedGunIds.some(Boolean)) {
    gameState.player.equippedGunIds[0] = createGunInstance("basic-pistol", 0);
  }
}

function saveGame(isSilent = false) {
  state.lastSavedAt = Date.now();
  state.lastAutoSaveAt = state.lastSavedAt;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (!isSilent) {
      addLog(state, "전투 상태를 저장했습니다.");
    }
  } catch (error) {
    console.warn("Failed to save game:", error);
  }
}

function gameLoop(now) {
  const deltaSeconds = Math.min((now - lastFrameTime) / 1000, 0.25);
  lastFrameTime = now;

  if (!document.hidden) {
    updateCombat(deltaSeconds);

    if (Date.now() - state.lastAutoSaveAt >= AUTO_SAVE_MS) {
      saveGame(true);
    }
  }

  render();
  frameHandle = requestAnimationFrame(gameLoop);
}

function updateCombat(deltaSeconds) {
  syncEquipment(state);

  for (let slotIndex = 0; slotIndex < state.player.equippedGunIds.length; slotIndex += 1) {
    const equippedGun = state.player.equippedGunIds[slotIndex];
    if (!equippedGun) {
      continue;
    }

    const effectiveStats = getEffectiveGunStats(equippedGun);
    state.gunCooldowns[slotIndex] -= deltaSeconds;

    while (state.gunCooldowns[slotIndex] <= 0) {
      fireGun(slotIndex, effectiveStats);
      state.gunCooldowns[slotIndex] += effectiveStats.attackIntervalSeconds;
    }
  }

  state.enemyAttackCooldown -= deltaSeconds;
  while (state.enemyAttackCooldown <= 0) {
    state.enemyAttackCooldown += 1;
    enemyAttack();
  }
}

function fireGun(slotIndex, effectiveStats) {
  if (!state.currentEnemy || state.currentEnemy.hp <= 0) {
    return;
  }

  const critRoll = Math.random() < effectiveStats.critChance / 10000;
  const damage = Math.round(
    effectiveStats.damage * (critRoll ? 1 + effectiveStats.critMultiplier / 100 : 1)
  );

  state.currentEnemy.hp = Math.max(0, state.currentEnemy.hp - damage);

  if (state.currentEnemy.hp <= 0) {
    handleEnemyDefeat();
  }
}

function enemyAttack() {
  if (!state.currentEnemy) {
    return;
  }

  state.player.hp = Math.max(0, state.player.hp - state.currentEnemy.attack);

  if (state.player.hp <= 0) {
    handlePlayerDefeat();
  }
}

function handleEnemyDefeat() {
  const defeatedEnemy = state.currentEnemy;
  const shouldRestoreHp = defeatedEnemy.enemyNumber === 5 || defeatedEnemy.enemyNumber === 10;
  const rewardEarned = grantKillRewards(defeatedEnemy, 1, 1);

  addLog(
    state,
    `${defeatedEnemy.name} 격파. 전리품 +${formatCompact(rewardEarned)}`
  );

  if (defeatedEnemy.type === "boss" && Math.random() < getBossDropChance(state)) {
    queueGunDrop(defeatedEnemy.stage);
  }

  if (state.player.enemyNumber === 10) {
    const nextStage = state.player.haltedStage ?? state.player.stage + 1;
    const wasLocked = state.player.haltedStage !== null;

    state.player.stage = nextStage;
    state.player.maxStageReached = Math.max(state.player.maxStageReached, state.player.stage);
    state.player.enemyNumber = 1;
    if (shouldRestoreHp) {
      state.player.hp = getMaxHp(state);
    }

    addLog(
      state,
      wasLocked
        ? `고정 스테이지 ${state.player.stage}를 다시 순환합니다. 플레이어 HP 전회복.`
        : `스테이지 ${state.player.stage} 진입. 플레이어 HP 전회복.`
    );
  } else {
    state.player.enemyNumber += 1;

    if (shouldRestoreHp) {
      state.player.hp = getMaxHp(state);
      addLog(state, `${defeatedEnemy.typeLabel} 격파 후 플레이어 HP 전회복.`);
    }
  }

  state.currentEnemy = createEnemy(state.player.stage, state.player.enemyNumber);
  saveGame(true);
  openPendingDropIfNeeded();
}

function handlePlayerDefeat() {
  const previousStage = state.player.stage;
  state.player.hp = getMaxHp(state);
  state.player.stage = Math.max(1, state.player.stage - 1);
  state.player.enemyNumber = 1;
  state.player.haltedStage = state.player.stage;
  state.currentEnemy = createEnemy(state.player.stage, state.player.enemyNumber);
  state.enemyAttackCooldown = 1;
  state.gunCooldowns = state.gunCooldowns.map(() => 0);

  addLog(
    state,
    `패배. 스테이지 ${previousStage}에서 후퇴해 ${state.player.stage} 고정 사냥으로 전환했습니다.`
  );

  state.offlineReport = {
    message: "패배 후 진행 멈춤이 자동 활성화되었습니다. 환생하면 강화석을 정산합니다."
  };

  saveGame(true);
}

function grantKillRewards(enemy, count, rewardRate) {
  const totalReward = Math.floor(
    enemy.trophyReward * count * rewardRate * getTrophyRewardMultiplier(state)
  );
  state.player.trophies += totalReward;
  state.player.kills[enemy.type] += count;
  state.player.lifetimeKills[enemy.type] += count;
  return totalReward;
}

function queueGunDrop(stage) {
  const droppedGun = rollGunDrop(stage);
  if (!droppedGun) {
    return;
  }

  state.pendingDrops.push({
    ...droppedGun,
    stage,
    obtainedAt: Date.now()
  });

  const gun = { name: getGunLogLabel(droppedGun) };

  addLog(state, `보스 드랍 발생: ${gun.name} 획득`);
  openPendingDropIfNeeded();
}

function openPendingDropIfNeeded() {
  if (state.activeDrop || state.pendingDrops.length === 0) {
    return;
  }

  state.activeDrop = state.pendingDrops.shift();
}

function rollGunDrop(stage) {
  const available = GUN_CATALOG.filter(
    (gun) => gun.id !== "basic-pistol" && gun.minStage <= stage + 2
  );
  if (available.length === 0) {
    return null;
  }

  const gun = rollWeightedChoice(available, "dropWeight");
  const rarity = rollWeightedChoice(GUN_RARITY_TIERS, "dropWeight");
  if (!gun || !rarity) {
    return null;
  }

  return createGunInstance(gun.id, rarity.tier);
}

function toggleHaltMode() {
  if (state.player.haltedStage === null) {
    state.player.haltedStage = state.player.stage;
    addLog(state, `진행 멈춤 활성화. 스테이지 ${state.player.stage}에 고정됩니다.`);
  } else {
    addLog(state, `진행 멈춤 해제. 다시 자동 스테이지 진행을 시작합니다.`);
    state.player.haltedStage = null;
  }

  saveGame(true);
}

function reincarnate() {
  const stonesEarned = getPendingStoneRewards(state);
  const permanentStones = state.player.stones + stonesEarned;
  const permanentUpgrades = { ...state.player.permanentUpgrades };
  const dismantledShardGain = getEquippedGunShardTotal(state, false);
  const gunShards = state.player.gunShards + dismantledShardGain;
  const relics = { ...state.player.relics };

  state = createInitialState();
  state.player.stones = permanentStones;
  state.player.permanentUpgrades = permanentUpgrades;
  state.player.gunShards = gunShards;
  state.player.relics = relics;
  state.player.hp = getMaxHp(state);
  state.currentEnemy = createEnemy(1, 1);
  const reincarnateLogText =
    dismantledShardGain > 0
      ? `환생 완료. 강화석 +${formatCompact(stonesEarned)} 정산, 장착 총기 해체로 총기 조각 +${formatCompact(dismantledShardGain)} 후 기본 권총 1정으로 재시작합니다.`
      : `환생 완료. 강화석 +${formatCompact(stonesEarned)} 정산 후 기본 권총 1정으로 재시작합니다.`;
  addLog(
    state,
    `환생 완료. 강화석 +${formatCompact(stonesEarned)} 정산 후 기본 권총 1정으로 재시작합니다.`
  );
  if (state.logs[0]) {
    state.logs[0].text = reincarnateLogText;
  }
  saveGame(true);
}

function hardResetGame() {
  const shouldReset = window.confirm(
    "테스트용 전체 초기화를 진행할까요? 저장된 전투 진행, 강화, 드랍 대기열이 모두 초기화됩니다."
  );
  if (!shouldReset) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  state = createInitialState();
  activeDetailTab = "combat";
  hiddenStartedAt = null;
  Object.keys(renderCache).forEach((key) => {
    renderCache[key] = "";
  });
  render();
  saveGame(true);
}

function getPendingStoneRewards(gameState) {
  const clearedStages = Math.max(0, gameState.player.maxStageReached - 1);
  const normalKills = clearedStages * 8;
  const minibossKills = clearedStages;
  const bossKills = clearedStages;
  const baseStoneReward = Math.floor(normalKills / 5) + minibossKills + bossKills * 2;

  return Math.max(0, Math.floor(baseStoneReward * getStoneRewardMultiplier(gameState)));
}

function getMaxHp(gameState) {
  const hpMultiplier =
    1 +
    gameState.player.tempUpgrades.hp * 0.08 +
    gameState.player.permanentUpgrades.hp * 0.05 +
    getRelicEffectTotal(gameState, "hpMultiplier");
  return Math.max(1, Math.round(100 * hpMultiplier));
}

function getSlotCount(gameState) {
  return 1 + gameState.player.tempUpgrades.slots + gameState.player.permanentUpgrades.slots;
}

function getEffectiveGunStats(gunRef) {
  const gunInstance = normalizeGunInstance(gunRef);
  if (!gunInstance) {
    return null;
  }

  const gun = GUN_BY_ID[gunInstance.gunId];
  const rarityMeta = getGunRarityMeta(gunInstance.tier);
  const rarityMultiplier = getGunRarityMultiplier(gunInstance.tier);
  const tempGunBonus = state.player.tempUpgrades.gunDamage * 0.04;
  const permanentDamageBonus =
    state.player.permanentUpgrades.gunDamage * 0.025 +
    getRelicEffectTotal(state, "gunDamageMultiplier");
  const critChanceBonus =
    state.player.tempUpgrades.critChance * 70 +
    state.player.permanentUpgrades.critChance * 40 +
    getRelicEffectTotal(state, "critChanceFlat");
  const critDamageBonus =
    state.player.tempUpgrades.critDamage * 4 +
    state.player.permanentUpgrades.critDamage * 2.5 +
    getRelicEffectTotal(state, "critDamageFlat");
  const attackSpeedFactor = Math.max(
    0.55,
    1 -
      state.player.tempUpgrades.attackSpeed * 0.008 -
      state.player.permanentUpgrades.attackSpeed * 0.004 -
      getRelicEffectTotal(state, "attackSpeedReduction")
  );
  const baseDamage = gun.damage * rarityMultiplier;
  const baseCritChance = gun.critChance * rarityMultiplier;
  const baseCritMultiplier = gun.critMultiplier * rarityMultiplier;
  const baseAttackSpeed = gun.attackSpeed / rarityMultiplier;
  const effectiveAttackSpeed = Math.max(8, baseAttackSpeed * attackSpeedFactor);
  const attackIntervalSeconds = effectiveAttackSpeed / 60;
  const damage = Math.round(baseDamage * (1 + tempGunBonus + permanentDamageBonus));
  const critChance = Math.min(10000, Math.round(baseCritChance + critChanceBonus));
  const critMultiplier = Math.round((baseCritMultiplier + critDamageBonus) * 10) / 10;
  const expectedHit = damage * (1 + (critChance / 10000) * (critMultiplier / 100));
  const dps = expectedHit / attackIntervalSeconds;

  return {
    ...gun,
    gunId: gun.id,
    tier: gunInstance.tier,
    rarityMeta,
    rarityMultiplier,
    damage,
    critChance,
    critMultiplier,
    attackSpeed: effectiveAttackSpeed,
    attackIntervalSeconds,
    expectedHit,
    dps
  };
}

function getTotalExpectedDps() {
  return state.player.equippedGunIds.reduce((sum, equippedGun) => {
    if (!equippedGun) {
      return sum;
    }

    const stats = getEffectiveGunStats(equippedGun);
    return stats ? sum + stats.dps : sum;
  }, 0);
}

function createEnemy(stage, enemyNumber) {
  const type = enemyNumber === 10 ? "boss" : enemyNumber === 5 ? "miniboss" : "normal";
  const typeLabel = {
    normal: "일반 적",
    miniboss: "중보스",
    boss: "보스"
  }[type];

  const prefixes = [
    "Scrap",
    "Dust",
    "Ash",
    "Chrome",
    "Hollow",
    "Siege",
    "Dread",
    "Iron",
    "Void",
    "Neon"
  ];
  const normalUnits = ["Raider", "Runner", "Prowler", "Gunner", "Skirmisher"];
  const eliteUnits = ["Bulldozer", "Enforcer", "Brute", "Marauder", "Sentinel"];
  const bossUnits = ["Overseer", "Warmaster", "Juggernaut", "Dominator", "Warlord"];

  const prefix = prefixes[(stage - 1) % prefixes.length];
  const unitPool = type === "normal" ? normalUnits : type === "miniboss" ? eliteUnits : bossUnits;
  const unit = unitPool[(stage + enemyNumber) % unitPool.length];

  const curve = 1 + stage * 0.06 + Math.pow(stage, 1.5) * 0.02;
  const baseHp = (7 + stage * 2.3) * curve;
  const baseAttack = (1.1 + stage * 0.55) * (1 + stage * 0.05 + Math.pow(stage, 1.3) * 0.02);
  const hpMultiplier = type === "normal" ? 1 : type === "miniboss" ? 2.1 : 3.6;
  const attackMultiplier = type === "normal" ? 1 : type === "miniboss" ? 1.12 : 1.28;
  const rewardMultiplier = type === "normal" ? 1 : type === "miniboss" ? 3.4 : 6.4;

  const maxHp = Math.round(baseHp * hpMultiplier);
  const attack = Math.max(1, Math.round(baseAttack * attackMultiplier));
  const trophyReward = Math.round((5 + stage * 1.8) * rewardMultiplier);
  const flavor = {
    normal: "기본 스탯만 빠르게 생성된 일반 적입니다.",
    miniboss: "체력과 공격력이 크게 상승한 중간 관문 적입니다.",
    boss: "20% 확률로 총기를 떨어뜨리는 스테이지 보스입니다."
  }[type];

  return {
    stage,
    enemyNumber,
    type,
    typeLabel,
    name: `${prefix} ${unit}`,
    flavor,
    maxHp,
    hp: maxHp,
    attack,
    trophyReward
  };
}

function handleUpgradeClick(event) {
  const button = event.target.closest("button[data-upgrade-key][data-upgrade-mode]");
  if (!button) {
    return;
  }

  event.preventDefault();

  const key = button.dataset.upgradeKey;
  const currency = button.dataset.currency;
  const mode = button.dataset.upgradeMode ?? "single";
  const purchase = purchaseUpgrade(key, currency, mode);
  if (purchase) {
    saveGame(true);
  }
  return;

  if (currency === "trophies") {
    const config = TEMP_UPGRADE_CONFIG.find((entry) => entry.key === key);
    if (!config) {
      return;
    }
    const level = state.player.tempUpgrades[key];
    const cost = config.getCost(level);
    if (state.player.trophies < cost) {
      addLog(state, `${config.label} 강화 실패. 전리품이 부족합니다.`);
      return;
    }

    state.player.trophies -= cost;
    state.player.tempUpgrades[key] += 1;
    syncEquipment(state);
    state.player.hp = Math.min(
      getMaxHp(state),
      state.player.hp + Math.max(4, Math.round(getMaxHp(state) * 0.08))
    );
    addLog(state, `${config.label} Lv.${state.player.tempUpgrades[key]} 달성`);
  }

  if (currency === "stones") {
    const config = PERMANENT_UPGRADE_CONFIG.find((entry) => entry.key === key);
    if (!config) {
      return;
    }
    const level = state.player.permanentUpgrades[key];
    const cost = config.getCost(level);
    if (state.player.stones < cost) {
      addLog(state, `${config.label} 강화 실패. 강화석이 부족합니다.`);
      return;
    }

    state.player.stones -= cost;
    state.player.permanentUpgrades[key] += 1;
    syncEquipment(state);
    state.player.hp = Math.min(
      getMaxHp(state),
      state.player.hp + Math.max(3, Math.round(getMaxHp(state) * 0.05))
    );
    addLog(state, `${config.label} Lv.${state.player.permanentUpgrades[key]} 달성`);
  }

  saveGame(true);
}

function purchaseUpgrade(key, currency, mode) {
  const configList = currency === "trophies" ? TEMP_UPGRADE_CONFIG : currency === "stones" ? PERMANENT_UPGRADE_CONFIG : null;
  const upgradeState =
    currency === "trophies"
      ? state.player.tempUpgrades
      : currency === "stones"
        ? state.player.permanentUpgrades
        : null;
  const walletKey = currency === "trophies" ? "trophies" : currency === "stones" ? "stones" : null;

  if (!configList || !upgradeState || !walletKey) {
    return null;
  }

  const config = configList.find((entry) => entry.key === key);
  if (!config) {
    return null;
  }

  const level = upgradeState[key];
  const budget = state.player[walletKey];
  const purchase =
    mode === "max"
      ? getMaxAffordableUpgradePurchase(config, level, budget)
      : {
          levels: budget >= config.getCost(level) ? 1 : 0,
          totalCost: config.getCost(level)
        };

  if (purchase.levels <= 0) {
    addLog(
      state,
      currency === "trophies"
        ? `${config.label} 강화 실패. 전리품이 부족합니다.`
        : `${config.label} 강화 실패. 강화석이 부족합니다.`
    );
    return null;
  }

  state.player[walletKey] -= purchase.totalCost;
  upgradeState[key] += purchase.levels;
  syncEquipment(state);

  const healRatio = currency === "trophies" ? 0.08 : 0.05;
  const healFloor = currency === "trophies" ? 4 : 3;
  const healAmount = Math.max(healFloor, Math.round(getMaxHp(state) * healRatio)) * purchase.levels;
  state.player.hp = Math.min(getMaxHp(state), state.player.hp + healAmount);

  addLog(
    state,
    purchase.levels > 1
      ? `${config.label} 최대 강화 ${purchase.levels}회 적용. Lv.${upgradeState[key]}`
      : `${config.label} Lv.${upgradeState[key]} 달성`
  );

  return purchase;
}

function getMaxAffordableUpgradePurchase(config, startingLevel, budget) {
  let level = startingLevel;
  let levels = 0;
  let totalCost = 0;

  while (levels < 999) {
    const nextCost = config.getCost(level);
    if (totalCost + nextCost > budget) {
      break;
    }

    totalCost += nextCost;
    level += 1;
    levels += 1;
  }

  return { levels, totalCost };
}

function getRecommendedSlotForGun(gunRef) {
  const candidateStats = getEffectiveGunStats(gunRef);
  if (!candidateStats || state.player.equippedGunIds.length === 0) {
    return null;
  }

  let bestSlotIndex = 0;
  let bestDelta = Number.NEGATIVE_INFINITY;

  for (let slotIndex = 0; slotIndex < state.player.equippedGunIds.length; slotIndex += 1) {
    const equippedGun = state.player.equippedGunIds[slotIndex];
    const equippedStats = equippedGun ? getEffectiveGunStats(equippedGun) : null;
    const delta = equippedStats ? candidateStats.dps - equippedStats.dps : candidateStats.dps;

    if (delta > bestDelta) {
      bestDelta = delta;
      bestSlotIndex = slotIndex;
    }
  }

  return {
    slotIndex: bestSlotIndex,
    delta: bestDelta
  };
}

function canUseRecommendedSlot(recommendation) {
  return Boolean(recommendation && recommendation.delta >= 0);
}

function equipActiveDropToSlot(slotIndex) {
  if (!state.activeDrop || !Number.isInteger(slotIndex) || slotIndex < 0 || slotIndex >= state.player.equippedGunIds.length) {
    return false;
  }

  const droppedGun = createGunInstance(state.activeDrop.gunId, state.activeDrop.tier ?? 0);
  const replacedGun = state.player.equippedGunIds[slotIndex];

  state.player.equippedGunIds[slotIndex] = droppedGun;
  state.gunCooldowns[slotIndex] = 0;
  addLog(
    state,
    replacedGun
      ? `${getGunLogLabel(droppedGun)}를 슬롯 ${slotIndex + 1}에 장착하고 ${getGunLogLabel(replacedGun)}를 폐기했습니다.`
      : `${getGunLogLabel(droppedGun)}를 빈 슬롯 ${slotIndex + 1}에 장착했습니다.`
  );

  state.activeDrop = null;
  openPendingDropIfNeeded();
  saveGame(true);
  return true;
}

function handleDropChoice(event) {
  const button = event.target.closest("button[data-slot-index]");
  if (!button || !state.activeDrop) {
    return;
  }

  event.preventDefault();

  const slotIndex = Number(button.dataset.slotIndex);
  equipActiveDropToSlot(slotIndex);
  return;
  const droppedGun = createGunInstance(state.activeDrop.gunId, state.activeDrop.tier ?? 0);
  const gunId = droppedGun.gunId;
  const replaced = state.player.equippedGunIds[slotIndex]?.gunId ?? state.player.equippedGunIds[slotIndex];

  state.player.equippedGunIds[slotIndex] = droppedGun;
  state.gunCooldowns[slotIndex] = 0;
  addLog(
    state,
    replaced
      ? `${GUN_BY_ID[gunId].name}를 슬롯 ${slotIndex + 1}에 장착하고 ${GUN_BY_ID[replaced].name}를 폐기했습니다.`
      : `${GUN_BY_ID[gunId].name}를 빈 슬롯 ${slotIndex + 1}에 장착했습니다.`
  );

  state.activeDrop = null;
  openPendingDropIfNeeded();
  saveGame(true);
}

function equipRecommendedDrop(event) {
  if (!state.activeDrop) {
    return;
  }

  if (event?.preventDefault) {
    event.preventDefault();
  }

  const recommendation = getRecommendedSlotForGun(state.activeDrop);
  if (!canUseRecommendedSlot(recommendation)) {
    return;
  }

  equipActiveDropToSlot(recommendation.slotIndex);
}

function autoEquipPendingDrops(event) {
  if (event?.preventDefault) {
    event.preventDefault();
  }

  if (getPendingDropCount(state) <= 10) {
    return;
  }

  let equippedCount = 0;
  let dismantledCount = 0;

  while (state.activeDrop) {
    const recommendation = getRecommendedSlotForGun(state.activeDrop);
    if (canUseRecommendedSlot(recommendation)) {
      equipActiveDropToSlot(recommendation.slotIndex);
      equippedCount += 1;
      continue;
    }

    discardActiveDrop();
    dismantledCount += 1;
  }

  addLog(
    state,
    `자동 장착 처리 완료. 장착 ${formatCompact(equippedCount)}정 / 해체 ${formatCompact(dismantledCount)}정`
  );
  saveGame(true);
}

function discardActiveDrop(event) {
  if (!state.activeDrop) {
    return;
  }

  if (event?.preventDefault) {
    event.preventDefault();
  }

  const dismantledGun = state.activeDrop;
  const shardGain = grantGunShardsFromGun(dismantledGun);
  addLog(
    state,
    `${getGunLogLabel(dismantledGun)}를 해체해 총기 조각 ${formatCompact(shardGain)}개를 획득했습니다.`
  );
  state.activeDrop = null;
  openPendingDropIfNeeded();
  saveGame(true);
}

function handleVisibilityChange() {
  if (document.hidden) {
    hiddenStartedAt = Date.now();
    saveGame(true);
    return;
  }

  if (hiddenStartedAt) {
    applyOfflineProgress(Date.now() - hiddenStartedAt);
    hiddenStartedAt = null;
    saveGame(true);
  }
}

function applyOfflineProgress(elapsedMs) {
  if (elapsedMs < 1000) {
    return;
  }

  const totalDps = getTotalExpectedDps();
  if (totalDps <= 0 || !state.currentEnemy) {
    return;
  }

  const usePreviousEnemy =
    state.currentEnemy.type === "miniboss" || state.currentEnemy.type === "boss";
  const enemySnapshot = usePreviousEnemy
    ? createEnemy(state.currentEnemy.stage, Math.max(1, state.currentEnemy.enemyNumber - 1))
    : { ...state.currentEnemy };
  let damagePool = totalDps * (elapsedMs / 1000);
  let currentHp = usePreviousEnemy ? enemySnapshot.maxHp : enemySnapshot.hp;
  let kills = 0;
  let totalReward = 0;

  while (damagePool >= currentHp && kills < MAX_OFFLINE_KILLS) {
    damagePool -= currentHp;
    kills += 1;
    totalReward += enemySnapshot.trophyReward;
    state.player.kills[enemySnapshot.type] += 1;
    state.player.lifetimeKills[enemySnapshot.type] += 1;

    currentHp = enemySnapshot.maxHp;
  }

  const compensatedReward = Math.floor(
    totalReward * OFFLINE_REWARD_RATE * getTrophyRewardMultiplier(state)
  );
  state.player.trophies += compensatedReward;
  if (!usePreviousEnemy) {
    state.currentEnemy.hp = clamp(Math.round(currentHp - damagePool), 1, state.currentEnemy.maxHp);
  }

  state.offlineReport = {
    message:
      kills > 0
        ? `복귀 보상: ${formatCompact(kills)}회 처치, 전리품 ${formatCompact(compensatedReward)} 지급${
            usePreviousEnemy ? " / 특수전은 실시간 전투만 반영" : ""
          }`
        : `복귀 계산: 아직 마지막 적을 처치할 만큼의 누적 피해는 쌓이지 않았습니다.${
            usePreviousEnemy ? " 특수전은 실시간 전투만 반영됩니다." : ""
          }`
  };

  addLog(state, state.offlineReport.message);
}

function render() {
  renderTopCards();
  renderArena();
  renderStats();
  renderGunSlots();
  renderUpgradePanels();
  renderRelicPanel();
  renderLogs();
  renderDetailTabs();
  renderLoadoutWorkbench();
}

function renderTopCards() {
  const maxHp = getMaxHp(state);
  const totalDps = getTotalExpectedDps();
  const pendingStones = getPendingStoneRewards(state);
  const pendingDropCount = getPendingDropCount(state);

  dom.combatStateChip.textContent = document.hidden
      ? "백그라운드 대기"
      : pendingDropCount > 0
        ? `실시간 전투 중 / 드랍 ${pendingDropCount}개 대기`
        : "실시간 전투 중";
  dom.haltStateChip.textContent =
    state.player.haltedStage === null
      ? "스테이지 자동 진행"
      : `스테이지 ${state.player.haltedStage} 고정 사냥`;

  dom.heroHpValue.textContent = `${formatCompact(state.player.hp)} / ${formatCompact(maxHp)}`;
  dom.heroHpMeta.textContent =
    state.player.haltedStage === null
      ? "패배 시 한 단계 하락 후 전회복"
      : "패배 후 고정 스테이지 사냥 중";
  dom.stageValue.textContent = `${state.player.stage} - ${state.player.enemyNumber} / 10`;
  dom.trophyValue.textContent = formatCompact(state.player.trophies);
  dom.stoneValue.textContent = formatCompact(state.player.stones);
  dom.shardValue.textContent = formatCompact(state.player.gunShards);
  dom.stoneForecast.textContent = `환생 시 +${formatCompact(pendingStones)} 예상`;
  dom.dpsValue.textContent = `${formatCompact(totalDps)} DPS`;
  dom.runSummary.textContent = `총기 ${state.player.equippedGunIds.filter(Boolean).length}정 / 유물 ${getDiscoveredRelicCount(state)}종`;
}

function renderArena() {
  const enemy = state.currentEnemy;
  const maxHp = getMaxHp(state);
  const totalDps = getTotalExpectedDps();
  const playerHpRatio = (state.player.hp / maxHp) * 100;
  const enemyHpRatio = (enemy.hp / enemy.maxHp) * 100;
  const expectedKillTime = totalDps > 0 ? enemy.hp / totalDps : Infinity;

  dom.enemyName.textContent = enemy.name;
  dom.enemyTag.textContent = enemy.typeLabel;
  dom.enemyFlavor.textContent = enemy.flavor;
  dom.toggleHaltButton.textContent =
    state.player.haltedStage === null ? "진행 멈춤 활성화" : "진행 멈춤 해제";
  dom.playerHpLabel.textContent = `${formatCompact(state.player.hp)} / ${formatCompact(maxHp)}`;
  dom.enemyHpLabel.textContent = `${formatCompact(enemy.hp)} / ${formatCompact(enemy.maxHp)}`;
  dom.playerHpBar.style.width = `${playerHpRatio.toFixed(2)}%`;
  dom.enemyHpBar.style.width = `${enemyHpRatio.toFixed(2)}%`;
  dom.enemyAttackValue.textContent = formatCompact(enemy.attack);
  dom.enemyPortrait.dataset.enemyType = enemy.type;
  dom.enemyGlyph.textContent = getEnemyGlyph(enemy.type);
  dom.arenaStageValue.textContent = `STAGE ${state.player.stage} - ${state.player.enemyNumber} / 10`;
  dom.latestEvent.textContent = state.logs[0]?.text ?? "전투 준비 완료. 기본 권총으로 교전을 시작합니다.";
  dom.timeToKillValue.textContent = Number.isFinite(expectedKillTime)
    ? `${expectedKillTime.toFixed(1)}초`
    : "계산 불가";
  dom.trophyRewardValue.textContent = `${formatCompact(enemy.trophyReward)} 전리품`;
  dom.dropChanceValue.textContent =
    enemy.type === "boss" ? formatRatePercent(getBossDropChance(state)) : "-";

  if (state.offlineReport?.message) {
    dom.offlineReport.textContent = state.offlineReport.message;
    dom.offlineReport.classList.remove("hidden");
  } else {
    dom.offlineReport.classList.add("hidden");
  }
}

function renderStats() {
  const pendingStones = getPendingStoneRewards(state);
  const lifetimeKills =
    state.player.lifetimeKills.normal +
    state.player.lifetimeKills.miniboss +
    state.player.lifetimeKills.boss;
  const statRows = [
    { label: "최대 HP", value: formatCompact(getMaxHp(state)) },
    { label: "총 기대 DPS", value: `${formatCompact(getTotalExpectedDps())}` },
    { label: "최고 도달 스테이지", value: `${state.player.maxStageReached}` },
    { label: "누적 처치", value: formatCompact(lifetimeKills) },
    { label: "예상 강화석", value: `+${formatCompact(pendingStones)}` },
    { label: "총 슬롯", value: `${getSlotCount(state)}` },
    { label: "총기 조각", value: formatCompact(state.player.gunShards) },
    { label: "유물 수집", value: `${getDiscoveredRelicCount(state)}종 / Lv.${formatCompact(getTotalRelicLevels(state))}` }
  ];
  const markup = statRows
    .map(
      (row) => `
        <article class="stat-card">
          <span>${row.label}</span>
          <strong>${row.value}</strong>
        </article>
      `
    )
    .join("");

  if (renderCache.stats !== markup) {
    renderCache.stats = markup;
    dom.playerStats.innerHTML = markup;
  }
}

function renderGunSlots() {
  const slotCount = getSlotCount(state);
  dom.slotSummary.textContent = `${slotCount} 슬롯`;

  const markup = state.player.equippedGunIds
    .map((equippedGun, index) => {
      if (!equippedGun) {
        return `
          <article class="gun-card empty">
            <header>
              <h4>슬롯 ${index + 1}</h4>
              <span class="badge">비어 있음</span>
            </header>
            <div class="gun-meta">보스 드랍으로 얻은 총기를 이 슬롯에 장착할 수 있습니다.</div>
          </article>
        `;
      }

      const stats = getEffectiveGunStats(equippedGun);
      return `
        <article class="gun-card" style="${getRarityCardStyle(stats.tier)}">
          <header>
            <h4>슬롯 ${index + 1} - ${stats.name}</h4>
            <div class="badge-cluster">
              ${buildRarityBadgeMarkup(stats.tier)}
              <span class="badge">${stats.className}</span>
            </div>
          </header>
          <div class="gun-meta">
            <div>${stats.family} / ${stats.manufacturer}</div>
            <div class="muted">${stats.description}</div>
          </div>
          <div class="gun-stats">
            <div class="stat-line"><span>공격력</span><strong>${formatCompact(stats.damage)}</strong></div>
            <div class="stat-line"><span>공격 속도</span><strong>${stats.attackSpeed.toFixed(1)}</strong></div>
            <div class="stat-line"><span>치확</span><strong>${formatChance(stats.critChance)}</strong></div>
            <div class="stat-line"><span>치뎀</span><strong>+${stats.critMultiplier.toFixed(0)}%</strong></div>
            <div class="stat-line"><span>기대 DPS</span><strong>${formatCompact(stats.dps)}</strong></div>
          </div>
        </article>
      `;
    })
    .join("");

  if (renderCache.gunSlots !== markup) {
    renderCache.gunSlots = markup;
    dom.gunSlots.innerHTML = markup;
  }
}

function renderUpgrades() {
  const trophyMarkup = TEMP_UPGRADE_CONFIG.map((config) => {
    const level = state.player.tempUpgrades[config.key];
    const cost = config.getCost(level);
    const affordable = state.player.trophies >= cost;
    const maxPurchase = getMaxAffordableUpgradePurchase(config, level, state.player.trophies);
    return `
      <article class="upgrade-card">
        <header>
          <h4>${config.label}</h4>
          <span class="badge">Lv.${level}</span>
        </header>
        <div class="upgrade-meta">
          <div>${config.description}</div>
          <div class="stat-line"><span>비용</span><strong>${formatCompact(cost)} 전리품</strong></div>
        </div>
        <div class="stat-line"><span>최대 강화</span><strong>${maxPurchase.levels > 0 ? `${maxPurchase.levels}회 / ${formatCompact(maxPurchase.totalCost)}` : "불가"}</strong></div>
        <div class="upgrade-actions">
        <div class="stat-line"><span>최대 강화</span><strong>${maxPurchase.levels > 0 ? `${maxPurchase.levels}회 / ${formatCompact(maxPurchase.totalCost)}` : "불가"}</strong></div>
        <div class="upgrade-actions">
        <button
          type="button"
          class="${affordable ? "primary-button" : "secondary-button"}"
          data-upgrade-key="${config.key}"
          data-upgrade-mode="single"
          data-currency="trophies"
          ${affordable ? "" : "disabled"}
        >
          강화
        </button>
        <button
          type="button"
          class="secondary-button"
          data-upgrade-key="${config.key}"
          data-upgrade-mode="max"
          data-currency="trophies"
          ${maxPurchase.levels > 0 ? "" : "disabled"}
        >
          최대 강화
        </button>
        </div>
      </article>
    `;
  }).join("");

  if (renderCache.tempUpgrades !== trophyMarkup) {
    renderCache.tempUpgrades = trophyMarkup;
    dom.trophyUpgrades.innerHTML = trophyMarkup;
  }

  const stoneMarkup = PERMANENT_UPGRADE_CONFIG.map((config) => {
    const level = state.player.permanentUpgrades[config.key];
    const cost = config.getCost(level);
    const affordable = state.player.stones >= cost;
    const maxPurchase = getMaxAffordableUpgradePurchase(config, level, state.player.stones);
    return `
      <article class="upgrade-card">
        <header>
          <h4>${config.label}</h4>
          <span class="badge">Lv.${level}</span>
        </header>
        <div class="upgrade-meta">
          <div>${config.description}</div>
          <div class="stat-line"><span>비용</span><strong>${formatCompact(cost)} 강화석</strong></div>
        </div>
        <div class="stat-line"><span>최대 강화</span><strong>${maxPurchase.levels > 0 ? `${maxPurchase.levels}회 / ${formatCompact(maxPurchase.totalCost)}` : "불가"}</strong></div>
        <div class="upgrade-actions">
        <button
          type="button"
          class="${affordable ? "primary-button" : "secondary-button"}"
          data-upgrade-key="${config.key}"
          data-upgrade-mode="single"
          data-currency="stones"
          ${affordable ? "" : "disabled"}
        >
          강화
        </button>
        <button
          type="button"
          class="secondary-button"
          data-upgrade-key="${config.key}"
          data-upgrade-mode="max"
          data-currency="stones"
          ${maxPurchase.levels > 0 ? "" : "disabled"}
        >
          최대 강화
        </button>
        </div>
      </article>
    `;
  }).join("");

  if (renderCache.stoneUpgrades !== stoneMarkup) {
    renderCache.stoneUpgrades = stoneMarkup;
    dom.stoneUpgrades.innerHTML = stoneMarkup;
  }
}

function renderUpgradePanels() {
  const trophyMarkup = TEMP_UPGRADE_CONFIG.map((config) =>
    buildUpgradeCardMarkup({
      config,
      level: state.player.tempUpgrades[config.key],
      currency: "trophies",
      wallet: state.player.trophies,
      unitLabel: "전리품"
    })
  ).join("");

  if (renderCache.tempUpgrades !== trophyMarkup) {
    renderCache.tempUpgrades = trophyMarkup;
    dom.trophyUpgrades.innerHTML = trophyMarkup;
  }

  const stoneMarkup = PERMANENT_UPGRADE_CONFIG.map((config) =>
    buildUpgradeCardMarkup({
      config,
      level: state.player.permanentUpgrades[config.key],
      currency: "stones",
      wallet: state.player.stones,
      unitLabel: "강화석"
    })
  ).join("");

  if (renderCache.stoneUpgrades !== stoneMarkup) {
    renderCache.stoneUpgrades = stoneMarkup;
    dom.stoneUpgrades.innerHTML = stoneMarkup;
  }
}

function buildUpgradeCardMarkup({ config, level, currency, wallet, unitLabel }) {
  const cost = config.getCost(level);
  const affordable = wallet >= cost;
  const maxPurchase = getMaxAffordableUpgradePurchase(config, level, wallet);

  return `
    <article class="upgrade-card">
      <header>
        <h4>${config.label}</h4>
        <span class="badge">Lv.${level}</span>
      </header>
      <div class="upgrade-meta">
        <div>${config.description}</div>
        <div class="stat-line"><span>비용</span><strong>${formatCompact(cost)} ${unitLabel}</strong></div>
        <div class="stat-line"><span>최대 강화</span><strong>${maxPurchase.levels > 0 ? `${maxPurchase.levels}회 / ${formatCompact(maxPurchase.totalCost)}` : "불가"}</strong></div>
      </div>
      <div class="upgrade-actions">
        <button
          type="button"
          class="${affordable ? "primary-button" : "secondary-button"}"
          data-upgrade-key="${config.key}"
          data-upgrade-mode="single"
          data-currency="${currency}"
          ${affordable ? "" : "disabled"}
        >
          강화
        </button>
        <button
          type="button"
          class="secondary-button"
          data-upgrade-key="${config.key}"
          data-upgrade-mode="max"
          data-currency="${currency}"
          ${maxPurchase.levels > 0 ? "" : "disabled"}
        >
          최대 강화
        </button>
      </div>
    </article>
  `;
}

function renderRelicPanel() {
  if (!dom.relicList) {
    return;
  }

  const discoveredCount = getDiscoveredRelicCount(state);
  const totalLevels = getTotalRelicLevels(state);
  const forgeReady = state.player.gunShards >= 100;

  dom.relicForgeStatus.textContent = `총기 조각 ${formatCompact(state.player.gunShards)} / 100`;
  dom.relicCollectionSummary.textContent = `${discoveredCount}종 / 총 레벨 ${formatCompact(totalLevels)}`;
  dom.forgeRelicButton.disabled = !forgeReady;

  const markup = RELIC_CATALOG.map((relic) => {
    const level = state.player.relics[relic.id] ?? 0;
    const discovered = level > 0;
    return `
      <article class="upgrade-card relic-card ${discovered ? "is-owned" : "is-locked"}">
        <header>
          <h4>${relic.name}</h4>
          <span class="badge">${discovered ? `Lv.${level}` : "미발견"}</span>
        </header>
        <div class="upgrade-meta">
          <div>${relic.category}</div>
          <div class="muted">${relic.description}</div>
          <div class="stat-line"><span>현재 효과</span><strong>${discovered ? formatRelicEffect(relic, level) : "획득 필요"}</strong></div>
        </div>
      </article>
    `;
  }).join("");

  if (renderCache.relics !== markup) {
    renderCache.relics = markup;
    dom.relicList.innerHTML = markup;
  }
}

function forgeRelic() {
  if (state.player.gunShards < 100) {
    addLog(state, "유물 생성 실패. 총기 조각이 100개 필요합니다.");
    return;
  }

  state.player.gunShards -= 100;
  const relic = RELIC_CATALOG[Math.floor(Math.random() * RELIC_CATALOG.length)];
  const previousLevel = state.player.relics[relic.id] ?? 0;
  state.player.relics[relic.id] = previousLevel + 1;

  addLog(
    state,
    previousLevel > 0
      ? `유물 중복 획득: ${relic.name} Lv.${state.player.relics[relic.id]}`
      : `새 유물 획득: ${relic.name} Lv.1`
  );

  saveGame(true);
}

function renderLogs() {
  if (state.logs.length === 0) {
    const emptyMarkup = `<div class="empty-log">아직 기록된 전투 이벤트가 없습니다.</div>`;
    if (renderCache.logs !== emptyMarkup) {
      renderCache.logs = emptyMarkup;
      dom.battleLog.innerHTML = emptyMarkup;
    }
    return;
  }

  const markup = state.logs
    .slice(0, 8)
    .map(
      (entry) => `
        <article class="log-entry">
          <time>${entry.time}</time>
          <div>${entry.text}</div>
        </article>
      `
    )
    .join("");

  if (renderCache.logs !== markup) {
    renderCache.logs = markup;
    dom.battleLog.innerHTML = markup;
  }
}

function handleDetailTabClick(event) {
  const button = event.target.closest("button[data-tab]");
  if (!button) {
    return;
  }

  activeDetailTab = button.dataset.tab;
  renderDetailTabs();
}

function renderDetailTabs() {
  const tabButtons = dom.detailTabs.querySelectorAll("button[data-tab]");
  const hasPendingDrops = getPendingDropCount(state) > 0;
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === activeDetailTab);
  });

  dom.detailPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.panel !== activeDetailTab);
  });

  dom.loadoutTabButton.classList.toggle(
    "has-alert",
    hasPendingDrops && activeDetailTab !== "loadout"
  );
  dom.loadoutTabAlert.classList.toggle(
    "hidden",
    !hasPendingDrops || activeDetailTab === "loadout"
  );
}

function renderLoadoutWorkbench() {
  const queuedCount = getPendingDropCount(state);

  if (!state.activeDrop) {
    const emptyKey = "empty";
    dom.dropQueueCount.textContent = "드랍된 아이템 없음";
    dom.dropEmptyState.classList.remove("hidden");
    dom.dropGunCard.classList.add("hidden");
    dom.dropChoices.classList.add("hidden");
    dom.dropActionBar.classList.add("hidden");
    dom.dropGunCard.style.cssText = "";
    if (dom.recommendedDropButton) {
      dom.recommendedDropButton.disabled = true;
      dom.recommendedDropButton.textContent = "추천 슬롯에 장착";
    }
    if (dom.autoEquipDropsButton) {
      dom.autoEquipDropsButton.disabled = true;
      dom.autoEquipDropsButton.textContent = "자동 장착";
    }

    if (renderCache.dropWorkbench !== emptyKey) {
      renderCache.dropWorkbench = emptyKey;
      dom.dropGunCard.innerHTML = "";
      dom.dropChoices.innerHTML = "";
    }
    return;
  }

  const gun = GUN_BY_ID[state.activeDrop.gunId];
  const stats = getEffectiveGunStats(state.activeDrop);
  const renderKey = `${getGunInstanceSignature(state.activeDrop)}|${state.activeDrop.stage}|${getLoadoutSignature(state.player.equippedGunIds)}|${queuedCount}`;
  const recommendation = getRecommendedSlotForGun(state.activeDrop);
  const hasPositiveRecommendation = Boolean(recommendation && recommendation.delta > 0);
  const canEquipRecommendation = canUseRecommendedSlot(recommendation);
  const canAutoEquipDrops = queuedCount > 10;
  dom.dropQueueCount.textContent = `대기 ${queuedCount}개`;
  dom.dropEmptyState.classList.add("hidden");
  dom.dropGunCard.classList.remove("hidden");
  dom.dropChoices.classList.remove("hidden");
  dom.dropActionBar.classList.remove("hidden");
  dom.dropGunCard.style.cssText = getRarityCardStyle(state.activeDrop.tier ?? 0);

  if (dom.recommendedDropButton) {
    dom.recommendedDropButton.disabled = !canEquipRecommendation;
    dom.recommendedDropButton.textContent = recommendation
      ? `추천 슬롯 ${recommendation.slotIndex + 1}번에 장착`
      : "추천 슬롯에 장착";
  }
  if (dom.autoEquipDropsButton) {
    dom.autoEquipDropsButton.disabled = !canAutoEquipDrops;
    dom.autoEquipDropsButton.textContent = canAutoEquipDrops
      ? `자동 장착 (${queuedCount})`
      : "자동 장착";
  }

  if (renderCache.dropWorkbench === renderKey) {
    return;
  }

  renderCache.dropWorkbench = renderKey;
  dom.dropGunCard.innerHTML = `
    <header>
      <div class="title-stack">
        <h4>${gun.name}</h4>
        <div class="muted">${gun.family} / ${gun.manufacturer}</div>
      </div>
      <div class="badge-cluster">
        ${buildRarityBadgeMarkup(stats.tier)}
        <span class="badge">${gun.className}</span>
      </div>
    </header>
    <div class="muted">${gun.description}</div>
    <div class="stat-line"><span>등급 보정</span><strong>${stats.tier === 0 ? "기본 수치" : `+${Math.round((stats.rarityMultiplier - 1) * 100)}%`}</strong></div>
    <div class="stat-line"><span>획득 위치</span><strong>스테이지 ${state.activeDrop.stage} 보스</strong></div>
    <div class="stat-line"><span>공격력</span><strong>${formatCompact(stats.damage)}</strong></div>
    <div class="stat-line"><span>공격 속도</span><strong>${stats.attackSpeed.toFixed(1)}</strong></div>
    <div class="stat-line"><span>치확</span><strong>${formatChance(stats.critChance)}</strong></div>
    <div class="stat-line"><span>치뎀</span><strong>+${stats.critMultiplier.toFixed(1)}%</strong></div>
    <div class="stat-line"><span>기대 DPS</span><strong>${formatCompact(stats.dps)}</strong></div>
  `;

  dom.dropChoices.innerHTML = state.player.equippedGunIds
    .map((equippedGun, index) => {
      const gunId = equippedGun?.gunId ?? null;
      const equippedStats = equippedGun ? getEffectiveGunStats(equippedGun) : null;
      const delta = equippedStats ? stats.dps - equippedStats.dps : stats.dps;
      const deltaClass = delta >= 0 ? "good" : "bad";
      const isRecommended = hasPositiveRecommendation && recommendation.slotIndex === index;

      return `
        <article class="drop-choice ${isRecommended ? "recommended" : ""}">
          <header>
            <h4>슬롯 ${index + 1}</h4>
            <span class="badge">${gunId ? GUN_BY_ID[gunId].name : "빈 슬롯"}</span>
          </header>
          <div class="inline-rarity">
            ${equippedGun ? buildRarityBadgeMarkup(equippedGun.tier) : `<span class="badge">빈 슬롯</span>`}
          </div>
          ${isRecommended ? `<div class="inline-rarity"><span class="badge recommend-badge">추천 슬롯</span></div>` : ""}
          <div class="muted">
            ${
              equippedStats
                ? `현재 기대 DPS ${formatCompact(equippedStats.dps)} / 교체 시 <span class="delta ${deltaClass}">${delta >= 0 ? "+" : ""}${formatCompact(delta)}</span>`
                : `비어 있는 슬롯이라 손실 없이 장착 가능합니다.`
            }
          </div>
          <button type="button" class="primary-button" data-slot-index="${index}">
            슬롯 ${index + 1}에 장착
          </button>
        </article>
      `;
    })
    .join("");
}

function addLog(gameState, text) {
  const timestamp = new Date().toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  gameState.logs.unshift({
    time: timestamp,
    text
  });

  if (gameState.logs.length > LOG_LIMIT) {
    gameState.logs.length = LOG_LIMIT;
  }
}

function normalizeRelicCollection(value) {
  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.entries(value).reduce((result, [relicId, level]) => {
    if (!RELIC_BY_ID[relicId]) {
      return result;
    }

    const normalizedLevel = Math.max(0, Math.round(Number(level) || 0));
    if (normalizedLevel > 0) {
      result[relicId] = normalizedLevel;
    }
    return result;
  }, {});
}

function getDiscoveredRelicCount(gameState) {
  return Object.values(gameState.player.relics).filter((level) => level > 0).length;
}

function getTotalRelicLevels(gameState) {
  return Object.values(gameState.player.relics).reduce((sum, level) => sum + level, 0);
}

function getRelicEffectTotal(gameState, effectKey) {
  return Object.entries(gameState.player.relics).reduce((sum, [relicId, level]) => {
    const relic = RELIC_BY_ID[relicId];
    if (!relic || relic.effectKey !== effectKey) {
      return sum;
    }
    return sum + relic.effectValue * level;
  }, 0);
}

function getTrophyRewardMultiplier(gameState) {
  return (
    1 +
    gameState.player.permanentUpgrades.trophyGain * 0.05 +
    getRelicEffectTotal(gameState, "trophyGainMultiplier")
  );
}

function getStoneRewardMultiplier(gameState) {
  return 1 + getRelicEffectTotal(gameState, "stoneGainMultiplier");
}

function getBossDropChance(gameState) {
  return clamp(0.2 + getRelicEffectTotal(gameState, "bossDropChanceFlat"), 0, 0.95);
}

function getGunShardYield(gunRef) {
  const gun = normalizeGunInstance(gunRef);
  return gun ? 1 + gun.tier : 0;
}

function getEquippedGunShardTotal(gameState, includeStarter = false) {
  return gameState.player.equippedGunIds.reduce((sum, gunRef) => {
    const gun = normalizeGunInstance(gunRef);
    if (!gun) {
      return sum;
    }

    if (!includeStarter && gun.gunId === "basic-pistol") {
      return sum;
    }

    return sum + getGunShardYield(gun);
  }, 0);
}

function grantGunShardsFromGun(gunRef) {
  const shardGain = getGunShardYield(gunRef);
  state.player.gunShards += shardGain;
  return shardGain;
}

function formatRelicEffect(relic, level) {
  const totalValue = relic.effectValue * level;
  switch (relic.effectKey) {
    case "stoneGainMultiplier":
    case "trophyGainMultiplier":
    case "gunDamageMultiplier":
    case "hpMultiplier":
      return `+${(totalValue * 100).toFixed(1).replace(/\.0$/, "")}%`;
    case "attackSpeedReduction":
      return `공속 스탯 -${(totalValue * 100).toFixed(1).replace(/\.0$/, "")}%`;
    case "critChanceFlat":
      return `치확 +${formatChance(totalValue)}`;
    case "critDamageFlat":
      return `치피 +${totalValue.toFixed(0)}%`;
    case "bossDropChanceFlat":
      return `보스 드랍 +${(totalValue * 100).toFixed(1).replace(/\.0$/, "")}%p`;
    default:
      return `${totalValue}`;
  }
}

function createGunInstance(gunId, tier = 0) {
  if (!GUN_BY_ID[gunId]) {
    return null;
  }

  return {
    gunId,
    tier: clamp(Math.round(Number(tier) || 0), 0, GUN_RARITY_TIERS.length - 1)
  };
}

function normalizeGunInstance(value) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string") {
    return createGunInstance(value, 0);
  }

  if (typeof value === "object") {
    return createGunInstance(value.gunId, value.tier ?? 0);
  }

  return null;
}

function normalizeDropEntry(entry) {
  const normalizedGun = normalizeGunInstance(entry);
  if (!normalizedGun) {
    return null;
  }

  return {
    ...normalizedGun,
    stage: Math.max(1, Math.round(Number(entry?.stage) || 1)),
    obtainedAt: typeof entry?.obtainedAt === "number" ? entry.obtainedAt : Date.now()
  };
}

function getGunRarityMeta(tier) {
  return GUN_RARITY_BY_TIER[clamp(Math.round(Number(tier) || 0), 0, GUN_RARITY_TIERS.length - 1)] ?? GUN_RARITY_TIERS[0];
}

function getGunRarityMultiplier(tier) {
  return 1 + getGunRarityMeta(tier).tier * 0.1;
}

function getPendingDropCount(gameState) {
  return gameState.pendingDrops.length + (gameState.activeDrop ? 1 : 0);
}

function getGunInstanceSignature(gunRef) {
  const gun = normalizeGunInstance(gunRef);
  return gun ? `${gun.gunId}@${gun.tier}` : "empty";
}

function getLoadoutSignature(loadout) {
  return loadout.map((gunRef) => getGunInstanceSignature(gunRef)).join(",");
}

function getGunLogLabel(gunRef) {
  const gun = normalizeGunInstance(gunRef);
  if (!gun) {
    return "빈 슬롯";
  }

  const baseGun = GUN_BY_ID[gun.gunId];
  const rarity = getGunRarityMeta(gun.tier);
  return `[${rarity.shortLabel}] ${baseGun.name}`;
}

function buildRarityBadgeMarkup(tier) {
  const rarity = getGunRarityMeta(tier);
  return `<span class="badge rarity-badge" style="color: ${rarity.color}; border-color: ${rarity.borderColor}; background: ${rarity.background};">${rarity.shortLabel} ${rarity.name}</span>`;
}

function getRarityCardStyle(tier) {
  const rarity = getGunRarityMeta(tier);
  return `border-color: ${rarity.borderColor}; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 18px 28px ${rarity.glow};`;
}

function rollWeightedChoice(items, weightKey) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const totalWeight = items.reduce(
    (sum, item) => sum + Math.max(0, Number(item?.[weightKey]) || 0),
    0
  );
  if (totalWeight <= 0) {
    return items[items.length - 1] ?? null;
  }

  let roll = Math.random() * totalWeight;
  for (const item of items) {
    roll -= Math.max(0, Number(item?.[weightKey]) || 0);
    if (roll <= 0) {
      return item;
    }
  }

  return items[items.length - 1];
}

function getEnemyGlyph(enemyType) {
  if (enemyType === "boss") {
    return "BOSS";
  }
  if (enemyType === "miniboss") {
    return "ELITE";
  }
  return "ENEMY";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatChance(value) {
  return `${(value / 100).toFixed(value >= 1000 ? 1 : 2)}%`;
}

function formatRatePercent(value) {
  return `${(value * 100).toFixed(value >= 0.1 ? 1 : 2).replace(/\.?0+$/, "")}%`;
}

function formatCompact(value) {
  const sign = value < 0 ? "-" : "";
  let absolute = Math.abs(value);

  if (absolute < 1000) {
    if (absolute >= 100 || Number.isInteger(absolute)) {
      return `${sign}${Math.round(absolute)}`;
    }
    return `${sign}${absolute.toFixed(2).replace(/\.?0+$/, "")}`;
  }

  let suffixIndex = 0;
  while (absolute >= 1000) {
    absolute /= 1000;
    suffixIndex += 1;
  }

  let rounded = Number(absolute.toFixed(2));
  if (rounded >= 1000) {
    rounded /= 1000;
    suffixIndex += 1;
  }

  return `${sign}${rounded.toFixed(2).replace(/\.?0+$/, "")}${buildAlphabetSuffix(suffixIndex)}`;
}

function buildAlphabetSuffix(index) {
  let value = index;
  let result = "";

  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }

  return result;
}
