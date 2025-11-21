import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';
import Archiver from 'archiver';

const TEXT_EXTS = new Set([
  '.js','.jsx','.ts','.tsx','.json','.cjs','.mjs','.html','.css',
  '.md','.txt','.yml','.yaml','.py','.java','.xml','.sh','.env','.gitignore'
]);

const IGNORE_DIRS = new Set(['node_modules','.git','.next','dist','build','.turbo','.parcel-cache','coverage']);

export async function extractZipToText(zipPath, maxBytes = 200 * 1024) {
  const dir = path.join(path.dirname(zipPath), 'unzipped', Date.now().toString());
  await fs.promises.mkdir(dir, { recursive: true });
  await fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: dir })).promise();

  let output = '';
  const walk = async (p) => {
    const entries = await fs.promises.readdir(p, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(p, ent.name);
      const rel = path.relative(dir, full);
      if (ent.isDirectory()) {
        if (IGNORE_DIRS.has(ent.name)) continue;
        await walk(full);
      } else {
        const ext = path.extname(ent.name).toLowerCase();
        if (!TEXT_EXTS.has(ext)) continue;
        const stat = await fs.promises.stat(full);
        if (stat.size > maxBytes) continue;
        const content = await fs.promises.readFile(full, 'utf8');
        output += `\n\n// FILE: ${rel}\n${content}\n`;
      }
    }
  };
  await walk(dir);
  return output.trim();
}

export function parseMREOutput(text) {
  const fileBlocks = [];
  const filePattern = /===== FILE:\s*([^\n]+)\s*=====([\s\S]*?)(?=(?:\n===== FILE:|\n===== RUNNING INSTRUCTIONS =====|\n===== ERROR REPRODUCTION NOTES =====|$))/g;
  let match;
  while ((match = filePattern.exec(text)) !== null) {
    const filename = match[1].trim();
    const content = match[2].replace(/^(\r?\n)/, '');
    fileBlocks.push({ filename, content });
  }
  return { files: fileBlocks };
}

export async function writeMREToDisk(files, outDir) {
  await fs.promises.rm(outDir, { recursive: true, force: true });
  await fs.promises.mkdir(outDir, { recursive: true });
  for (const f of files) {
    const full = path.join(outDir, f.filename);
    await fs.promises.mkdir(path.dirname(full), { recursive: true });
    await fs.promises.writeFile(full, f.content, 'utf8');
  }
}

export async function zipDirToBuffer(dirPath) {
  const archive = Archiver('zip');
  const bufs = [];
  archive.on('data', (d) => bufs.push(d));
  archive.directory(dirPath, false);
  await archive.finalize();
  return Buffer.concat(bufs);
}
