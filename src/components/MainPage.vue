<template>

    <div class="header">
        <h1>Language Level Generator</h1>
        <select v-model="currentLanguage" @change="changeLanguage">
            <option value="Français">Français</option>
            <option value="English">English</option>
            <option value="Nederlands">Nederlands</option>
        </select>
        <select v-model="currentModel">
            <option value="claude">Claude</option>
            <option value="chatgpt">Chatgpt (gpt-4o-mini)</option>
        </select>
    </div>
    <div class="wrapper">
        <Transition>
            <div class="evaluateTab" v-if="showEvaluate">
                <ProficiencyMeter :selectedImage="evaluatedProficiencyLevel" />
                <TextField readonly :title="$t('feedback')" is-long-field="true" v-model="feedbackValue" />
            </div>
        </Transition>
        <Transition>
            <div class="generateTab" v-if="showGenerate">
                <div>
                    <MultipurposeButton button-type="left" @click="generateNewText">{{ $t('generate') }}
                    </MultipurposeButton>
                    <MultipurposeButton button-type="right" @click="regenerateText">{{ $t('regenerate') }}
                    </MultipurposeButton>
                </div>

                <MultipurposeSlider v-model="maxWordLengthValue" @update="$event => (maxWordLengthValue = $event)"
                    :title="$t('wordlength')" min="100" max="500"></MultipurposeSlider>
                <MultipurposeSlider v-model="proficiencyLevelValue" @update="$event => (proficiencyLevelValue = $event)"
                    :title="$t('proficiencylevels')" :values="['A1', 'A2', 'B1', 'B2', 'C1', 'C2']" />

                <TextField v-model="subjectTextValue" :title="$t('subject')"></TextField>

                <TextField v-model="additionalParamsTextValue" :title="$t('additionalparameters')"
                    :description="$t('additionalparametersinfo')"></TextField>

                <TextField :title="$t('sources')" is-long-field="true" readonly :description="$t('sourcesinfo')">
                </TextField>
            </div>
        </Transition>
        <div class="textEditorField">
            <div class="mainActionButtons">
                <div>
                    <MultipurposeButton button-type="left" :onclick="undoChanges">{{ $t('undo') }}</MultipurposeButton>
                    <MultipurposeButton button-type="right" :onclick="redoChanges">{{ $t('redo') }}</MultipurposeButton>
                </div>
                <div class="coreActionButtons">
                    <MultipurposeButton button-type="left" :toggleable="true" :isActiveProp="showEvaluate"
                        @click="showEvaluateTab">{{ $t('evaluate') }}
                    </MultipurposeButton>
                    <MultipurposeButton button-type="middle" :toggleable="false" @click="displayTextOnly">{{
                        $t('textonly') }}
                    </MultipurposeButton>
                    <MultipurposeButton button-type="right" :toggleable="true" :isActiveProp="showGenerate"
                        @click="showGenerateTab">{{ $t('generate') }}
                    </MultipurposeButton>

                </div>
                <div>
                    <MultipurposeButton button-type="left" :onclick="copyText">{{ $t('copy') }}</MultipurposeButton>
                    <MultipurposeButton button-type="right" :onclick="pasteText">{{ $t('paste') }}</MultipurposeButton>
                </div>
            </div>
            <TextField ref="textArea" v-model="mainTextValue" :is-long-field="true"></TextField>
            <LoadingComponent :is-loading="isLoading"></LoadingComponent>
            <div class="details">
                <p>word count : {{ responseWordCount }}</p>
                <p>Tokens : {{ inputTokens }} / {{ outputTokens }}</p>
            </div>
        </div>
    </div>


</template>


<script>
import LoadingComponent from './LoadingComponent.vue';
import MultipurposeButton from './MultipurposeButton.vue';
import MultipurposeSlider from './MultipurposeSlider.vue';
import ProficiencyMeter from './ProficiencyMeter.vue';
import TextField from './TextField.vue';
import { fetchDataFromApi } from '@/services/apiService';

