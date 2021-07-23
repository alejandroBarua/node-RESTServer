const {Router} = require('express');
const router = Router();
const {	
	getUser,
	postUser,
	putUser,
	deleteUser
} = require('../controllers/user')


router.get('/', getUser);

router.post('/', postUser);

router.put('/:id', putUser);

router.delete('/', deleteUser);

module.exports = router;