import { Router } from 'express';
import jwtValidation from '../../../middleware/jwtValidation';
import * as somethingController from '../../../controllers/v1/somethingController'

export const SomethingRouter = Router();

/**
 * @swagger
 *
 * /v1/something:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create something
 *     produces:
 *       - application/json
 *     tags:
 *       - Something
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [something, alsoSomething]
 *              properties:
 *                something:
 *                  type: string
 *                  description: also something
 *                alsoSomething:
 *                  type: string
 *                  description: something
 *     responses:
 *       200:
 *         description: Created a something. Returning new something.
 *       400:
 *          description: An error occurred
 */
SomethingRouter.post('/', jwtValidation, somethingController.create);

