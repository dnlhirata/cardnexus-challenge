import HttpStatusCodes from '@src/common/HttpStatusCodes';
import CardService from '@src/services/CardService';

import type { Response, Request } from 'express';

const findAll = async (req: Request, res: Response) => {
  const event = await CardService.findAll(req.query);
  res.status(HttpStatusCodes.OK).json(event);
}

export default {
  findAll,
};