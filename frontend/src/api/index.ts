const serverURL = import.meta.env.VITE_BACKEND_URL;

export type FetchParam = {
  fileId: string;
  page: number;
  count: number;
  sort: number;
  searchText: string;
  sortIndex: number;
}
export const uploadFileToServer = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${serverURL}/excelMng/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return response.json();
};

export const readData = async(params: FetchParam) => {
  const url = new URL(`${serverURL}/excelMng/readData`);
  url.search = new URLSearchParams(params as Record<string, any>).toString();

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}