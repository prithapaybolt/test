const express = require('express');
const router = express.Router();
const { v4 : uuidv4 } = require ('uuid');

// Mock database
const users = [
  {
    first_name: 'Pritha',
    last_name: 'Sen',
    email: 'pritha.sen@example.com',
  },
  {
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alicesmith@example.com',
  },
];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
    res.send(users);
})





// Adding users to our mock database

router.post('/', (req, res) => {
    const user = req.body;
    console.log("hi", req.body);
    users.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
})  


router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
  
    const { first_name, last_name, email} = req.body;
  
    const user = users.find((user) => user.id === id)
  
    if(first_name) user.first_name = first_name;
    if(last_name) user.last_name = last_name;
    if(email) user.email = email;
  
    res.send(`User with the ${id} has been updated`)
  
  });

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    users = users.filter((user) => user.id !== id)
  
    res.send(`${id} deleted successfully from database`);
  });



  module.exports = router