<template>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <textarea
        ref="textArea"
        :class="['text-field', { isLongField: isLongField, readonly: readonly }]"
        :readonly="readonly"
        :placeholder="placeholder"
        :value="modelValue"              
        @input="onInput"                 
    ></textarea>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        isLongField: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
    },
    methods: {
        onInput(event) {
            this.$emit('update:modelValue', event.target.value);
        },
    },
};
</script>

<style scoped>
textarea.isLongField {
    width: 100%;
    height: 10rem;
    display: block;
    resize: vertical;
}

h2 {
    font-size: 1rem;
    color: #333;
    text-align: left;
}

p {
    font-size: 0.8rem;
    text-align: left;
    color: lightslategray;
}

.readonly {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

textarea {
    width: 100%;
    padding: 5px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    resize: none;
    display: block;
}
</style>
