const join = (delimiter: string) => <T>(...values: T[]) => values.join(delimiter);

/** 
 * delimiter '' 
 * */
export const join_min = join('');

export const join_space = join(' ');

export const join_comma = join(',');

export const join_semicolon = join(';');

/** delimiter : */
export const join_colon = join(':');

export const join_hyphen = join('-');

