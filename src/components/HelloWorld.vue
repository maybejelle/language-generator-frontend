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
</template>

<script>
import MultipurposeButton from './MultipurposeButton.vue';

export default {
  components: {
    MultipurposeButton,
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
    }
  },
};
</script>
