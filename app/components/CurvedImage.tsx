export default function CurvedImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div
      className="relative shadow-2xl w-full aspect-[8/6]"
      style={{
        borderTopLeftRadius: "50%",
        borderTopRightRadius: "50%",
        borderBottomLeftRadius: "2%",
        borderBottomRightRadius: "2%",
        overflow: "hidden",
      }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
