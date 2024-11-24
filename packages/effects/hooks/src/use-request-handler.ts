export function useMessageHandler() {
  const handleRequest = async <T>(
    requestFn: () => Promise<T>,
    successCallback?: () => void,
    errorCallback?: (error: any) => void,
  ): Promise<null | T> => {
    try {
      const result = await requestFn();
      successCallback && successCallback();
      return result;
    } catch (error: any) {
      errorCallback && errorCallback(error);
      return null;
    }
  };

  return { handleRequest };
}
