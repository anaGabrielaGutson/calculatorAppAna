import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { UTCard, UTLabel } from '@widergy/energy-ui';
import { isEmpty } from '@widergy/web-utils/lib/array';
import { bool } from 'prop-types';

import UTLoading from 'app/components/UTLoading';
import CharactersActions from 'redux/characters/actions';
import { quoteType } from 'types/quotesTypes';
import useAnalytics from 'utils/hooks/useAnalytics';
import { categories, actions, labels } from 'constants/analytics';

import QuotesForm from './components/QuotesForm';
import styles from './styles.module.scss';

const QuotesContainer = ({ quotes, loading, dispatch }) => {
  const handleSubmit = useCallback(values => dispatch(CharactersActions.getQuotes(values.count)), [dispatch]);

  useAnalytics(
    !isEmpty(quotes) && !loading,
    categories.PERSONAJES,
    actions.RECUPERAR_PERSONAJES,
    labels.RECUPERAR_PERSONAJES_OK
  );

  return (
    <div className={styles.container}>
      <UTCard>
        <QuotesForm onSubmit={handleSubmit} />
      </UTCard>
      <div className={styles.characters}>
        <UTLoading loading={loading}>
          {quotes.map(quote => (
            <div className={styles.characterContainer}>
              <img alt="character" src={quote.image} className={styles.character} />
              <UTLabel large semibold>
                {quote.character}
              </UTLabel>
              <UTLabel>{quote.quote}</UTLabel>
            </div>
          ))}
        </UTLoading>
      </div>
    </div>
  );
};

QuotesContainer.propTypes = {
  loading: bool,
  quotes: quoteType
};

const mapStateToProps = store => ({
  quotes: store.characters.quotes,
  loading: store.characters.quotesLoading
});

export default connect(mapStateToProps)(QuotesContainer);
