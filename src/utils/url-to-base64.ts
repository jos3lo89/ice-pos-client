export const urlToBase64 = async (imgUrl: string): Promise<string | null> => {
  try {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error convirtiendo imagen a base64:", error);
    return null;
  }
};
