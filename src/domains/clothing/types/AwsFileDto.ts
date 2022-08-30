export interface AwsFileDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition?: any;
  contentEncoding?: any;
  storageClass: string;
  serverSideEncryption?: any;
  metadata: undefined;
  location: string;
  etag: string;
  versionId: undefined;
}
