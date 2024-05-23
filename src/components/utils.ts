export const getValueBasedOnResolution = ($isMD: boolean, val1: string, val2: string) => ($isMD ? val1 : val2);

export const getClassNames = (classNames: string[]) => (
    classNames.join(' ')
)
