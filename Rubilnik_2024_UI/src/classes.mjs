export class User {
    /**
     * @param {string} name
     * @param {string} email 
     * @param {string} password 
     * @param {*} profile_picture 
     * @param {Quiz[]} quizzes 
     */
    constructor(name, email, password, profile_picture, quizzes) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.profile_picture = profile_picture
        this.quizzes = quizzes
    };
}
export class Choice {
    /**
     * @param {string} text 
     * @param {boolean} isCorrect 
     */
    constructor(text,isCorrect) {
        this.text = text;
        this.isCorrect = isCorrect;
    }
}
export class Question {
    /**
     * @param {string} text 
     * @param {Choice[]} choices 
     */
    constructor(text,choices,) {
        this.choices = choices;
        this.text = text;
    }
}
export class Quiz {
    /**
     * @param {string} title 
     * @param {Question[]} questions 
     */
    constructor(title,questions) {
        this.questions = questions;
        this.title = title
    }
}
