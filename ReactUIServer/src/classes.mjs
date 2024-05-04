import { limits } from "./data.mjs";

export class User {
    id;
    /**
     * @param {string} id
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
    loadData(obj){
        if (obj.text && (typeof obj.text == "string") && obj.text.length<=limits.maxTextLength) {this.text = obj.text}
        if (obj.isCorrect && (typeof obj.isCorrect == "boolean")) {this.isCorrect = obj.isCorrect}
    }
}
export class Question {
    /**
     * @param {string} text 
     * @param {Choice[]} choices 
     */
    constructor(text,choices) {
        this.choices = choices;
        this.text = text;
    }
    loadData(obj){
        if (obj.text && (typeof obj.text == "string") && obj.text.length<=limits.maxTextLength){this.text = obj.text}
        if (obj.choices && (Array.isArray(obj.choices) && obj.choices.length<=limits.maxChoices)){
            this.choices = obj.choices.map((choice)=>{
                let c = new Choice()
                c.loadData(choice)
                return c
            })
        }
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
    loadData(obj){
        if (obj.title && (typeof obj.title == 'string') && obj.title.length<=limits.maxTextLength) {this.title = obj.title}
        if (obj.questions && (Array.isArray(obj.questions)) && obj.questions.length<=limits.maxQuestions){
            this.questions = obj.questions.map((question)=>{
                let q = new Question()
                q.loadData(question)
                return q
            })
        }
    }
}
