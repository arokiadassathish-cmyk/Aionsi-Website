import { runMatchAgent, validateMatchOutput } from './matchAgent';
import { aionSiMatchCapabilities } from './matchAgentConfig';

const skyeChipSignals = [
  {
    id: 'skyechip-asic',
    claim: 'SkyeChip delivers advanced ASIC development and custom ASIC solutions.',
    sourceUrl: 'https://skyechip.com/asic-solutions/',
    sourceType: 'company' as const,
    confidence: 'high' as const,
  },
  {
    id: 'skyechip-hbm',
    claim: 'SkyeChip highlights HBM, NoC and die-to-die interconnect IP and has reported HBM3E silicon success.',
    sourceUrl: 'https://skyechip.com/',
    sourceType: 'technical' as const,
    confidence: 'high' as const,
  },
  {
    id: 'skyechip-ai-hpc',
    claim: 'SkyeChip focuses on AI and HPC and works across architecture, logic design, DFT and physical design.',
    sourceUrl: 'https://skyechip.com/company/',
    sourceType: 'company' as const,
    confidence: 'high' as const,
  },
];

describe('Match Agent v1', () => {
  it('preserves CRM identity and produces sourced matches', () => {
    const result = runMatchAgent({
      accountId: 'skyechip-account',
      companyName: 'SkyeChip',
      researchSignals: skyeChipSignals,
      capabilities: aionSiMatchCapabilities,
      personaTitle: 'VP Engineering',
    });

    expect(result.accountId).toBe('skyechip-account');
    expect(result.companyName).toBe('SkyeChip');
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
