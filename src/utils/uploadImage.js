import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Récupère __dirname en environnement ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Définit un stockage disque : où enregistrer + nom du fichier
const storage = multer.diskStorage({
  // on remonte jusqu’à la racine du projet puis on cible le dossier uploads
  destination: path.join(__dirname, '..', '..', 'public', 'uploads'),

  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('_'); 
    cb(null, `${file.fieldname}-${name}`);
  },
});

// Filtre pour n’accepter que certains types MIME
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Format de fichier non supporté'));
  }
  cb(null, true);
};

// Exporte l’instance Multer prête à être utilisée dans les routes
export const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // limite chaque fichier à 2 Mo
  },
});