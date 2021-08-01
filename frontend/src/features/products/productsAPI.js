export const productsAPI = async (url, method, reqData) => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(reqData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const initialCartLoad = async (url) => {
  try {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