export default {
    components: {
        TextField,
        MultipurposeButton,
        MultipurposeSlider,
        ProficiencyMeter,
        LoadingComponent
    },
    mounted() {
        if (localStorage.getItem("locale")) {
            this.$i18n.locale = localStorage.getItem("locale");
            this.currentLanguage = this.$i18n.locale;
        } else {
            localStorage.setItem("locale", this.currentLanguage);
        }
    },
    data() {
        return {
            isLoading: false,
            showEvaluate: false,
            showGenerate: false,
            responseWordCount: 0,
            inputTokens: 0,
            outputTokens: 0,
            currentLanguage: this.$i18n.locale,
            maxWordLengthValue: 100,
            proficiencyLevelValue: 'A1',
            subjectTextValue: 'Random subject',
            additionalParamsTextValue: 'N/A',
            mainTextValue: 'The quick brown fox jumps over the lazy dog and the cat.',
            feedbackValue: 'Generating feedback...',
            evaluatedProficiencyLevel: 'NONE',
            currentModel: 'claude' // Default model
        };
    },
    methods: {
        changeLanguage() {
            localStorage.setItem("locale", this.currentLanguage);
            this.$i18n.locale = this.currentLanguage;
        },
        saveToCache() {
            let undoHistory = JSON.parse(localStorage.getItem('undo-history')) || [];

            undoHistory.push(this.mainTextValue);

            let redoHistory = [];

            localStorage.setItem('undo-history', JSON.stringify(undoHistory));
            localStorage.setItem('redo-history', JSON.stringify(redoHistory));

        },
        undoChanges() {
            let undoHistory = JSON.parse(localStorage.getItem('undo-history')) || [];
            let redoHistory = JSON.parse(localStorage.getItem('redo-history')) || [];

            if (undoHistory.length > 0) {
                redoHistory.push(this.mainTextValue);
                this.mainTextValue = undoHistory.pop();
                localStorage.setItem('undo-history', JSON.stringify(undoHistory));
                localStorage.setItem('redo-history', JSON.stringify(redoHistory));
            }

            this.responseWordCount = this.mainTextValue.split(' ').length;
        },
        redoChanges() {
            let undoHistory = JSON.parse(localStorage.getItem('undo-history')) || [];
            let redoHistory = JSON.parse(localStorage.getItem('redo-history')) || [];

            if (redoHistory.length > 0) {
                undoHistory.push(this.mainTextValue);
                this.mainTextValue = redoHistory.pop();
                localStorage.setItem('undo-history', JSON.stringify(undoHistory));
                localStorage.setItem('redo-history', JSON.stringify(redoHistory));
            }
            this.responseWordCount = this.mainTextValue.split(' ').length;
        },
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

            // TODO: ONLY EVALUATE THE TEXT IF IT HAS CHANGED
            if (this.showEvaluate && true) this.evaluateText();
        },
        async generateNewText() {
            console.log('Generating new text');
            const prompt = "Generate a new text, based on the following parameters. ONLY OUTPUT THE TEXT, NO OTHER CONTEXT";
            const url = 'http://localhost:3000/api/' + this.currentModel;
            const body = {
                prompt,
                maxWordsLength: this.maxWordLengthValue,
                proficiencyLevel: this.proficiencyLevelValue,
                language: this.currentLanguage,
                subject: this.subjectTextValue,
                additionalParams: this.additionalParamsTextValue,
            };

            try {
                const data = await fetchDataFromApi(url, body);
                this.saveToCache();
                this.inputTokens = data.usage?.input_tokens || 0;
                this.outputTokens = data.usage?.output_tokens || 0;
                this.responseWordCount = data.content?.[0]?.text?.split(' ').length || 0;
                this.mainTextValue = data.content?.[0]?.text || 'No response text available';
                this.showEvaluate = false;
            } catch (error) {
                this.mainTextValue = 'Error calling API';
            }
        },
        async regenerateText() {
            console.log('Regenerating text');
            const prompt = "Tweak the main text slightly, based on the following parameters. ONLY OUTPUT THE TEXT, NO OTHER CONTEXT";
            const url = 'http://localhost:3000/api/' + this.currentModel;
            const body = {
                prompt,
                maxWordsLength: this.maxWordLengthValue,
                proficiencyLevel: this.proficiencyLevelValue,
                language: this.currentLanguage,
                additionalParams: this.additionalParamsTextValue,
                mainText: this.mainTextValue,
            };

            try {
                const data = await fetchDataFromApi(url, body);
                this.saveToCache();
                this.mainTextValue = data.content?.[0]?.text || 'No response text available';
                this.showEvaluate = false;
            } catch (error) {
                this.mainTextValue = 'Error calling API';
            }
        },
        async evaluateText() {
            console.log('Evaluating text');
            const prompt = "Evaluate the main Text. PROVIDE A CEFR LEVEL BEFORE THE FEEDBACK, THEN ONLY OUTPUT THE FEEDBACK, NO OTHER CONTEXT";
            const url = 'http://localhost:3000/api/' + this.currentModel;
            const body = {
                prompt,
                language: this.currentLanguage,
                additionalParams: this.additionalParamsTextValue,
                mainText: this.mainTextValue,
            };

            try {
                const data = await fetchDataFromApi(url, body);
                this.feedbackValue = data.content?.[0]?.text || 'No response text available';

                // Extract CEFR level
                const match = this.feedbackValue.match(/\b(A1|A2|B1|B2|C1|C2)\b/);
                this.evaluatedProficiencyLevel = match ? match[0] : 'NONE';
            } catch (error) {
                this.feedbackValue = 'Error calling API';
                this.evaluatedProficiencyLevel = 'NONE';
            }finally {
                this.isLoading = false;
            }
        },
    }

}

</script>


<style scoped>
.header {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid black;
}

.header select {
    width: 20rem;
    margin: 0 1rem;
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