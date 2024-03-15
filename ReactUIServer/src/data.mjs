import { Quiz, User } from "./classes.mjs"


export let user = local_get_user()

export let quiz_gl = { quiz: new Quiz('', []), index: null };

export const limits = {
    maxNameLength: 24,
    maxEmailLength: 64,
    maxPasswordLength: 64,
    maxTextLength: 64,
    maxQuizes: 20,
    maxQuestions: 20,
    maxChoices: 4,
    roomKeyLength: 4
}
export function alert_limit(){
    alert('Limit exceeded')
}
/**
 * @param {User} user 
 */
export function local_store_user(user){
    localStorage.setItem('self-user', JSON.stringify(user))
}

/**
 * 
 * @returns {User}
 */
export function local_get_user(){
    return JSON.parse(localStorage.getItem('self-user'))
}

