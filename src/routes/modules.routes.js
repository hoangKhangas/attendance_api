const { Router } = require('express')

const wrapRequest = require('../utils/request')
const { validate } = require('../utils/validate')

const { createModuleController, getAllModuleController } = require('../controllers/modules.controllers')
const {
    createUserModuleController,
    getAllUserByModuleIdController,
    checkUserInModuleController
} = require('../controllers/users_modules.controllers')
const { createModuleValidator, createUserModuleValidator } = require('../middlewares/modules.middlewares')
const jwtAuth = require('../middlewares/jwtAuth.middlewares')
const authorized = require('../middlewares/authorized.middlewares')

const modulesRouter = Router()

modulesRouter.get('/', jwtAuth, authorized('admin'), wrapRequest(getAllModuleController))

modulesRouter.get(
    '/:module_id/users',
    jwtAuth,
    authorized('admin'),

    wrapRequest(getAllUserByModuleIdController)
)

modulesRouter.post(
    '/create',
    jwtAuth,
    authorized('admin'),
    validate(createModuleValidator),
    wrapRequest(createModuleController)
)

modulesRouter.post(
    '/users/create',
    jwtAuth,
    authorized('admin'),
    validate(createUserModuleValidator),
    wrapRequest(createUserModuleController)
)

modulesRouter.post('/check/users', jwtAuth, authorized('admin'), wrapRequest(checkUserInModuleController))
module.exports = modulesRouter
