export default function ContentSection({
  bgcolour,
  fgcolour,
  children,
}: {
  bgcolour: string;
  fgcolour: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      style={{
        backgroundColor: bgcolour,
      }}
    >
      <div className="w-full relative px-0 md:px-16 lg:px-24 py-16 xl:px-36">
        <div
          style={{
            backgroundColor: fgcolour,
          }}
        >
          <div className="container-content">{children}</div>
        </div>
      </div>
    </section>
  );
}
