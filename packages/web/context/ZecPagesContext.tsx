import * as React from 'react';

enum ActionTypes {
  ADD_REPLY = 'ADD_REPLY',
};

export type ReplyValue = {
  id: number,
  memo: string,
  reply_to_post?: string,
  datetime?: string,
  reply_count?: number,
}

type Action = {
  type: ActionTypes.ADD_REPLY,
  payload: ReplyValue,
};
type Dispatch = (action: Action) => void;
type State = { [key: string]: { [key: string]: ReplyValue } };
type ZecPagesProviderProps = { children: React.ReactNode };

type ZecPagesContextType = {
  state: State;
  dispatch: Dispatch;
} | undefined

const ZecPagesContext = React.createContext<ZecPagesContextType>(undefined);

function zecPagesReducer(state: State, action: Action) {
  // const { type: actionType, payload } = action;

  switch (action.type) {
    case 'ADD_REPLY': {
      const { payload } = action;
      const { reply_to_post, id } = payload;

      if (!reply_to_post) {
        throw new Error('Reply to post ID missing');
      }

      return {
        ...state,
        [reply_to_post]: {
          ...state[reply_to_post],
          [id]: {
            ...payload,
          }
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ZecPagesProvider({ children }: ZecPagesProviderProps) {
  const [state, dispatch] = React.useReducer(zecPagesReducer, {});

  const value = { state, dispatch };
  return (
    <ZecPagesContext.Provider value={value}>
      {children}
    </ZecPagesContext.Provider>
  );
}

function useZecPages() {
  const { state, dispatch } = React.useContext<ZecPagesContextType>(ZecPagesContext) || {};

  if (!dispatch) {
    return {};
  }

  const addReply = (replyPost: ReplyValue) => dispatch({ type: ActionTypes.ADD_REPLY, payload: replyPost })
  // const setOn = () => dispatch({ type: 'ON' })
  // const setOff = () => dispatch({ type: 'OFF' })

  if (state === undefined) {
    throw new Error('useZecPages must be used within a ZecPagesProvider');
  }

  return { state, addReply };
}

export { ZecPagesProvider, useZecPages };
