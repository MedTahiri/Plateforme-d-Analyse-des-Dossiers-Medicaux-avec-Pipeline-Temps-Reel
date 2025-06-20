export function formatAlerteMessage(raw) {
    try {
        const indicateurMatch = raw.match(/indicateur=.*?nom='(.*?)', unite='(.*?)'/);
        const valeurMatch = raw.match(/valeur=(.*?),/);
        const seuilMaxMatch = raw.match(/seuilMax=(.*?),/);
        const seuilMinMatch = raw.match(/seuiMin=(.*?),/);

        if (!indicateurMatch || !valeurMatch || !seuilMaxMatch || !seuilMinMatch) return raw;

        const [_, nom, unite] = indicateurMatch;
        const valeur = parseFloat(valeurMatch[1]);
        const seuilMax = parseFloat(seuilMaxMatch[1]);
        const seuilMin = parseFloat(seuilMinMatch[1]);

        let status = "";
        if (valeur > seuilMax) {
            status = "🔺 dépassé";
        } else if (valeur < seuilMin) {
            status = "🔻 trop bas";
        } else {
            status = "✅ normal";
        }

        return `${nom} ${status} : ${valeur} ${unite} (Seuil : ${seuilMin} - ${seuilMax} ${unite})`;
    } catch (e) {
        return raw; // fallback
    }
}