<template>
  <div class="barometer">
    <svg viewBox="0 -5 200 100" class="barometer-svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color: red; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: green; stop-opacity: 1" />
        </linearGradient>
      </defs>

      
      <path d="M10 90 A90 90 0 0 1 190 90" fill="none" stroke="url(#gradient)" stroke-width="10" />

      
      <line x1="100" y1="90" x2="100" y2="10" stroke="black" stroke-width="4" stroke-linecap="round"
        :style="{ transform: `rotate(${needleRotation}deg)`, transformOrigin: '100px 90px' }" />
      
      <circle cx="100" cy="90" r="5" fill="black" />
    </svg>

    
    <div class="value-display">
      <span>{{ proficiencyLevel }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proficiencyLevel: {
      type: String,
      required: true,
    },
  },
  computed: {
    needleRotation() {
      return -90 + this.value * 1.8;
    },
    value() {
      const levelMap = {
        A1: 8.33,
        A2: 24.99,
        B1: 41.32,
        B2: 57.65,
        C1: 73.98,
        C2: 90.31,
      };
      return levelMap[this.proficiencyLevel] || 0;
    },
  },
};
</script>

<style scoped>
.barometer {
  text-align: center;
  margin-top: 50px;
}

.barometer-svg {
  width: 300px;
  height: 150px;
}

.value-display {
  font-size: 1.5rem;
  margin: 10px 0;
}

line {
  transition: transform 1s ease-in-out;
}
</style>
