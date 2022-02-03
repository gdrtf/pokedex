export default function Suggestion({suggestion, typeahead}) {
  if (typeahead == null || typeahead.length === 0) {
    return (
      <div>
        {suggestion}
      </div>
    )
  } else {
    // We highlight the section of the suggestion the user typed

    const lower = typeahead.toLowerCase();
    const index = suggestion.indexOf(lower);
    const prefix = suggestion.substring(0, index);
    const suffix = suggestion.substring(index + typeahead.length);

    return (
      <div>
        {prefix}<strong>{lower}</strong>{suffix}
      </div>
    )
  }
}