let score = 0;
let message;

const level = window.location.search.substring(1).split("=")[1];

const quizData = [
    [
        { mot: "hello", traduction: "bonjour" },
        { mot: "world", traduction: "monde" },
        { mot: "house", traduction: "maison" },
        { mot: "cat", traduction: "chat" },
        { mot: "book", traduction: "livre" },
        { mot: "tree", traduction: "arbre" },
        { mot: "bottle", traduction: "bouteille" },
        { mot: "water", traduction: "eau" },
        { mot: "blue", traduction: "bleu" },
        { mot: "car", traduction: "voiture" }
    ],
    [
        { mot: "opportunity", traduction: "opportunité" },
        { mot: "challenge", traduction: "defi" },
        { mot: "solution", traduction: "solution" },
        { mot: "environment", traduction: "environnement" },
        { mot: "decision", traduction: "décision" },
        { mot: "technology", traduction: "technologie" },
        { mot: "relationship", traduction: "relation" },
        { mot: "responsibility", traduction: "responsabilité" },
        { mot: "trip", traduction: "voyage" },
        { mot: "knowledge", traduction: "connaissance"}
    ],
    [
        { mot: "meticulous", traduction: "meticuleux" },
        { mot: "spontaneous", traduction: "spontané" },
        { mot: "confident", traduction: "confiant" },
        { mot: "enthusiastic", traduction: "enthousiaste" },
        { mot: "resilient", traduction: "resistant" },
        { mot: "enigma", traduction: "enigme" },
        { mot: "meditate", traduction: "méditer" },
        { mot: "diverse", traduction: "divers" },
        { mot: "inquire", traduction: "renseigner" },
        { mot: "hesistate", traduction: "hesiter" }
    ]
];
let indexMotActuel = 0;
/**
* Affiche le mot actuel à traduire sur la page.
*/
function afficherMot(level) {
    console.log(level);
    console.log(indexMotActuel);
    console.log(quizData[0][1].mot);
    document.getElementById("question").textContent = `Traduisez le mot : ${quizData[level][indexMotActuel].mot}`;
}
/**
 * Affiche un message indiquant que le quiz est terminé, ainsi que le score final.
 *
 * retourne : rien
 */
function afficherResultat() {
    message = "Vous avez terminé le quiz !";
    document.getElementById("fin").textContent = message;
    document.getElementById("score").textContent = score + "/10";
}
/**
 * Vérifie la réponse de l'utilisateur, met à jour le score et affiche un message.
 * Passe ensuite au mot suivant dans le quiz.
 * return rien
 */
function verifierReponse() {
    const userInput = document.getElementById("user-input").value.toLowerCase();
    const reponseCorrecte = quizData[level][indexMotActuel].traduction.toLowerCase();
    if (userInput === reponseCorrecte) {
        message = "La réponse est correcte !";
        score++;
    } else {
        message = `La réponse est fausse. La bonne réponse est "${reponseCorrecte}".`;
    }
    document.getElementById("erreur").textContent = message;
    document.getElementById("score").textContent = score + "/10";
    indexMotActuel = (indexMotActuel + 1) % quizData[level].length;
    if (indexMotActuel === 0) {
        // Tous les mots ont été traduits, réinitialiser le quiz
        afficherResultat();
        indexMotActuel = 0;// Réinitialisation de l'index
        // Cacher les éléments du quiz, sauf le message de fin et le score final
        document.getElementById("quiz-form").classList.add("hidden");
        document.getElementById("verify-button").classList.add("hidden");
        document.getElementById("user-input").classList.add("hidden");
        document.getElementById("question").classList.add("hidden");
    } else {
        afficherMot(level);
        document.getElementById("user-input").value = "";
    }
}
/**
 * Point d'entrée principal. Initialise le quiz en affichant le premier mot.
 * Attache également la gestion des évènements pour gérer la soumission du formulaire.
 *
 * parametre:DOMContentLoaded
 * retourne:rien
 */
document.addEventListener("DOMContentLoaded", function() {
    afficherMot(level);

    const quizForm = document.getElementById("quiz-form");
    quizForm.addEventListener("submit", function(event) {
        event.preventDefault();
        verifierReponse(level);
    });
}
);