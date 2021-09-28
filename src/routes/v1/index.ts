import { Router } from 'express';
import { SomethingRouter } from './organizer/endpoints';

export const v1Routes = Router();

v1Routes.use('/something', SomethingRouter);
