import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const { writeFile, readFile, mkdir } = fsPromises;

const __dirname = dirname(fileURLToPath(import.meta.url));
// import { writeFile } from 'fs';

// import zecPagesData from './data.json';
// import zecPagesData from './data.json' assert { type: `json` };



function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

const main = async () => {
  const zecPagesData = JSON.parse(
    await readFile(
      new URL('./data.json', import.meta.url)
    )
  );

  const sortedData = zecPagesData.sort((a, b) => b.id - a.id);

  const res = sliceIntoChunks(sortedData, 25);

  // console.log({ res, zecPagesData });
  let i = 0;
  for (const items of res) {
    // console.log({ i, items });
    try {
      await mkdir(join(__dirname, '../data/'));
    } catch(err) {}

    try {
      await mkdir(join(__dirname, '../data/board/'));
    } catch(err) {}

    await writeFile(
      join(__dirname, '../data/board', `${i + 1}.json`),
      JSON.stringify(items),
    );
    i += 1;
  }
};

main();
