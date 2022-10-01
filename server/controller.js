const houses = require('./db.json');
let globalID = 4;

const getHouses = (req, res) => {
    res.status(200).send(houses)
}

const deleteHouse = (req, res) => {
    let houseIndex = houses.findIndex((house) => house.id === +req.params.id);
    houses.splice(houseIndex, 1);
    res.status(200).send(houses);
}

const createHouse = (req, res) => {
    const { address, price, imageURL } = req.body;
    houses.push({
        id:globalID,
        address,
        price,
        imageURL,
    })
    globalID++
    res.status(200).send(houses)
}

const updateHouse = (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    const houseIndex = houses.findIndex((house) => house.id === +req.params.id);
    const houseToAdjust = houses[houseIndex]
  
    if (type === 'plus'){
        houseToAdjust.price += 10000
        res.status(200).send(houses)
    } else if (type === 'minus'&& houseToAdjust.price >= 10000){
        houseToAdjust.price -= 10000
        res.status(200).send(houses)
    } else{
        res.status(400).send(houses)
    }
    
}

module.exports = {
    getHouses,
    deleteHouse,
    createHouse,
    updateHouse,
};