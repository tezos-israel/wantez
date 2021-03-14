import PropTypes from 'prop-types';
export default function GTMNoScript() {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
  );
}

GTMNoScript.propTypes = {
  gtmId: PropTypes.string.isRequired,
};
