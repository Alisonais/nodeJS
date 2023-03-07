let users = require('../mocks/users');
let products = require('../mocks/products');
const { isNumber } = require('util');

module.exports = {
    listUsers(request, response) {

        const { order } = request.query;

        const sortedUser = users.sort((a, b) => {
            if (order === 'desc') {
                return a.id < b.id ? 1 : -1;
            }
            return a.id > b.id ? 1 : -1;
        });
        response.send(200, sortedUser);
    },

    getUserById(request, response) {
        const { id } = request.params;

        const user = users.find((user) => user.id === Number(id));

        if (!user) {
            return response.send(400, { ERROR: 'user not found', TRY: `Look for a valid user, we have a ${users.length} users.` });
        }
        response.send(200, { user });
    },

    createUser(request, response) {
        const { body } = request;
        const lastUserId = users[users.length - 1].id;
        const newUser = {
            id: lastUserId + 1,
            name: body.name,
            trabalho: body.trabalho,
        };
        users.push(newUser);
        response.send(200, users);


    },

    updateUser(request, response) {
        let { id } = request.params;
        const { name } = request.body;

        id = Number(id);

        const userExist = users.find((user) => user.id === id);

        if (!userExist) {
            return response.send(400, { error: 'user not fund' });
        }

        users = users.map((user) => {
            if (user.id === id) {
                return {
                    ...user,
                    name,
                }
            }
            return user
        });

        response.send(200, { id, name })
    },

    deleteUser(request, response) {
        let { id } = request.params;
        id = Number(id);

        users = users.filter((user) => user.id !== id);
        response.send(200, { deleted: true });
    },

    listProducts(request, response) {

        const { order } = request.query;

        const sortedProducts = products.sort((a, b) => {
            if (order === 'desc') {
                return a.id < b.id ? 1 : -1;
            }
            return a.id > b.id ? 1 : -1;
        });
        response.send(200, sortedProducts);
    },

    createproduct(request, response) {
        const { body } = request;
        let lastProductId = '';

        products.length === 0 ? lastProductId = 0 : lastProductId = products[products.length - 1].id;
        
        const newProduct = {
            id: lastProductId + 1,
            name: body.name,
            price: body.price,
        };
        products.push(newProduct);
        response.send(200,products);
    },

    updateProduct(request, response){
        let { id } = request.params;
        const { name } = request.body;
        const { price } = request.body;

        id = Number(id);

        const productExist = products.find((product) => product.id === id);

        if(!productExist) {
            return response.send(400, {error: "product not found"});
        };

        products = products.map ((product) => {
            if(product.id === id){
                return{
                    ...product,
                    name,
                    price,
                };
            };
            return product
        });
        response.send(200, { id, name, price });
    },

    deleteProduct(request, response) {
        let { id } = request.params;

        id === "all" ? products = [] : id = Number(id); 
        
        products = products.filter((product) => product.id !== id);
        
        response.send(200,products);
    },
};
