<template>
    <h2>{{title}}</h2>
    <p>{{description}}</p>
    <textarea :class="['text-field', { isLongField: isLongField, readonly: readonly}]" :readonly="readonly" :placeholder="placeholder"></textarea>
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
};


</script>

<style scoped>
textarea.isLongField {
    width: 100%;
    display: block;
    resize: vertical;
}

h2{
    font-size: 1rem;
    color: #333;
    text-align: left;
}

p {
    font-size: 0.8rem;
    text-align: left;
    font-size: 1rem;
    color: lightslategray;
}



.readonly {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

textarea  {
    width: 100%;
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