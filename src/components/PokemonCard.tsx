export default function PokemonCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={
        "card m-2 shadow-xl bg-[url('assets/bg-card.png')] bg-center bg-cover " +
        className
      }
    >
      {children}
    </div>
  );
}
