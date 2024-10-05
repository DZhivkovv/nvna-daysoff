import { useState } from 'react';

function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (value) => {
    setIsLoading(value);
  };

  return [isLoading, setLoading];
}

export default useLoading;
