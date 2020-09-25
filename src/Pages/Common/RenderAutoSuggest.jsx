import React, { Fragment } from "react";
import { FormFeedback, FormText } from "reactstrap";
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = suggestion => {

 return  suggestion.SocialReason;
}
 
// Use your imagination to render suggestions.

const renderSuggestion = suggestion => (
  <div>
    {suggestion.SocialReason}
  </div>
);



export const AutoSuggestField = ({
 input,
 meta: { touched, error, warning },
 ...custom
}) => (
 <Fragment>
   <Autosuggest 
   suggestions={custom.suggestions}
   onSuggestionsFetchRequested={custom.onSuggestionsFetchRequested}
   onSuggestionsClearRequested={custom.onSuggestionsClearRequested}
   getSuggestionValue={custom.getSuggestionValue}
   renderSuggestion={renderSuggestion}
   inputProps={custom.inputProps}
   
   />
   {error && <FormFeedback>{error}</FormFeedback>}
   {!error && warning && <FormText>{warning}</FormText>}
 </Fragment>
);