<template>
    <button
      :class="['button', buttonType, { active: isActive, pulse: pulseEffect }]"
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
        default: 'single', // added 'single' type
        validator(value) {
          return ['left', 'middle', 'right', 'single'].includes(value);
        },
      },
      toggleable: {
        type: Boolean,
        default: false, // If the button is toggleable or not
      },
      onClick: {
        type: Function,
        default: null, // Function to call on click
      },
    },
    data() {
      return {
        isActive: false, // Tracks toggle state
        pulseEffect: false, // Tracks background pulse effect
      };
    },
    methods: {
      handleClick() {
        if (this.toggleable) {
          this.isActive = !this.isActive; // Toggle state
          if (this.onClick) {
            this.onClick(this.isActive); // Return boolean state
          }
        } else {
          this.pulseEffect = true; // Trigger pulse effect for non-toggleable buttons
          if (this.onClick) {
            this.onClick(); // Call function without toggle
          }
        }
      },
      resetPulse() {
        // Remove the pulse effect once the animation completes
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
  