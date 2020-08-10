import ReactMde from 'react-mde';
import Showdown from 'showdown';
import React, { ReactElement, useState } from 'react';
import { FormikProps } from 'formik';
import { CommentFormik } from 'interfaces';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

interface Props {
  cn: string;
  prop: FormikProps<CommentFormik>;
}

export default ({ cn, prop }: Props): ReactElement => {
  const initialValue = prop.initialValues.content;

  const handleChange = (e: string): void => {
    const text = converter.makeHtml(e);
    prop.setFieldValue('content', text);
  };

  const [value, setValue] = useState(initialValue);
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview' | undefined>('write');

  const setValues = (e: string): void => {
    handleChange(e);
    setValue(e);
  };

  return (
    <ReactMde
      textAreaProps={{ name: 'content' }}
      className={cn}
      value={value}
      onChange={(el): void => setValues(el)}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(md) => Promise.resolve(converter.makeHtml(md))}
    />
  );
};
