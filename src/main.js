import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
    locale: "English_British",
    fallbackLocale: "English_British",
    messages: {
        English_British: {
            undo: "Undo",
            redo: "Redo",
            evaluate: "Evaluate",
            textonly: "Text Only",
            generate: "Generate",
            regenerate: "Regenerate",
            copy: "Copy",
            paste: "Paste",
            reset: "Reset",
            delete: "Delete",
            wordlength: "Word Length Range",
            proficiencylevels: "Proficiency Levels",
            subject: "Subject",
            additionalparameters: "Additional Parameters",
            additionalparametersinfo: 'e.g., "past tense, informal"',
            sources: "Sources",
            sourcesinfo: "Source list, if applicable",
            feedback: "Feedback",
            implementFeedback: "Implement Feedback",
            generateButtonDescription : "Generates a new text, based on the parameters below",
            regenerateButtonDescription : "Tweaks the main text slightly, based on the parameters below",
            evaluateButtonDescription : "Evaluates the main text. Gives suggestions on how to improve it",
            copyButtonDescription : "Copies the text to the clipboard",
            pasteButtonDescription : "Pastes text from the clipboard",
            undoButtonDescription : "Undoes the last action",
            redoButtonDescription : "Redoes the last action",
            generateTabButtonDescription : "opens the generate tab",
        },
        English_American: {
            undo: "Undo",
            redo: "Redo",
            evaluate: "Evaluate",
            textonly: "Text Only",
            generate: "Generate",
            regenerate: "Regenerate",
            copy: "Copy",
            paste: "Paste",
            reset: "Reset",
            delete: "Delete",
            wordlength: "Word Length Range",
            proficiencylevels: "Proficiency Levels",
            subject: "Subject",
            additionalparameters: "Additional Parameters",
            additionalparametersinfo: 'e.g., "past tense, informal"',
            sources: "Sources",
            sourcesinfo: "Source list, if applicable",
            feedback: "Feedback",
            implementFeedback: "Implement Feedback",
            generateButtonDescription : "Generates a new text, based on the parameters below",
            regenerateButtonDescription : "Tweaks the main text slightly, based on the parameters below",
            evaluateButtonDescription : "Evaluates the main text. Gives suggestions on how to improve it",
            copyButtonDescription : "Copies the text to the clipboard",
            pasteButtonDescription : "Pastes text from the clipboard",
            undoButtonDescription : "Undoes the last action",
            redoButtonDescription : "Redoes the last action",
            generateTabButtonDescription : "opens the generate tab",
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
            feedback: "Feedback",
            implementFeedback: "Feedback Implementeren",
            generateButtonDescription : "Genereert een nieuwe tekst, gebaseerd op de onderstaande parameters",
            regenerateButtonDescription : "Wijzigt de hoofdtekst lichtjes, gebaseerd op de onderstaande parameters",
            evaluateButtonDescription : "Evalueert de hoofdtekst. Geeft suggesties over hoe deze te verbeteren",
            copyButtonDescription : "Kopieert de tekst naar het klembord",
            pasteButtonDescription : "Plakt tekst van het klembord",
            undoButtonDescription : "Maakt de laatste actie ongedaan",
            redoButtonDescription : "Herhaalt de laatste actie",
            generateTabButtonDescription : "opent het generatietabblad",
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
            feedback: "Retour",
            implementFeedback: "Implémenter le Retour",
            generateButtonDescription : "Génère un nouveau texte, basé sur les paramètres ci-dessous",
            regenerateButtonDescription : "Ajuste légèrement le texte principal, basé sur les paramètres ci-dessous",
            evaluateButtonDescription : "Évalue le texte principal. Donne des suggestions pour l'améliorer",
            copyButtonDescription : "Copie le texte dans le presse-papiers",
            pasteButtonDescription : "Colle le texte du presse-papiers",
            undoButtonDescription : "Annule la dernière action",
            redoButtonDescription : "Rétablit la dernière action",
            generateTabButtonDescription : "ouvre l'onglet de génération",
        },
        Español: {
            undo: "Deshacer",
            redo: "Rehacer",
            evaluate: "Evaluar",
            textonly: "Solo Texto",
            generate: "Generar",
            regenerate: "Regenerar",
            copy: "Copiar",
            paste: "Pegar",
            reset: "Restablecer",
            delete: "Eliminar",
            wordlength: "Rango de Longitud de Palabras",
            proficiencylevels: "Niveles de Competencia",
            subject: "Asunto",
            additionalparameters: "Parámetros Adicionales",
            additionalparametersinfo: "por ejemplo, 'tiempo pasado, informal'",
            sources: "Fuentes",
            sourcesinfo: "Lista de fuentes, si aplica",
            feedback: "Retroalimentación",
            implementFeedback: "Implementar Retroalimentación",
            generateButtonDescription : "Genera un nuevo texto, basado en los parámetros a continuación",
            regenerateButtonDescription : "Ajusta ligeramente el texto principal, basado en los parámetros a continuación",
            evaluateButtonDescription : "Evalúa el texto principal. Da sugerencias para mejorarlo",
            copyButtonDescription : "Copia el texto al portapapeles",
            pasteButtonDescription : "Pega el texto del portapapeles",
            undoButtonDescription : "Deshace la última acción",
            redoButtonDescription : "Rehace la última acción",
            generateTabButtonDescription : "abre la pestaña de generación",
        },
    },
});

const app = createApp(App);

app.use(i18n);

app.mount("#app");
