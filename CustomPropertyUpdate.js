export function getCustomProperty(element, property) {
    return parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0     
    //gets current value; converts to number(gets CSS Variable and it's returned as a string) || if no value then 0
}

export function setCustomProperty(element, property, value) {
    element.style.setProperty(property, value)
    //property = CSS custom variable, value = number
}

export function incrementCustomProperty(element, property, increment) {
    //combines other 2 functions. 
    setCustomProperty(element, property, getCustomProperty(element, property) + increment)
    //get current values and adding incremented value to it and setting that value
}