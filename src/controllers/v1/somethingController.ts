import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { Something } from '../../db/models/something';

/**
 * POST /v1/something
 * Expects something
 * Returns something
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function create(req: Request, res: Response): Promise<void> {
  const something = req.body.something;
  const alsoSomething = req.body.alsoSomething;

  if (!something) {
    res.status(400).send({ error: 'Missing something' });
  } else if (!alsoSomething) {
    res.status(400).send({ error: 'Missing something more' });
  } else {
    const somethingExists = await Something.findOne({ where: { something: something } });

    if (!somethingExists) {
      try {
        const props: any = {
          id: v4(),
          something,
          alsoSomething,
        }

        const newSomething = await Something.create(props);
        res.status(200).send(newSomething);
      } catch (e) {
        console.log(e);
        res.status(500).send({ error: e});
      }
    } else {
      res.status(400).send({ error: 'something exists' });
    }
  }

  res.status(200).send();
}
