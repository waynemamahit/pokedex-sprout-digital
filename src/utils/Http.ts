import { BaseResponse } from '../models/Response';

const get = async <ResponseType>(url: string) => {
  const response = new BaseResponse<ResponseType>();
  try {
    const http = await fetch(url);
    if (http.status !== 200) throw new Error(http.statusText);
    response.data = await http.json();
  } catch (error) {
    response.message =
      error instanceof Error ? error.message : 'An error occurred!';
  }
  return response;
};

export default {
  get
}
