import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lib/debounce';

export function usePrice(priceXTZ, currency) {
  const [priceFiat, setPriceFiat] = useState(0);

  const loadPriceAsync = useCallback(
    debounce(async (price) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=${currency}`
      );
      const { tezos: response } = await res.json();
      const responsePrice = response[currency];
      setPriceFiat(Math.ceil(price * responsePrice * 100) / 100);
    }, 1000),
    []
  );

  useEffect(() => {
    loadPriceAsync(parseInt(priceXTZ));
  }, [priceXTZ]);

  return priceFiat;
}
