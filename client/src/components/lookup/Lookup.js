import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autosuggest from "react-autosuggest";

import Suggestion from "../suggestion/Suggestion";
import "./Lookup.css";

export default function Lookup({ names }) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    if (newValue !== value) setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
    setValue(value);
  };

  const onSuggestionsClearRequested = () => {
    if (suggestions.length > 0) setSuggestions([]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    return inputValue.length === 0
      ? []
      : names.filter((p) => p.includes(inputValue));
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <Suggestion suggestion={suggestion} typeahead={value} />
  );

  const onSuggestionSelected = (event, object) => {
    navigate(`/pokemon/${object.suggestion}`, { replace: false });
  };

  const lookupName = () => {
    if (names.includes(value))
      navigate(`/pokemon/${value}`, { replace: false });
  };

  const inputProps = {
    placeholder: "",
    value: value,
    onChange: onChange,
  };

  const getRandomPokemonName = () => {
    const rand = 1 + Math.floor(Math.random() * names.length);
    return names[rand];
  };

  const loadRandomPokemon = () => {
    navigate(`/pokemon/${getRandomPokemonName()}`, { replace: false });
  };

  return (
    <div className="lookup">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
      />
      <button className="btn" onClick={lookupName}>
        search
      </button>
      <button className="btn" onClick={loadRandomPokemon}>
        random
      </button>
    </div>
  );
}
