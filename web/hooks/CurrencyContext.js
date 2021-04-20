import PropTypes from 'prop-types';
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { debounce } from 'lib/debounce';

const CurrencyContext = createContext({
  xtzInCurrency: 0,
  isLoading: false,
  currencySymbol: '',
});

const currencies = [
  { id: 'ils', symbol: '₪' },
  { id: 'usd', symbol: '$' },
];

export const useCurrencyContext = () => useContext(CurrencyContext);

export function CurrencyProvider({ children, currencyId }) {
  const currency = currencies.find(({ id }) => id === currencyId);
  const { isLoading, xtzInCurrency } = useCurrencyPrice(currencyId);

  if (!currency) {
    throw new Error('Currency is not supported');
  }

  return (
    <CurrencyContext.Provider
      value={{ isLoading, xtzInCurrency, currencySymbol: currency.symbol }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

CurrencyProvider.propTypes = {
  children: PropTypes.any,
  currencyId: PropTypes.string.isRequired,
};

export function useFiatPrice(price) {
  const { xtzInCurrency, isLoading, currencySymbol } = useCurrencyContext();

  return {
    isLoading,
    currencySymbol,
    fiatPrice: Math.ceil(price * xtzInCurrency * 100) / 100,
  };
}

function useCurrencyPrice(currencyId) {
  const [xtzInCurrency, setXTZinCurrency] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadValue = useCallback(
    debounce(async (currencyId) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=${currencyId}`
      );
      const { tezos: response } = await res.json();
      const responsePrice = response[currencyId];
      setXTZinCurrency(responsePrice);
      setIsLoading(false);
    }, 1000),
    [currencyId]
  );

  useEffect(() => {
    setIsLoading(true);
    loadValue(currencyId);
  }, [currencyId, loadValue]);

  return { isLoading, xtzInCurrency };
}
