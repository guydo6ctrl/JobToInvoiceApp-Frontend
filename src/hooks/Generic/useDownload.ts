import api from "../../services/api";

export const useDownload = () => {
  const downloadFile = async (
    url: string,
    filename: string
  ) => {
    try {
      const response = await api.get(url, {
        responseType: 'blob',
      });

      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  };

  return { downloadFile };
};