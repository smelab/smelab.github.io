export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.addEventListener('load', (event) => {
      const content = event?.target?.result;

      resolve(content?.toString?.() ?? '');
    });

    fileReader.addEventListener('error', () => {
      reject();
    });
  });
}
