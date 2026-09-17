export interface ResearchProviderQuery {
  accountId: string;
  companyName: string;
  domain?: string;
  geography?: string;
  contactIds: string[];
}

export interface ResearchProviderDocument {
  id: string;
  title: string;
  url: string;
  excerpt?: string;
  sourceType?: string;
  confidence?: 'high' | 'medium' | 'low';
}

export interface CanonicalResearchProvider {
  search(input: ResearchProviderQuery): Promise<ResearchProviderDocument[]>;
}
