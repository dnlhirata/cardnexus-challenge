import type { ParsedQs } from 'qs';
import CardRepo from '@src/repos/CardRepo';
import type { ICard } from '@src/models/Card';

export const EVENT_NOT_FOUND_ERR = 'Event not found';

const findAll = (query: ParsedQs): Promise<ICard[]> => {
  return CardRepo.findAll(query);
}

export default {
  findAll,
}