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
      <div className="w-full relative container-padding">
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
