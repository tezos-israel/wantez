import PropTypes from 'prop-types';
import Section from './Section';

export default function Vision({ title, text }) {
  return (
    <Section>
      <div className="py-30 flex items-center justify-between w-1/2 mx-auto">
        <h2 className="font-museo w-1/3 text-5xl font-bold">{title}</h2>
        <div className="w-1/2 text-xl font-light">{text}</div>
      </div>
    </Section>
  );
}

Vision.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
