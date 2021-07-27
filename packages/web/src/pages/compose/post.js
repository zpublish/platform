import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'gatsby';

import { Button, Box, Text, TextInput, Line } from 'elemental-react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import AppBar from '../../../../components/lib/common/AppBar';
import Section from '../../../../components/lib/common/Section';

const Link = ({ children, to }) => <a href={to}>{children}</a>;

// const Footer = () => (
//   <Box bg="black">
//     <Link to="/page-2/">Go to page 2</Link>
//   </Box>
// );

const _TextInput = React.forwardRef(({ components, multiline, style, ...props }, ref) => {
  // const { View = 'input' } = components || {};
  const [View, setView] = useState(components?.View || 'input');

  useEffect(() => {
    if (multiline) {
      setView(components?.TextArea || 'textarea');
    } else {
      setView(components?.Input || 'input');
    }
  }, multiline);
  console.log({ View });

  return (
    <View
      ref={ref}
      style={{ fontSize: 30, outline: 'none', borderWidth: 0, ...style }}
      {...props}
    />
  );
});

const AutoTextArea = ({ ...props }) => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState();
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [parentHeight, setParentHeight] = useState('auto');

  useEffect(() => {
    if (!textAreaRef?.current) {
      return;
    }

    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event) => {
    setTextAreaHeight("auto");
		setParentHeight(`${textAreaRef.current.scrollHeight}px`);
		setText(event.target.value);

		if (props.onChange) {
			props.onChange(event);
		}
  }

  return (
    <Box minHeight={parentHeight}>
      <_TextInput ref={textAreaRef} multiline placeholder="What's up?" fontSize={30} fontFamily="IBM Plex Sans" as="textarea" style={{ height: textAreaHeight, fontSize: 30, outline: 'none' }} onChange={onChangeHandler} rows={1} />
    </Box>
  );
};


const IndexPage = () => {
  const [navOverlayOpen, setNavOverlayOpen] = useState(false);

  return (
    <Layout>
      <SEO title="Home" />
      <Box
        height="100vh"
        width="100vw"
        bg="white"
      >
        <AppBar>
          <AppBar.MenuIcon onClick={() => { setNavOverlayOpen(!navOverlayOpen); }} />
          <AppBar.Title />
          <AppBar.Fill />
        </AppBar>
        <Section pt={52} pb={0}>
          {/* <TextInput as="textarea"  /> */}
          <AutoTextArea />
          <Line bg="#E4E4E4" width="100%" mt={40} />
        </Section>
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          p={40}
        >
          <Box />
          <Link to="https://github.com/elemental-design">
            <Button outlined={false}>
              <Button.Text color="blue" fontFamily="Helvetica" fontSize={[6, 5, 4]}>
                Find Out More
                <Text bold fontSize={[6, 5, 4]}>
                  {` >`}
                </Text>
              </Button.Text>
            </Button>
          </Link>
        </Box>
      </Box>
      {/* <Footer /> */}
    </Layout>
  );
};

export default IndexPage;
