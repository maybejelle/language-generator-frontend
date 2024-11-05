<template>
  <div class="slider-container">
    <!-- Display the title at the top center -->
    <div v-if="title" class="slider-title">{{ title }}</div>

    <!-- Display set values or range above the slider -->
    <div v-if="isArray" class="slider-values">
      <span v-for="(value, index) in values" :key="index" class="slider-value">
        {{ value }}
      </span>
    </div>
    <div v-else class="slider-range">
      <span>{{ min }}</span>
      <span>{{ max }}</span>
    </div>

    <!-- Slider input -->
    <div class="slider-wrapper">
      <input type="range" :min="isArray ? 0 : min" :max="isArray ? values.length - 1 : max" :step="1"
        v-model="currentIndex" @input="handleInput" class="slider" />

      <!-- Display the current value as a floating textbox below the slider handle -->
      <div class="current-value" :style="currentValueStyle">
        {{ displayedValue }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      default: null, // Can be an array of values
    },
    min: {
      type: Number,
      default: 0, // Starting number for range sliders
    },
    max: {
      type: Number,
      default: 100, // Ending number for range sliders
    },
    title: {
      type: String,
      default: '', // Title to be displayed at the top of the slider
    },
    value: {
      type: [Number, String], // Accepts a number or string depending on array or range slider
      default: 0, // Default value for the slider position
    }
  },

  data() {
    return {
      currentIndex: this.value, // Sync `currentIndex` with `value`
    };
  },
  watch: {
    value(newVal) {
      this.currentIndex = newVal; // Update `currentIndex` if `value` changes
    }
  },
  computed: {
    isArray() {
      return Array.isArray(this.values); // Determines if values is an array or range
    },
    displayedValue() {
      return this.isArray ? this.values[this.currentIndex] : this.currentIndex; // Display either array value or integer
    },
    currentValueStyle() {
      const percentage = this.isArray
        ? (this.currentIndex / (this.values.length - 1)) * 100
        : ((this.currentIndex - this.min) / (this.max - this.min)) * 100;

      return {
        left: `calc(${percentage}% - 20px)` // Dynamically position the value below the slider handle
      };
    }
  },
  methods: {
    handleInput() {
      const value = this.isArray ? this.values[this.currentIndex] : this.currentIndex;
      this.$emit('input', value); // Emit the current value to the parent component
    },
  },
};
</script>

<style scoped>
.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem 0rem 3rem 0rem;
  position: relative;
}

.slider-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.slider-values {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  color: #666;
}

.slider-range {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  color: #666;
}

.slider-wrapper {
  position: relative;
  width: 100%;
}

.slider {
  width: 100%;
  -webkit-appearance: none;
  /* Remove default appearance */
  appearance: none;
  /* Remove default appearance */
  height: 6px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  /* Remove default thumb */
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: #3498db;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background-color: #3498db;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

/* Position the current value display below the slider */
.current-value {
  position: absolute;
  top: 35px;
  /* Adjusted to place the value display below the slider */
  font-size: 14px;
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border-radius: 5px;
  transition: left 0.3s ease;
  /* Smooth transition when slider moves */
  white-space: nowrap;
  pointer-events: none;
  /* Prevent it from interfering with slider events */
}
</style>