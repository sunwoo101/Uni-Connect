export default class Utilities {
    sanitiseString(originalString) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };

        return originalString.replace(/[&<>"']/g, char => map[char]);
    }
}