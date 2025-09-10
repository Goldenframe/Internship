interface IndustryIdentifiers {
  type: string;
  identifier: string;
}

interface Dimensions {
  height: string;
  width: string;
  thickness: string;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

interface ReadingModes {
  text: boolean;
  image: boolean;
}

interface DownloadAccess {
  kind: string;
  volumeId: string;
  restricted: boolean;
  deviceAllowed: boolean;
  justAcquired: boolean;
  maxDownloadDevices: number;
  downloadsAcquired: number;
  nonce: string;
  source: string;
  reasonCode: string;
  message: string;
  signature: string;
}

interface Epub {
  isAvailable: boolean;
  downloadLink?: string;
  acsTokenLink?: string;
}

interface Pdf {
  isAvailable: boolean;
  downloadLink?: string;
  acsTokenLink?: string;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Pdf;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
  downloadAccess?: DownloadAccess;
}

interface ListPrice {
  amount: number;
  currencyCode: string;
}

interface RetailPrice {
  amount: number;
  currencyCode: string;
}

interface SaleInfo {
  country: string;
  saleability: string;
  onSaleDate?: string;
  isEbook: boolean;
  listPrice?: ListPrice;
  retailPrice?: RetailPrice;
  buyLink?: string;
}

export interface VolumeInfo {
  title: string;
  printType: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifiers[];
  pageCount: number;
  dimensions: Dimensions;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  contentVersion: string;
  imageLinks: Partial<ImageLinks>;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  allowAnonLogging: boolean;
  maturityRating: string;
  panelizationSummary: PanelizationSummary;
  readingModes: ReadingModes;
  printedPageCount: number;
}

interface SearchInfo {
  textSnippet: string;
}

export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: Partial<VolumeInfo>;
  saleInfo?: Partial<SaleInfo>;
  accessInfo?: Partial<AccessInfo>;
  searchInfo?: Partial<SearchInfo>;
}

export interface SearchResponse {
  kind: string;
  totalItems: number;
  items?: Book[];
}

export const FILTER_TYPES = {
  EBOOKS: 'ebooks',
  FREE_EBOOKS: 'free-ebooks',
  PAID_EBOOKS: 'paid-ebooks',
  FULL: 'full',
  PARTIAL: 'partial',
} as const;
