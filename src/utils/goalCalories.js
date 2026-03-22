const KEY = 'foodlens_goal_calories'
const DEFAULT = 1800

export function getGoalCalories() {
    return parseInt(localStorage.getItem(KEY) || DEFAULT)
}

export function setGoalCalories(value) {
    localStorage.setItem(KEY, value)
}