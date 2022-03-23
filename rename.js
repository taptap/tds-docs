const fs = require("fs");
const path = require("path");
const fsp =  require('fs/promises');

async function rewriteFrontMatter(filePath, position) {
  const content = await fsp.readFile(filePath);
  const match = /^---\s(.*?)\s---(.*)/gms.exec(content.toString());
  if (match) {
    const [, frontMatters, restString] = match;
    const hasPosition = /sidebar_position/gms.test(frontMatters);
    if (hasPosition) {
      console.log('sidebar_position settled: ', filePath);
    } else {
      const positionConfig = `sidebar_position: ${parseInt(position)}`;
      await fsp.writeFile(filePath, `---\n${frontMatters}\n${positionConfig}\n---${restString}`);
    }
  } else {
    console.log('front matter not found:', filePath);
  }
}

async function renameFile(filePath) {
  const fileName = path.basename(filePath);
  const match = /^(\d+)-(.*\.md)$/.exec(fileName);
  if (match) {
    const [,position, name] = match;
    await rewriteFrontMatter(filePath, position);
    await fsp.rename(filePath, path.join(path.dirname(filePath), name));
  } else {
    console.log('skip file: ', fileName)
  }
}

async function rewriteCategoryFile(dirPath, position) {
  const categoryFilePath = path.join(dirPath, '_category_.json')
  const exist = fs.existsSync(categoryFilePath);
  if (exist) {
    const categoryContent = await fsp.readFile(categoryFilePath);
    const config = JSON.parse(categoryContent.toString());
    config.position = parseInt(position);
    await fsp.writeFile(categoryFilePath, JSON.stringify(config, null, 2));
  }
}

async function renameDirectory(dirPath){
  const dirName = path.basename(dirPath);
  const match = /^(\d+)-(.*)$/.exec(dirName);
  if (match) {
    const [,position, name] = match;
    await rewriteCategoryFile(dirPath, position);
    await fsp.rename(dirPath, path.join(path.dirname(dirPath), name));
  } else {
    console.log('skip dir: ', dirName);
  }
}

async function renameAll(dirPath) {
  for await (const d of await fsp.opendir(dirPath)) {
    const childPath = path.join(dirPath, d.name);
    if (d.isDirectory()) {
      await renameAll(childPath);
    } else if (d.isFile()) {
      await renameFile(childPath);
    }
  }
  await renameDirectory(dirPath)
}

async function main() {
  const path = './docs/sdk/tapdb';
  await renameAll(path);
}

if (require.main === module) {
  main();
}
