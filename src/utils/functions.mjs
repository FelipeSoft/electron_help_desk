export function limitWords(string) {
    return string.length > 30 ? string.substring(0, 30).trim() + "..." : string
}