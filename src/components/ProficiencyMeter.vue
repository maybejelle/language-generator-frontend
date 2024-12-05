<template>
    <div class="image-display">
        <img :src="imageSrc" alt="Displayed" v-if="imageSrc" />
        <p v-else>Image not found</p>
    </div>
</template>

<script>
export default {
    name: 'ProficiencyMeter',
    props: {
        selectedImage: {
            type: String,
            required: true,
        },
    },
    computed: {
        imageSrc() {
            // Define a mapping of strings to image paths
            const images = {
                'A1': 'assets/img/barometer/A1.jpg',
                'A2': 'assets/img/barometer/A2.jpg',
                'B1': 'assets/img/barometer/B1.jpg',
                'B2': 'assets/img/barometer/B2.jpg',
                'C1': 'assets/img/barometer/C1.jpg',
                'C2': 'assets/img/barometer/C2.jpg',
                'NONE': 'assets/img/barometer/NONE.jpg',
            };
            // Return the image source based on the prop, or null if not found
            return images[this.selectedImage] || null;
        },
    },
};
</script>

<style scoped>
.image-display img {
    width: 100%;
    height: auto;
}
</style>