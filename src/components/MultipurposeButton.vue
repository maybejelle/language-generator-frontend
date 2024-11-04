<template>
  <button
    :class="['button', buttonType, { active: isActiveProp, pulse: pulseEffect }]"
    @click="handleClick"
    @animationend="resetPulse"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    buttonType: {
      type: String,
      default: 'single',
      validator(value) {
        return ['left', 'middle', 'right', 'single'].includes(value);
      },
    },
    toggleable: {
      type: Boolean,
      default: false,
    },
    isActiveProp: { // New prop to control active state
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      pulseEffect: false,
    };
  },
  methods: {
    handleClick() {
      if (this.toggleable) {
        if (this.onClick) {
          this.onClick(!this.isActiveProp);
        }
      } else {
        this.pulseEffect = true;
        if (this.onClick) {
          this.onClick();
        }
      }
    },
    resetPulse() {
      this.pulseEffect = false;
    },
  },
};
</script>
  
  <style scoped>
  .button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  /* Hover color */
  .button:hover {
    background-color: #f39c12; /* Example hover color */
    color: #fff;
  }
  
  /* Different button styles */
  .button.left {
    border-radius: 10px 0 0 10px;
  }
  
  .button.middle {
    border-radius: 0;
  }
  
  .button.right {
    border-radius: 0 10px 10px 0;
  }
  
  .button.single {
    border-radius: 10px;
  }
  
  /* Active state for toggleable buttons */
  .button.active {
    background-color: #3498db;
    color: #fff;
  }
  
  /* Pulse animation for non-toggleable buttons */
  @keyframes pulse {
    0% {
      background-color: #f39c12; /* Starting color */
    }
    50% {
      background-color: #f1c40f; /* Middle color */
    }
    100% {
      background-color: #f39c12; /* End color */
    }
  }
  
  .button.pulse {
    animation: pulse 0.4s ease;
  }
  </style>
  