export default [
  network(
    'edonet',
    'https://edonet.SmartPy.io',
    'KT1K2JLNvTwDNKctaQThjcHrxcmaLoHXH6um'
  ),
  network(
    'florencenet',
    'https://florencenet.SmartPy.io',
    'KT1FpcsPB3Do11AMjBziG6T1zMvLX6ciSXbV'
  ),
];

export function isMainnet(network) {
  return network.id == 'mainnet';
}

function network(id, url, contract) {
  return { id, url, contract };
}
