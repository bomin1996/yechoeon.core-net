export function splitAB(source: string, splitter: string = "_") {
    const parts = source.split(splitter);
    if (parts.length >=2) {
        const a = parts[0];
        const b = parts[1];
        return [a, b];
    }

    throw "source error";
}