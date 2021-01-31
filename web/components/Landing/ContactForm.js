import Logo from '../../images/logo.svg';

export default function ContactForm() {
  return (
    <form className="w-1/4 py-10 mx-auto">
      <h2 className="font-museo w-content flex mx-auto text-5xl font-bold text-blue-500">
        <Logo className="mr-10" />
        Join us now
      </h2>

      <div className="flex flex-col items-center justify-center mt-10 space-y-10">
        <input
          type="text"
          className="hover:bg-blue-100 w-full border-0 border-b border-blue-500 border-solid"
        />
        <button className="px-5 py-2 text-white bg-yellow-500 rounded-sm">
          Join the mailing list
        </button>
      </div>
    </form>
  );
}
