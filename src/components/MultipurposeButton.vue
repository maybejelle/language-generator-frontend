<template>
  <button
    :class="['button', buttonType, { active: isActiveProp, pulse: pulseEffect }]"
    @click="handleClick"
    @animationend="resetPulse"
    @mouseover="showButtonDescription"
    @mousemove="updateMousePosition"
    @mouseleave="displayTooltip = false"
  >
    <slot></slot>
  </button>

  <div v-if="displayTooltip" class="tooltip" :style="{ top: `${mousePosition.y}px`, left: `${mousePosition.x + 30}px` }">
    <p>{{description}}</p>
  </div>
</template>

<script>
import { reactive } from 'vue';

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
    value:{
      type: String,
      default: '',
    }
  },
  data() {
    return {
      pulseEffect: false,
      displayTooltip: false,
      description: "",
      mousePosition: reactive({ x: 0, y: 0 }),
    };
  },
  mounted() {
    switch(this.value){
      case "generate":
        this.description = "Generate a new text based on the selected options";
        break;
      case "copy":
        this.description = "Copy the generated text to the clipboard";
        break;
      case "paste":
        this.description = "Paste text from the clipboard";
        break;
      case "regenerate":
        this.description = "Regenerate the given text, with the options below";
        break;
      case "undo":
        this.description = "Undo the last action";
        break;
      case "redo":
        this.description = "Redo the last action";
        break;
      case "evaluate":
        this.description = "Evaluate the given text";
        break;
      case "generateTab":
        this.description = "open/close the generate tab";
        break;
      default:
        this.description = "";
    }
  },
  methods: {
    updateMousePosition(event) {
      this.mousePosition.x = event.clientX;
      this.mousePosition.y = event.clientY;
    },
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
    showButtonDescription() {
      if(this.description === "") return
      this.displayTooltip = true;

    },
  },
};
</script>
  
  <style scoped>
  .button {
    padding: 1rem 2rem;
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
    display: block;
    width: 100%;
    margin: 0.5rem 0;

  }
  
  /* Active state for toggleable buttons */
  .button.active {
    background-color: #3498db;
    color: #fff;
  }

  .tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.875rem;
  max-width: 200px;
  word-wrap: break-word;
  z-index: 10;
  top: 50%;
  left: 50%;
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
  