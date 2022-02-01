/** Enum representing different possible loading states of ajax call */
export enum ResultState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED'
}

export interface ErrorMessage {
  errorMsg: string;
}

export type CallState = ResultState | ErrorMessage;

export function getCallStateError(callState: CallState): string | undefined {
  if ((callState as ErrorMessage).errorMsg !== undefined) {
    return (callState as ErrorMessage).errorMsg;
  }
  return undefined;
}
