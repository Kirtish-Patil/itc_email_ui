export interface EmailInteraction {
  id: number;
  direction: string;
  status: string;
  queues: string | null;
  conversationId: string | null;
  replyToInteractionId: string | null;
  top: boolean | null;
  emailInteractionDetails: EmailInteractionDetails;
  draftInteraction: EmailInteraction | null;
}

export interface EmailInteractionDetails {
  id: number;
  graphId: string;
  bccRecipientsJson: string;
  bccRecipients: Recipient[];
  body: EmailBody;
  bodyPreview: string;
  categories: string[];
  ccRecipientsJson: string;
  ccRecipients: Recipient[];
  changeKey: string;
  conversationId: string | null;
  conversationIndex: string;
  createdDateTime: string;
  flag: FollowupFlag | null;
  from: Recipient;
  hasAttachments: boolean;
  importance: string;
  inferenceClassification: string;
  internetMessageHeaders: InternetMessageHeader[];
  internetMessageId: string;
  isDeliveryReceiptRequested: boolean | null;
  isDraft: boolean;
  isRead: boolean;
  isReadReceiptRequested: boolean;
  lastModifiedDateTime: string;
  parentFolderId: string | null;
  receivedDateTime: string | null;
  replyToJson: string;
  replyTo: Recipient[];
  sender: Recipient;
  sentDateTime: string | null;
  subject: string;
  toRecipientsJson: string;
  toRecipients: Recipient[];
  uniqueBody: EmailBody | null;
  webLink: string;
  attachments: Attachment[];
}

export interface EmailBody {
  contentType: string;
  content: string;
}

export interface EmailAddressEntity {
  name: string;
  address: string;
}

export interface Recipient {
  emailAddress: EmailAddressEntity;
}

export interface EmailFlag {
  flagStatus: string;
}

export interface FollowupFlag {
  id: number | null;
  completedDateTime: DateTimeTimeZone | null;
  dueDateTime: DateTimeTimeZone | null;
  flagStatus: string | null;
  startDateTime: DateTimeTimeZone | null;
}

export interface DateTimeTimeZone {
  dateTime: string | null;
  timeZone: string | null;
}

export interface InternetMessageHeader {
  id: number | null;
  name: string | null;
  value: string | null;
}

export interface Attachment {
  id: number;
  contentType: string;
  isInline: boolean;
  lastModifiedDateTime: string;
  name: string;
  size: number;
}
