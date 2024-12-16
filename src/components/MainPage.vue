<template>

    <div class="header">
        <h1>Language Level Generator</h1>
        <select v-model="currentLanguage" @change="changeLanguage">
            <option v-for="language in languageOptions" :key="language" :value="language">{{ language }}</option>
        </select>
        <select v-model="currentModel">
            <option value="claude">Claude</option>
            <option value="chatgpt">Chatgpt (gpt-4o-mini)</option>
        </select>
    </div>
    <div class="wrapper">
        <Transition>
            <div class="evaluateTab" v-if="showEvaluate">
                <BarometerComponent :proficiencyLevel="evaluatedProficiencyLevel" />
                <TextField readonly :title="$t('feedback')" is-long-field="true" v-model="feedbackValue" />
            </div>
        </Transition>
        <Transition>
            <div class="generateTab" v-if="showGenerate">
                <div class="generateButtons">
                    <MultipurposeButton button-type="left" @click="generateText">{{ $t('generate') }}
                    </MultipurposeButton>
                    <MultipurposeButton button-type="right" @click="generateText('regenText')">{{ $t('regenerate') }}
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
                        @click="toggleTab('evaluate')">{{ $t('evaluate') }}
                    </MultipurposeButton>
                    <MultipurposeButton button-type="middle" :toggleable="false" @click="toggleTab('text only')">{{
                        $t('textonly') }}
                    </MultipurposeButton>
                    <MultipurposeButton button-type="right" :toggleable="true" :isActiveProp="showGenerate"
                        @click="toggleTab('generate')">{{ $t('generate') }}
                    </MultipurposeButton>

                </div>
                <div>
                    <MultipurposeButton button-type="left" :onclick="copyText">{{ $t('copy') }}</MultipurposeButton>
                    <MultipurposeButton button-type="right" :onclick="pasteText">{{ $t('paste') }}</MultipurposeButton>
                </div>
            </div>
            <TextField ref="textArea" v-model="mainTextValue" :is-long-field="true"></TextField>
            <div class="details">
                <p>word count : {{ responseWordCount }}</p>
                <p>Tokens : {{ inputTokens }} / {{ outputTokens }}</p>
            </div>
            <h2 v-if="feedback.length > 0">{{ $t('implementFeedback') }}</h2>
            <MultipurposeButton class="feedback" @click="implementFeedback(feedbackrule)"
                v-for="(feedbackrule, index) in feedback" :key="index">{{ feedbackrule }}
            </MultipurposeButton>
            <LoadingComponent :is-loading="isLoading"></LoadingComponent>
        </div>
    </div>


</template>


<script>
import BarometerComponent from './BarometerComponent.vue';
import LoadingComponent from './LoadingComponent.vue';
import MultipurposeButton from './MultipurposeButton.vue';
import MultipurposeSlider from './MultipurposeSlider.vue';
import TextField from './TextField.vue';
import { fetchDataFromApi, PROMPTS } from '@/services/apiService';

