const names = ["Audi", "Cadilac", "Chevrolet", "Datsun", "Ferrari"];
const licenses = ["qwerty", "asdfgh", "zxccvbn", "ytrewq", "hgfdsa"];
const colors = ["red", "blue", "yellow", "purple", "black"];
const parks = [1, 2, 3, 4];

module.exports = names.map(name => ({
    name,
    license: licenses[Math.floor(Math.random() * licenses.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    model: "Model",
    photo: "https://image.shutterstock.com/image-photo/moscow-april-21-retro-car-600w-141354316.jpg", //"https://placekitten.com/300/300",
    motorPark: parks[Math.floor(Math.random() * parks.length)],
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
}));
