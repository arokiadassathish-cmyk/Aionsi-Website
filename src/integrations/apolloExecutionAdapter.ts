export type ExecutionMode = 'dry_run' | 'live';

export interface ApolloEnrollmentRequest {
  sequenceId: string;
  contactIds: string[];
  emailAccountId: string;
  mode: ExecutionMode;
}

export interface ApolloActivationRequest {
  sequenceId: string;
  mode: ExecutionMode;
}

export interface ApolloExecutionResult {
  ok: boolean;
  operation: 'enrollment' | 'activation';
  mode: ExecutionMode;
  sequenceId: string;
  contactCount?: number;
  blockers: string[];
}

export interface ApolloExecutionAdapter {
  enroll(request: ApolloEnrollmentRequest): Promise<ApolloExecutionResult>;
  activate(request: ApolloActivationRequest): Promise<ApolloExecutionResult>;
}

/**
 * Live Apollo execution stays behind an injected transport. The adapter is
 * intentionally fail-closed so the agent runtime cannot accidentally send
 * outreach merely because Apollo credentials exist in the environment.
 */
export interface ApolloExecutionTransport {
  enroll(request: Omit<ApolloEnrollmentRequest, 'mode'>): Promise<void>;
  activate(request: Omit<ApolloActivationRequest, 'mode'>): Promise<void>;
}

export function createApolloExecutionAdapter(
  transport?: ApolloExecutionTransport,
): ApolloExecutionAdapter {
  return {
    async enroll(request) {
      validateEnrollmentRequest(request);
      if (request.mode === 'dry_run') {
        return {
          ok: true,
          operation: 'enrollment',
          mode: request.mode,
          sequenceId: request.sequenceId,
          contactCount: request.contactIds.length,
          blockers: [],
        };
      }
      if (!transport) {
        return {
          ok: false,
          operation: 'enrollment',
          mode: request.mode,
          sequenceId: request.sequenceId,
          contactCount: request.contactIds.length,
          blockers: ['Apollo live execution transport is not configured.'],
        };
      }
      await transport.enroll({
        sequenceId: request.sequenceId,
        contactIds: request.contactIds,
        emailAccountId: request.emailAccountId,
      });
      return {
        ok: true,
        operation: 'enrollment',
        mode: request.mode,
        sequenceId: request.sequenceId,
        contactCount: request.contactIds.length,
        blockers: [],
      };
    },
    async activate(request) {
      if (!request.sequenceId.trim()) throw new Error('Apollo sequenceId is required.');
      if (request.mode === 'dry_run') {
        return {
          ok: true,
          operation: 'activation',
          mode: request.mode,
          sequenceId: request.sequenceId,
          blockers: [],
        };
      }
      if (!transport) {
        return {
          ok: false,
          operation: 'activation',
          mode: request.mode,
          sequenceId: request.sequenceId,
          blockers: ['Apollo live execution transport is not configured.'],
        };
      }
      await transport.activate({ sequenceId: request.sequenceId });
      return {
        ok: true,
        operation: 'activation',
        mode: request.mode,
        sequenceId: request.sequenceId,
        blockers: [],
      };
    },
  };
}

function validateEnrollmentRequest(request: ApolloEnrollmentRequest): void {
  if (!request.sequenceId.trim()) throw new Error('Apollo sequenceId is required.');
  if (!request.emailAccountId.trim()) throw new Error('Apollo emailAccountId is required.');
  if (request.contactIds.length === 0) throw new Error('Apollo enrollment requires at least one contact.');
  if (request.contactIds.some((id) => !id.trim())) throw new Error('Apollo contact IDs must be non-empty.');
}
