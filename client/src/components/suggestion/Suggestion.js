export default function Suggestion({suggestion, typeahead}) {
  if (typeahead == null || typeahead.length == 0) {
    return (
      <div>
        {suggestion}
      </div>
    )
  } else {
    const index = suggestion.indexOf(typeahead);
    const prefix = suggestion.substring(0, index);
    const suffix = suggestion.substring(index + typeahead.length);

    return (
      <div>
        {prefix}<strong>{typeahead}</strong>{suffix}
      </div>
    )
  }
}