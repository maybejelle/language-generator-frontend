<template>
  <div class="exampleButtons">
    <MultipurposeButton
      buttonType="left"
      :toggleable="true"
      :onClick="handleLeftButton"
    >
      Left
    </MultipurposeButton>

    <MultipurposeButton
      buttonType="middle"
      :onClick="handleMiddleButton"
    >
      Middle
    </MultipurposeButton>

    <MultipurposeButton
      buttonType="right"
      :toggleable="true"
      :onClick="handleRightButton"
    >
      Right
    </MultipurposeButton>

    <MultipurposeButton
      buttonType="single"
      :onClick="handleSingleButton"
      >
      Single
    </MultipurposeButton>
  </div>

  <div class="exampleSliders">
    <!-- Using the slider with an array of values -->
    <MultipurposeSlider
      title="Proficiency Levels"
      :values="['A1', 'A2', 'B1', 'B2', 'C1', 'C2']"
      @input="handleSliderInput"
    />

    <!-- Using the slider with a range -->
    <MultipurposeSlider
      title="Maximum words"
      :min="0"
      :max="100"
      @input="handleSliderInput"
    />
  </div>

  <div class="exampleTextfields">
    <TextField
      placeholder="Enter your message here"/>
      <MultipurposeButton
      buttonType="left"
      :onClick="copyText">Copy</MultipurposeButton>
      <MultipurposeButton
      buttonType="right"
      :onClick="paste">Paste</MultipurposeButton>
    <TextField
      ref="textArea"
      :isLongField="true"/>
  </div>
</template>

<script>
import MultipurposeButton from './MultipurposeButton.vue';
import MultipurposeSlider from './MultipurposeSlider.vue';
import TextField from './TextField.vue';

export default {
  components: {
    MultipurposeButton,
    MultipurposeSlider,
    TextField
  },
  methods: {
    handleLeftButton(isActive) {
      console.log('Left button clicked, active:', isActive);
    },
    handleMiddleButton() {
      console.log('Middle button clicked');
    },
    handleRightButton(isActive) {
      console.log('Right button clicked, active:', isActive);
    },
    handleSingleButton() {
      console.log('Single button clicked')
    },
    handleSliderInput(value) {
      console.log('Slider value:', value); // Handle the slider value here
    },
    copyText() {
      const text = this.$refs.textArea.$el.value;
      navigator.clipboard.writeText(text);
      console.log('Text copied');
    },
    paste() {
      navigator.clipboard.readText().then((text) => {
        this.$refs.textArea.$el.value = text;
      });
      console.log('Text pasted');
    },
  },
};
</script>

<style scoped>
.exampleSliders {
  width: 75%; /* Set the width to 75% of the screen */
  margin: 0 auto; /* Center the slider on the page */
  display: flex;
  flex-direction: column;
  align-items: center; /* Ensure sliders are centered within the container */
}
</style>