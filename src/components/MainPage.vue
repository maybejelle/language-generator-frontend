<template>

    <div class="header">
        <h1>Language Level Generator</h1>
        <select>
            <option value="claude">Claude</option>
            <option value="openai">OpenAI</option>
            <option value="gpt3">GPT-3</option>
        </select>
    </div>
    <div class="wrapper">
        <Transition>
            <div class="evaluateTab" v-if="showEvaluate">
                <img src="../assets/barometer.webp" alt="barometer" title="language level meter">
                <TextField readonly title="feedback" is-long-field="true" />
            </div>
        </Transition>
        <Transition>
            <div class="generateTab" v-if="showGenerate">
                <div>
                    <MultipurposeButton button-type="left" @click="generateNewText">Generate</MultipurposeButton>
                    <MultipurposeButton button-type="right" @click="regenerateText">Regenerate</MultipurposeButton>
                </div>

                <MultipurposeSlider v-model="maxWordLengthValue" @update="$event => (maxWordLengthValue = $event)"
                    title="word length range" min="100" max="500"></MultipurposeSlider>
                <MultipurposeSlider v-model="proficiencyLevelValue" @update="$event => (proficiencyLevelValue = $event)"
                    title="Proficiency Levels" :values="['A1', 'A2', 'B1', 'B2', 'C1', 'C2']" />

                <select v-model="selectedLanguage">
                    <option value="french">French</option>
                    <option value="english">English</option>
                    <option value="dutch">Dutch</option>
                </select>

                <TextField v-model="subjectTextValue" title="Subject"></TextField>

                <TextField v-model="additionalParamsTextValue" title="additional parameters"
                    description="e.g 'past tense, informal' "></TextField>

                <TextField title="sources" is-long-field="true" readonly description="source list, if applicable">
                </TextField>
            </div>
        </Transition>
        <div class="textEditorField">
            <div class="mainActionButtons">
                <div>
                    <MultipurposeButton button-type="left" :onclick="clearText">Undo</MultipurposeButton>
                    <MultipurposeButton button-type="right">Redo</MultipurposeButton>
                </div>
                <div class="coreActionButtons">
                    <MultipurposeButton button-type="left" :toggleable="true" :isActiveProp="showEvaluate"
                        @click="showEvaluateTab">Evaluate
                    </MultipurposeButton>
                    <MultipurposeButton button-type="middle" :toggleable="false" @click="displayTextOnly">Text Only
                    </MultipurposeButton>
                    <MultipurposeButton button-type="right" :toggleable="true" :isActiveProp="showGenerate"
                        @click="showGenerateTab">Generate
                    </MultipurposeButton>

                </div>
                <div>
                    <MultipurposeButton button-type="left" :onclick="copyText">Copy</MultipurposeButton>
                    <MultipurposeButton button-type="right" :onclick="pasteText">Paste</MultipurposeButton>
                </div>
            </div>
            <TextField ref="textArea" v-model="mainTextValue" :is-long-field="true"></TextField>
            <div class="details">
                <p>word count : {{ responseWordCount }}</p>
                <p>Tokens : {{ inputTokens }} / {{ outputTokens }}</p>
            </div>
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
            responseWordCount: 0,
            inputTokens: 0,
            outputTokens: 0,
            selectedLanguage: 'english',
            maxWordLengthValue: 100,
            proficiencyLevelValue: 'A1',
            subjectTextValue: 'Random subject',
            additionalParamsTextValue: 'N/A',
            mainTextValue: 'lorem ipsum',
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
        },
        async generateNewText() {
            console.log('Generating new text');
            const prompt = "Generate a new text, based on the following parameters. ONLY OUTPUT THE TEXT, NO OTHER CONTEXT";

            // Gather data to send in the request
            const maxWordsLength = this.maxWordLengthValue;
            const proficiencyLevel = this.proficiencyLevelValue;
            const language = this.selectedLanguage;
            const subject = this.subjectTextValue;
            const additionalParams = this.additionalParamsTextValue;

            // STORE CURRENT TEXT IN LOCAL STORAGE

            try {
                const response = await fetch('http://localhost:3000/api/anthropic/claude', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt,
                        maxWordsLength,
                        proficiencyLevel,
                        language,
                        subject,
                        additionalParams
                    })
                });

                const data = await response.json();
                console.log(data);
                this.inputTokens = data.usage.input_tokens;
                this.outputTokens = data.usage.output_tokens;
                this.responseWordCount = data.content && data.content[0].text
                    ? data.content[0].text.split(' ').length
                    : 0;
                this.mainTextValue = data.content && data.content[0].text
                    ? data.content[0].text
                    : 'No response text available';

            } catch (error) {
                console.error('Error calling proxy server:', error);
                this.responseText = 'Error calling API';
            }
        },
        async regenerateText() {
            console.log('Regenerating text');
            const prompt = "Tweak the main text slightly, based on the following parameters. Adjust or generate words, grammar or language wherever neccesary to match the parameters as best as possible. ONLY OUTPUT THE TEXT, NO OTHER CONTEXT";

            // Gather data to send in the request
            const maxWordsLength = this.maxWordLengthValue;
            const proficiencyLevel = this.proficiencyLevelValue;
            const language = this.selectedLanguage;
            const additionalParams = this.additionalParamsTextValue;
            const mainText = this.mainTextValue;

            // STORE CURRENT TEXT IN LOCAL STORAGE

            try {
                const response = await fetch('http://localhost:3000/api/anthropic/claude', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt,
                        maxWordsLength,
                        proficiencyLevel,
                        language,
                        additionalParams,
                        mainText
                    })
                });

                const data = await response.json();
                this.mainTextValue = data.content && data.content[0].text
                    ? data.content[0].text
                    : 'No response text available';

            } catch (error) {
                console.error('Error calling proxy server:', error);
                this.responseText = 'Error calling API';
            }
        },
    }

}

</script>


<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid black;
}

.header select {
    width: 20rem;
}

h1 {

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


select {
    width: 100%;
    padding: 1rem;
}

.details {
    display: flex;
    justify-content: space-between;
    color: grey;
    font-size: 0.8rem;
}

.v-enter-active,
.v-leave-active {
    transition: width 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    width: 0;
    opacity: 0;
}
</style>