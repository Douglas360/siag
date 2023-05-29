export const handleRequest = async (requestPromise) => {
    try {
      setLoading(true);
      const response = await requestPromise;
    
      return response.data;
    } catch (error) {
    
      const message =
        ERROR_MESSAGES[error.response?.data.error] || 'Erro desconhecido';
      toast.error(message, {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return error;
    }finally{
      setLoading(false);
    }
  };
  