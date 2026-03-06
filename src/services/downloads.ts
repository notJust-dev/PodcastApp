import { File, Directory, Paths } from 'expo-file-system';

const downloadsDir = new Directory(Paths.document, 'episodes');

function getFileName(episodeId: number): string {
  return `episode-${episodeId}.mp3`;
}

export function getLocalEpisodePath(episodeId: number): string | null {
  const file = new File(downloadsDir, getFileName(episodeId));
  return file.exists ? file.uri : null;
}

export async function downloadEpisode(
  episodeId: number,
  url: string,
): Promise<string> {
  if (!downloadsDir.exists) {
    downloadsDir.create();
  }
  const output = await File.downloadFileAsync(url, downloadsDir);
  // Rename to our standard name
  const dest = new File(downloadsDir, getFileName(episodeId));
  if (output.uri !== dest.uri) {
    const downloaded = new File(output.uri);
    downloaded.move(dest);
  }
  return dest.uri;
}

export function deleteEpisodeDownload(episodeId: number): void {
  const file = new File(downloadsDir, getFileName(episodeId));
  if (file.exists) {
    file.delete();
  }
}
