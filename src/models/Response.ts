export class BaseResponse<Data> {
  message = '';
  data: Data | null = null; 
}