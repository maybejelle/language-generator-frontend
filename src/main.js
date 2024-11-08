import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
    locale: 'English',
    fallbackLocale: 'English',
    messages: {
        English: {
            undo: 'Undo',
            redo: 'Redo',
            evaluate: 'Evaluate',
            textonly: 'Text Only',
            generate: 'Generate',
            regenerate: 'Regenerate',
            copy: 'Copy',
            paste: 'Paste',
            reset: 'Reset',
            delete: 'Delete',
            wordlength: 'Word Length Range',
            proficiencylevels: 'Proficiency Levels',
            subject: 'Subject',
            additionalparameters: 'Additional Parameters',
            additionalparametersinfo: 'e.g., "past tense, informal"',
            sources: 'Sources',
            sourcesinfo: 'Source list, if applicable',
            feedback: 'Feedback'
        },
        Nederlands: {
            undo: "Ongedaan maken",
            redo: "Opnieuw",
            evaluate: "Evalueren",
            textonly: "Alleen Tekst",
            generate: "Genereren",
            regenerate: "Opnieuw Genereren",
            copy: "Kopiëren",
            paste: "Plakken",
            reset: "Reset",
            delete: "Verwijderen",
            wordlength: "Woorden Lengte Bereik",
            proficiencylevels: "Beheersingsniveaus",
            subject: "Onderwerp",
            additionalparameters: "Aanvullende Parameters",
            additionalparametersinfo: "bijv. 'verleden tijd, informeel'",
            sources: "Bronnen",
            sourcesinfo: "Bronnenlijst, indien van toepassing",
            feedback: "Feedback"
        },
        Français: {
            undo: "Annuler",
            redo: "Rétablir",
            evaluate: "Évaluer",
            textonly: "Texte Seulement",
            generate: "Générer",
            regenerate: "Régénérer",
            copy: "Copier",
            paste: "Coller",
            reset: "Réinitialiser",
            delete: "Supprimer",
            wordlength: "Plage de Longueur de Mots",
            proficiencylevels: "Niveaux de Compétence",
            subject: "Sujet",
            additionalparameters: "Paramètres Supplémentaires",
            additionalparametersinfo: "par ex., 'temps passé, informel'",
            sources: "Sources",
            sourcesinfo: "Liste des sources, si applicable",
            feedback: "Retour"
        }
    }
})

const app = createApp(App);

app.use(i18n);

app.mount('#app');