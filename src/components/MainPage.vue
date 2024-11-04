<template>


    <h1>Language Level Generator</h1>
    <div class="wrapper">
        <div class="evaluateTab" v-if="showEvaluate">
            <img src="../assets/barometer.webp" alt="barometer" title="language level meter">
            <TextField readonly title="feedback" is-long-field="true" />
        </div>
        <div class="generateTab" v-if="showGenerate">
            <div>
                <MultipurposeButton button-type="left">Generate</MultipurposeButton>
                <MultipurposeButton button-type="right">Regenerate</MultipurposeButton>
            </div>
            <MultipurposeSlider title="word length range" min="0" max="255"></MultipurposeSlider>

            <MultipurposeSlider title="Proficiency Levels" :values="['A1', 'A2', 'B1', 'B2', 'C1', 'C2']" />

            <select>
                <option value="french">French</option>
                <option value="english">English</option>
                <option value="dutch">Dutch</option>
            </select>

            <TextField title="Subject"></TextField>

            <TextField title="additional parameters" description="e.g 'past tense, informal' "></TextField>

            <TextField title="sources" is-long-field="true" readonly description="source list, if applicable">
            </TextField>
        </div>
        <div class="textEditorField">
            <div class="mainActionButtons">
                <div>
                    <MultipurposeButton button-type="left" :onclick="clearText">Undo</MultipurposeButton>
                    <MultipurposeButton button-type="right">Redo</MultipurposeButton>
                </div>
                <div class="coreActionButtons">
                    <MultipurposeButton button-type="left" :toggleable="true" :isActiveProp="showEvaluate" @click="showEvaluateTab">Evaluate
                    </MultipurposeButton>
                    <MultipurposeButton button-type="middle" :toggleable="false" @click="displayTextOnly">Text Only
                    </MultipurposeButton>
                    <MultipurposeButton button-type="right" :toggleable="true" :isActiveProp="showGenerate" @click="showGenerateTab">Generate
                    </MultipurposeButton>

                </div>
                <div>
                    <MultipurposeButton button-type="left" :onclick="copyText">Copy</MultipurposeButton>
                    <MultipurposeButton button-type="right" :onclick="pasteText">Paste</MultipurposeButton>
                </div>
            </div>
            <TextField ref="textArea" :is-long-field="true"></TextField>
        </div>
    </div>


</template>


<script>
import MultipurposeButton from './MultipurposeButton.vue';
import MultipurposeSlider from './MultipurposeSlider.vue';
import TextField from './TextField.vue';

export default {
    components: {
        TextField,
        MultipurposeButton,
        MultipurposeSlider
    },
    data() {
        return {
            showEvaluate: false,
            showGenerate: false,
        };
    },
    methods: {
        copyText() {
            console.log('Text copied');
            const text = this.$refs.textArea.$refs.textArea.value;
            navigator.clipboard.writeText(text);
        },
        pasteText() {
            console.log('Text pasted');
            navigator.clipboard.readText().then((text) => {
                this.$refs.textArea.$refs.textArea.value = text;
            });
        },
        displayTextOnly() {
            console.log('Display text only');
            this.showEvaluate = false;
            this.showGenerate = false;
        },
        showGenerateTab() {
            console.log('Show generate tab');
            this.showGenerate = !this.showGenerate;
        },
        showEvaluateTab() {
            console.log('Show evaluate tab');
            this.showEvaluate = !this.showEvaluate;
        }
    }

}

</script>


<style scoped>
h1 {
    border-bottom: 1px solid black;
    margin: 0;
    padding: 1rem;
}

.wrapper {
    display: flex;
    height: 100%;

}


img {
    width: 100%
}

.hidden {
    display: none;
}

.evaluateTab {
    border-right: solid 1px black;
    width: 30rem;
    padding: 1rem;
}

.generateTab {
    border-right: solid 1px black;
    width: 30rem;
    padding: 1rem;
}

.textEditorField {
    width: 100%;
    padding: 1rem;
}

.mainActionButtons {
    display: flex;
    justify-content: space-between;
}

.coreActionButtons button {
    padding: 1rem 5rem 1rem 5rem;
}

select {
    width: 100%;
    padding: 1rem;
}
</style>