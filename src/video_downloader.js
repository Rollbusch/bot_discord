const fs = require('fs');
const ytdl = require('ytdl-core');

exports.VideoDownloader = async function (url, path) {
  mediaPath = path.join('src', 'media')
  hasAFileWithThisName = true;

  let fileName = '';
  let filePath = ''

  while (hasAFileWithThisName) {
    fileName = (Math.random() + 1).toString(36).substring(2);
    filePath = path.join('src', 'media', `${fileName}.mp4`);
    hasAFileWithThisName = fs.existsSync(filePath);
  }

  try {
    ytdl(url).pipe(fs.createWriteStream(filePath))

    return filePath;
  } catch (error) {
    console.log('it was not possible to download the media.');
  }
}