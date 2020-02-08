import ReactMde from 'react-mde'
import Showdown from 'showdown'
import React from 'react';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export default (props) => {
  const { field, form } = props;

  const handleChange = (e) => {
    const text = converter.makeHtml(e)
    form.setFieldValue(field.name, text)
  }

  const [value, setValue] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState('write')

  const setValues = (e) => {
    handleChange(e);
    setValue(e);
  }

return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={(el) => setValues(el)}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
}
