import { shape, string } from 'prop-types';

export const quoteType = shape({
  character: string.isRequired,
  characterDirection: string.isRequired,
  image: string.isRequired,
  quote: string.isRequired
});
