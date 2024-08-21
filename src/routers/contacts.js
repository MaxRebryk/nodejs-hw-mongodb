import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactContorller,
  upsertContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.put(
  '/:contactId',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(patchContactContorller),
);

export default router;
