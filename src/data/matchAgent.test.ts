import { runMatchAgent, validateMatchOutput } from './matchAgent';
import { aionSiMatchCapabilities } from './matchAgentConfig';

const exampleSignals = [
  {
    id: 'example-asic',
    claim: 'Example Semiconductor delivers advanced ASIC development and custom SoC solutions.',
    sourceUrl: 'https://example.com/engineering',
    sourceType: 'company' as const,
    confidence: 'high' as const,
  },
  {
    id: 'example-interface',
    claim: 'Example Semiconductor develops high-speed interface IP and subsystem integration for compute platforms.',
    sourceUrl: 'https://example.com/technology',
    sourceType: 'technical' as const,
    confidence: 'high' as const,
  },
  {
    id: 'example-verification',
    claim: 'Example Semiconductor has an engineering team spanning design verification, RTL and physical design.',
    sourceUrl: 'https://example.com/company',
    sourceType: 'company' as const,
    confidence: 'high' as const,
  },
];

describe('Match Agent v1', () => {
  it('preserves CRM identity and produces sourced matches', () => {
    const result = runMatchAgent({
      accountId: 'example-account',
      companyName: 'Example Semiconductor',
      researchSignals: exampleSignals,
      capabilities: aionSiMatchCapabilities,
      personaTitle: 'VP Engineering',
    });

    expect(result.accountId).toBe('example-account');
    expect(result.companyName).toBe('Example Semiconductor');
    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.matches.length).toBeLessThanOrEqual(3);
    expect(result.readyForOutreach).toBe(true);
    expect(validateMatchOutput(result)).toEqual([]);
  });

  it('blocks when research evidence is missing', () => {
    const result = runMatchAgent({
      accountId: 'account-1',
      companyName: 'Example',
      researchSignals: [],
      capabilities: aionSiMatchCapabilities,
    });

    expect(result.readyForOutreach).toBe(false);
    expect(result.blockers).toContain('No sourced research signals available.');
  });

  it('blocks evidence-free capability matches', () => {
    const result = runMatchAgent({
      accountId: 'account-2',
      companyName: 'Example',
      researchSignals: [
        {
          id: 'signal-1',
          claim: 'Example uses physical design for advanced node programs.',
          sourceUrl: 'https://example.com/engineering',
          sourceType: 'company',
          confidence: 'high',
        },
      ],
      capabilities: [
        {
          id: 'pd',
          name: 'Physical Design',
          description: 'Physical implementation.',
          evidenceRefs: [],
          keywords: ['physical design', 'advanced node'],
        },
      ],
    });

    expect(validateMatchOutput(result)).toContain('Every capability match must include at least one AionSi evidence reference.');
  });
});
