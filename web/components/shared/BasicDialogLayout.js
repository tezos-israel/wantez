import PropTypes from 'prop-types';

export default function BasicDialogLayout({
  header,
  children,
  buttonsLine: Buttons,
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-museo space-y-5 text-center text-gray-500">
        <header className="flex items-center justify-center">{header}</header>
        <div className="text-center">{children}</div>
      </div>

      <Buttons />
    </div>
  );
}

BasicDialogLayout.propTypes = {
  buttonsLine: PropTypes.node.isRequired,
  children: PropTypes.node,
  header: PropTypes.node.isRequired,
};
