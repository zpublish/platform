import React, { Fragment } from 'react';
import LayoutEngine from 'simple-masonry-layout'
// import { Image } from 'react-sketchapp';
import {
  Text, Box, Row, Button, Headline, Line, Circle, Image, useWindowDimensions, useLayout,
} from 'elemental-react';
import { Svg, G, Polygon, Path } from 'react-primitives-svg';




import Section from './Section';
import AppBar from './AppBar';

const MenuIcon = () => (
  <Box width={48} height={48} px="4px" py="6px" justifyContent="space-between">
    {(new Array(3).fill(null)).map((_, i) => (<Line key={i} bg="black" height="4px" width="40px" />))}
  </Box>
);




const ImageListItem = ({ src, x, y, height, width, i, ...props }: any) => (
  <Box
    position="absolute"
    top={y}
    left={x}
    // style={{ transform: `translateX(${x}) translateY(${y})` }}
    width={width}
    height={height}
    // bg="#555"
  >
    <Image
      src={src}
      style={{ flex: 1 }}
      resizeMode="contain"
    />
    {/* <Box bg="rgba(0, 0, 0, 0.4)" width={width} height={height} position="absolute" justifyContent="center" alignItems="center">
      <Text fontSize={40} bold color="white" fontFamily="Helvetica">{i}</Text>
    </Box> */}
  </Box>
);

const renderItem = ({ url, x, y, width, height }: any, i: number) => (
  <ImageListItem key={url} src={url} x={x} y={y} height={height} width={width} i={i} />
);

// const processImages = async (images) => {
//   const processedImages = [...images];
//   for (const i in images) {
//     const image = processedImages[i];
//     // await Image.getSize(image.url, (width, height) => {
//       processedImages[i] = { ...image, width, height };
//     // });
//   }
//   return processedImages;
// }
const processImages = (images: any) => images;

const calculateRectangles = (options: any) => {
  return LayoutEngine.generateRectangles(options)
}


const ImageList = ({
  images = [],
  columns = 3,
  gutter = 8,
  maxHeight = 0,
  collapsing = true,
  customize = null,
  centering = false,
  viewport = {
    name: 'Mobile',
  },
  width: widthOverride,
}: any ) => {
  let width = widthOverride || useWindowDimensions().width;
  const { breakpoint } = useLayout();

  if (breakpoint === 0) {
    width = width - 32;
    columns = 2;
  }
  if (breakpoint === 1) {
    width = width - 80;
    columns = 3;
  }
  if (breakpoint === 2) {
    width = 1024;
    columns = 4;
  }

  const dimensions = images.map(({ width, height }: { width: number, height: number }) => ({ width, height }));

  const rectangles = calculateRectangles({
    dimensions,
    columns,
    width,
    gutter,
  });

  // const totalHeight = rectangles.reduce((acc: any, val: any) => {
  //   acc += val.height;

  //   return acc;
  // }, 0);
  const lastRectangle = rectangles[rectangles.length - 1];
  const totalHeight = lastRectangle?.y + lastRectangle?.height;

  return (
    <Row height={totalHeight} width="100%" name={ImageList.name} justifyContent="space-between">
      {images.map(({ url, id }: any, i: number) => {
        const rectangle = rectangles[i];
        const { x, y, width, height } = rectangle;

        return (
          <Fragment key={id}>
            {renderItem({ url, x, y, width, height }, i)}
          </Fragment>
        );
      })}
    </Row>
  );
};

// const ImageListContainer = withRouter(ImageList);
const ImageListContainer = ImageList;

const InstagramButton = ({ children = 'SEE MORE ON INSTAGRAM', color = '#0057FF', ...props }) => (
  <Box borderWidth={2} borderColor={color} flex={1} p={16} alignItems="center" justifyContent="center" {...props}>
    <Text color={color} fontFamily="Roboto" fontSize={28} lineHeight={36} center bold>
      {children}
    </Text>
  </Box>
);

const Gallery = ({ images, width, viewport = { height: '100vh', width: '100vw' } }: any) => {
  return (
    <Box bg="white" minHeight={viewport.height} width="100%">
      <Box bg="white">
        {/* <AppBar>
          <AppBar.MenuIcon />
          <AppBar.Title />
        </AppBar> */}
        <Section pt={16} justifyContent="center">
          <Box position="relative">
            <ImageListContainer images={images} width={width} />
          </Box>
        </Section>
      </Box>
    </Box>
  );
};
Gallery.InstagramButton = InstagramButton;

export default Gallery;
