const target = {
    message: "Hello, world!",
    name:"Kylian"
  };
  
const handler = {
    get: function(target, prop, receiver) {
        if(prop == "message"){
            console.log(`Accès à la propriété "${prop}"`);
        }else if(prop == "name"){
            console.log("Le nom est " + target[prop]);
        }
        return target[prop];
    }
};
  
const proxy = new Proxy(target, handler);

console.log(proxy.message); 
// Affiche: "Accès à la propriété "message""
// Puis: "Hello, world!"

//Exemple de propriété virtuelle 
const rectangle = new Proxy({
    width: 10,
    height: 5
  }, {
    get(target, property, receiver) {
      if (property === 'area') {
        return target.width * target.height; // Calculée à la volée
      }
      if (property === 'perimeter') {
        return 2 * (target.width + target.height); // Calculée à la volée
      }
      return Reflect.get(target, property, receiver);
    }
  });
  
console.log(rectangle.area); // 50

// Obtenir la date actuelle
const dateActuelle = new Date();

// Supposons que vous ayez une date à comparer
// Elle peut venir d'un input ou être créée directement
const dateAComparer = new Date('2025-04-10'); // exemple de date

// Comparaison de dates
if (dateAComparer > dateActuelle) {
    console.log('La date à comparer est dans le futur');
} else if (dateAComparer < dateActuelle) {
    console.log('La date à comparer est dans le passé');
} else {
    console.log('Les dates sont identiques');
}

// Si vous voulez connaître la différence en millisecondes
const differenceEnMs = dateAComparer - dateActuelle;

// Convertir en jours
const differenceEnJours = Math.floor(differenceEnMs / (1000 * 60 * 60 * 24));
console.log(`Différence: ${differenceEnJours} jours`);