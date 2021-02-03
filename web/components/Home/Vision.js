import PropTypes from 'prop-types';
import Section from './Section';

export default function Vision({ title, text }) {
  return (
    <Section>
      <div className="py-30 lg:px-0 lg:w-1/2 sm:flex sm:space-y-0 items-center justify-between px-10 mx-auto space-y-10">
        <h2 className="font-museo sm:w-1/3 text-5xl font-bold">{title}</h2>
        <div className="sm:w-1/2 text-xl font-light">{text}</div>
      </div>
    </Section>
  );
}

Vision.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
