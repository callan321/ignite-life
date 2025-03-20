export default function ContentCard({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="lg:mx-auto m-8 p-8 sm:m-16 lg:w-full max-w-2xl  bg-white rounded border border-gray-50 opacity-85 shadow-lg">
      {children}
    </div>
  );
}
