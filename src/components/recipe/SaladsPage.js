import React from 'react';
import BasePage from './base/BasePage';

class SaladsPage extends React.Component {
  render() {
    const mybody = "Our salad recipes are a delicious and healthy use different ingredients and seasoning to make one of \
        the most joyous healthy salad recipes. Find the best green salad recipes, plus trusted recipes for more than \
        3330 other dinner and picnic salads.";
    return (
      <BasePage title="Salads" body={mybody} page="Salads" />
    );
  }
}

export default SaladsPage;
