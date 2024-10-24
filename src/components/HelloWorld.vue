<template>
  <div>
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
      :values="['A1', 'A2', 'B1', 'B2', 'C1', 'C2']"
      @input="handleSliderInput"
    />

    <!-- Using the slider with a range -->
    <MultipurposeSlider
      :min="0"
      :max="100"
      @input="handleSliderInput"
    />
  </div>


</template>

<script>
import MultipurposeButton from './MultipurposeButton.vue';
import MultipurposeSlider from './MultipurposeSlider.vue';

export default {
  components: {
    MultipurposeButton,
    MultipurposeSlider
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