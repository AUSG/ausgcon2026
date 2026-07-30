interface SectionLabelProps {
  index: string;
  name: string;
  inverted?: boolean;
}

export function SectionLabel({ index, name, inverted = false }: SectionLabelProps) {
  return (
    <div className={`section-label${inverted ? " section-label--inverted" : ""}`}>
      <span>{index}</span>
      <span className="section-label__line" aria-hidden="true" />
      <span>{name}</span>
    </div>
  );
}
