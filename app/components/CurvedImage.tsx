export default function CurvedImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div
      className="relative aspect-[8/6] w-full shadow-2xl"
      style={{
        borderTopLeftRadius: "50%",
        borderTopRightRadius: "50%",
        borderBottomLeftRadius: "2%",
        borderBottomRightRadius: "2%",
        overflow: "hidden",
      }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
