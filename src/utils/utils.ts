export const classNames = (classes: Record<string, boolean> = {}) => {
    let returnValue = "";

    Object.keys(classes).forEach((c) => {
        if (classes[c]) returnValue += `${c} `
    });

    return returnValue;
}

