export default [
  network(
    'edonet',
    'https://edonet.SmartPy.io',
    'KT1K2JLNvTwDNKctaQThjcHrxcmaLoHXH6um'
  ),
];

export function isMainnet(network) {
  return network.id == 'mainnet';
}

function network(id, url, contract) {
  return { id, url, contract };
}