export default {
    components: {
        TextField,
        MultipurposeButton,
        MultipurposeSlider,
        BarometerComponent,
        LoadingComponent
    },
    mounted() {
        if (localStorage.getItem("locale")) {
            const storedLocale = localStorage.getItem("locale");
            if (this.languageOptions.includes(storedLocale)) {
                this.$i18n.locale = storedLocale;
                this.currentLanguage = storedLocale;
            } else {
                localStorage.setItem("locale", this.defaultLanguage);
                this.$i18n.locale = this.defaultLanguage;
                this.currentLanguage = this.defaultLanguage;
            }
        } else {
            localStorage.setItem("locale", this.defaultLanguage);
        }
    },
    data() {
        return {
            isLoading: false,
            showEvaluate: false,
            evaluatedText: "",
            showGenerate: false,
            responseWordCount: 0,
            inputTokens: 0,
            outputTokens: 0,
            currentLanguage: this.$i18n.locale,
            defaultLanguage: 'English_British',
            languageOptions: ['Français', 'English_British', 'English_American', 'Nederlands', 'Español'],
            maxWordLengthValue: 100,
            proficiencyLevelValue: 'A1',
            subjectTextValue: 'Random subject',
            additionalParamsTextValue: 'N/A',
            mainTextValue: 'The quick brown fox jumps over the lazy dog and the cat.',
            feedbackValue: 'Generating feedback...',
            evaluatedProficiencyLevel: 'NONE',
            feedback: [],
            currentModel: 'claude' // Default model
        };
    },
    methods: {
        handleValueChange() {
            this.textChanged = true;
        },
        changeLanguage() {
            if (this.languageOptions.includes(this.currentLanguage)) {
                localStorage.setItem("locale", this.currentLanguage);
                this.$i18n.locale = this.currentLanguage;
            } else {
                console.error("Selected language is not supported.");
            }
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
        toggleTab(tab) {
            switch (tab) {
                case 'evaluate':
                    this.showEvaluate = !this.showEvaluate;
                    if (this.showEvaluate) {
                        this.evaluateText();
                    }
                    break;
                case 'generate':
                    this.showGenerate = !this.showGenerate;
                    break;
                case 'text only':
                    this.displayTextOnly();
                    break;
                default:
                    console.error('Invalid tab');
            }
        },
        displayTextOnly() {
            console.log('Display text only');
            this.showEvaluate = false;
            this.showGenerate = false;
        },
        async generateText(type = "new") {
            const body = {
                prompt: "",
                maxWordsLength: this.maxWordLengthValue,
                proficiencyLevel: this.proficiencyLevelValue,
                language: this.currentLanguage,
                subject: this.subjectTextValue,
                additionalParams: this.additionalParamsTextValue,
                mainText: "",
            }
            if (type === "new") {
                body.prompt = PROMPTS.generate;
            } else {
                body.prompt = PROMPTS.regenerate;
                body.mainText = this.mainTextValue;
                body.subject = "same subject as text";
            }
            const url = 'http://localhost:3000/api/' + this.currentModel;
            try {
                this.isLoading = true;
                const data = await fetchDataFromApi(url, body);
                this.saveToCache();
                this.inputTokens = data.inputTokens || 0;
                this.outputTokens = data.outputTokens || 0;
                this.responseWordCount = data.responseText.split(' ').length || 0;
                this.mainTextValue = data.responseText || 'No response text available';
                this.showEvaluate = false;
                this.feedback = [];
            } catch (error) {
                this.mainTextValue = 'Error calling API';
            } finally {
                this.isLoading = false;
            }
        },
        async evaluateText() {
            const prompt = PROMPTS.evaluate;
            const url = 'http://localhost:3000/api/' + this.currentModel;
            const body = {
                prompt,
                language: this.currentLanguage,
                additionalParams: this.additionalParamsTextValue,
                mainText: this.mainTextValue,
            };

            this.isLoading = true;

            try {
                const data = await fetchDataFromApi(url, body);
                this.feedbackValue = data.responseText || 'No response text available';
                this.feedback = this.feedbackValue.split('\n').splice(1).filter(feedback => feedback.length > 0);

                // Extract CEFR level
                const match = this.feedbackValue.match(/\b(A1|A2|B1|B2|C1|C2)\b/);
                this.evaluatedProficiencyLevel = match ? match[0] : 'NONE';
            } catch (error) {
                this.feedbackValue = 'Error calling API';
                this.evaluatedProficiencyLevel = 'NONE';
            } finally {
                this.isLoading = false;
            }
        },
        async implementFeedback(rule) {
            const prompt = "Implement the following feedback to the mainText. ONLY OUTPUT THE TEXT IN THE GIVEN LANGUAGE, NO OTHER CONTEXT";
            const url = 'http://localhost:3000/api/' + this.currentModel;
            const body = {
                prompt,
                mainText: this.mainTextValue,
                feedback: rule,
                language: this.currentLanguage,
            };
            try {
                this.isLoading = true;
                const data = await fetchDataFromApi(url, body);
                console.log(data);
                this.mainTextValue = data.responseText || 'No response text available';
            } catch (error) {
                this.mainTextValue = 'Error calling API';
            } finally {
                this.isLoading = false;
            }
            this.feedback = this.feedback.filter(feedbackrule => feedbackrule !== rule);

        }
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

.generateButtons {
    display: flex;
    justify-content: center;
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

.feedback {
    margin: 0.5rem 0;
    padding: 0.5rem;
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    display: block;
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