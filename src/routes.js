const UserController = require('./controllers/UseController');

module.exports = [
    {
        endpoint: '/users',
        method: 'GET',
        handler: UserController.listUsers,
    },
    
    {
        endpoint: '/users/:id',
        method: 'GET',
        handler: UserController.getUserById,
    },
    {
        endpoint: '/users',
        method: 'POST',
        handler: UserController.createUser,
    },
    {
        endpoint: '/users/:id',
        method: 'PUT',
        handler: UserController.updateUser,
    },
    {
        endpoint: '/users/:id',
        method: 'DELETE',
        handler: UserController.deleteUser,
    },
    {
        endpoint: '/products',
        method: 'GET',
        handler: UserController.listProducts,
    },
    {
        endpoint: '/products',
        method: 'POST',
        handler: UserController.createproduct,
    },
    {
        endpoint: '/products/:id',
        method: 'PUT',
        handler: UserController.updateProduct,
    },
    {
        endpoint: '/products/:id',
        method: 'DELETE',
        handler: UserController.deleteProduct,
    },
];