export interface Root {
  kind: string
  totalItems: number
  items: Item[]
}

export interface Item {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
}

export interface VolumeInfo {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  industryIdentifiers: IndustryIdentifier[]
  readingModes: ReadingModes
  pageCount: number
  printType: string
  categories: string[]
  maturityRating: string
  allowAnonLogging: boolean
  contentVersion: string
  imageLinks: ImageLinks
  language: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
  averageRating: number
  ratingsCount: number
}

export interface IndustryIdentifier {
  type: string
  identifier: string
}

export interface ReadingModes {
  text: boolean
  image: boolean
}

export interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}

export interface SaleInfo {
  country: string
  saleability: string
  isEbook: boolean
}

export interface AccessInfo {
  country: string
  viewability: string
  embeddable: boolean
  publicDomain: boolean
  textToSpeechPermission: string
  epub: Epub
  pdf: Pdf
  webReaderLink: string
  accessViewStatus: string
  quoteSharingAllowed: boolean
}

export interface Epub {
  isAvailable: boolean
}

export interface Pdf {
  isAvailable: boolean
}
