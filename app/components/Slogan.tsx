export default function Slogan() {
  return (
    <div
      className="
            absolute
            top-4 right-4
            sm:top-8 sm:right-8
            md:top-16 md:right-16
            flex items-center justify-center
            h-36 w-36
            md:h-48 md:w-48
            lg:h-72 lg:w-72
            rounded-full bg-white shadow-md
          "
    >
      <img
        src="/slogan.png"
        alt="Slogan"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
