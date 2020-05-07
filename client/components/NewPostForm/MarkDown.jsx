import ReactMde from 'react-mde';
import Showdown from 'showdown';
import React from 'react';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default ({ cn, prop }) => {
  const initialValue = prop.initialValues.content;

  const handleChange = (e) => {
    const text = converter.makeHtml(e);
    prop.setFieldValue('content', text);
  };

  const [value, setValue] = React.useState(initialValue);
  const [selectedTab, setSelectedTab] = React.useState('write');

  const setValues = (e) => {
    handleChange(e);
    setValue(e);
  };

  return (
    <div className="container">
      <label htmlFor="content">
        Content:
        <ReactMde
          name="content"
          className={cn}
          value={value}
          onChange={(el) => setValues(el)}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
        />
      </label>
    </div>
  );
};
