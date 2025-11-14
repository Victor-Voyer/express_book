const MAX_LENGTH = 150;

async function validateCreateBook(payLoad, Type) {
    const errors = [];

    //verification qu'on a bien recu un objet json
    if (!payLoad || typeof payLoad !== "object") {
        errors.push("le corp de la requete doit être en json!");
        return errors;
    }

    //recupération des données attendues
    const { title, author, dispo, type_id } = payLoad;

    //verification title obligatoire, chaine non vide et taille limitée
    if (typeof title !== "string" || title.trim().length === 0) {
        errors.push("le titre est obligatoire, il ne doit pas etre vide");
    } else if (title.trim().length > MAX_LENGTH) {
        errors.push(`le titre ne doit pas dépasser ${MAX_LENGTH} caracteres `);
    }

    //verification author obligatoire, chaine non vide et taille limitée
    if (typeof author !== "string" || author.trim().length === 0) {
        errors.push("author est obligatoire, il ne doit pas etre vide");
    } else if (author.trim().length > MAX_LENGTH) {
        errors.push(`author ne doit pas dépasser ${MAX_LENGTH} caracteres `);
    }

    //dispo optionnel a la recuperation des données mais il doit etre boolean
    if (typeof dispo !== "undefined" && typeof dispo !== "boolean") {
        errors.push("dispo doit être un boolean");
    }

    //verification type_id obligatoire et doit être un nombre entier
    if (typeof type_id === "undefined" || type_id === null) {
        errors.push("type_id est obligatoire");
    } else if (!Number.isInteger(Number(type_id)) || type_id <= 0) {
        errors.push("type_id doit être un nombre entier positif");
    } else {
        // Vérifier que le type existe dans la base de données
        if (Type) {
            const type = await Type.findByPk(type_id);
            if (!type) {
                errors.push("Le type spécifié n'existe pas");
            }
        }
    }

    return errors; //return les erreurs ou un tableau vide si tout est bon
}

async function validateUpdateBook(payload, Type) {
    const errors = [];

    //verification qu'on a bien recu un objet json
    if (!payload || typeof payload !== "object") {
        errors.push("le corp de la requete doit être en json!");
        return errors;
    }

    //une mis a jour est utile si au moins une valeur est différente
    if (
        typeof payload.title === "undefined" &&
        typeof payload.author === "undefined" &&
        typeof payload.dispo === "undefined" &&
        typeof payload.type_id === "undefined"
    ) {
        errors.push("au moins un champs doit etre fournis pour une modification");
        return errors;
    }

    // Validation partielle pour la mise à jour
    const { title, author, dispo, type_id } = payload;

    //verification title si fourni
    if (typeof title !== "undefined") {
        if (typeof title !== "string" || title.trim().length === 0) {
            errors.push("le titre ne doit pas etre vide");
        } else if (title.trim().length > MAX_LENGTH) {
            errors.push(`le titre ne doit pas dépasser ${MAX_LENGTH} caracteres `);
        }
    }

    //verification author si fourni
    if (typeof author !== "undefined") {
        if (typeof author !== "string" || author.trim().length === 0) {
            errors.push("author ne doit pas etre vide");
        } else if (author.trim().length > MAX_LENGTH) {
            errors.push(`author ne doit pas dépasser ${MAX_LENGTH} caracteres `);
        }
    }

    //dispo doit être boolean si fourni
    if (typeof dispo !== "undefined" && typeof dispo !== "boolean") {
        errors.push("dispo doit être un boolean");
    }

    //verification type_id si fourni
    if (typeof type_id !== "undefined" && type_id !== null) {
        if (!Number.isInteger(Number(type_id)) || type_id <= 0) {
            errors.push("type_id doit être un nombre entier positif");
        } else {
            // Vérifier que le type existe dans la base de données
            if (Type) {
                const type = await Type.findOne({ where: { id: type_id } });
                if (!type) {
                    errors.push("Le type spécifié n'existe pas");
                }
            }
        }
    }

    return errors;
}

export {
    validateCreateBook,
    validateUpdateBook
};

