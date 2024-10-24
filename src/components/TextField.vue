<template>
    <textarea :class="['text-field', { isLongField: isLongField }]" :placeholder="placeholder"></textarea>
</template>

<script>

export default {
    props: {
        isLongField: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
    },
};


</script>

<style scoped>
textarea.isLongField {
    width: 50%;
    height: 20rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    box-sizing: border-box;
    margin-top: 1rem;
    display: block;
    resize: vertical;
}

textarea {
    width: 20%;
    padding: 5px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    margin-top: 10px;
    resize: none;
    display: block;

}
</style>