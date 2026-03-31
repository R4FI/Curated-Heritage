interface CategoryChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const CategoryChip = ({ label, active, onClick }: CategoryChipProps) => (
  <button
    onClick={onClick}
    className={`font-heading text-label-lg px-5 py-2 rounded-full transition-colors whitespace-nowrap ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    }`}
  >
    {label}
  </button>
);

export default CategoryChip;
