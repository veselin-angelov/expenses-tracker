import { HttpService } from './http-service';

export interface FileResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  bucket: string;
  remote: string;
  fileName: string;
  mimeType: string;
  size: number;
  extension: string;
  createdBy: CreatedBy;
  signedUrl: string;
}

export interface CreatedBy {
  id: string;
}

class FilesService {
  private http = new HttpService();

  async uploadFile(file: File): Promise<FileResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.http.postFile<FileResponse>('/files', {
      body: formData,
    });

    return response;
  }
}

export const filesService = new FilesService();
