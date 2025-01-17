import { TransactionMeta } from '@metamask/transaction-controller';
import { genUnapprovedTokenTransferConfirmation } from '../../../../../../../test/data/confirmations/token-transfer';
import mockState from '../../../../../../../test/data/mock-state.json';
import { renderHookWithProvider } from '../../../../../../../test/lib/render-helpers';
import { useTokenDetails } from './useTokenDetails';

describe('useTokenDetails', () => {
  it('returns iconUrl from selected token if it exists', () => {
    const transactionMeta = genUnapprovedTokenTransferConfirmation(
      {},
    ) as TransactionMeta;

    const TEST_SELECTED_TOKEN = {
      address: 'address',
      decimals: 18,
      symbol: 'symbol',
      iconUrl: 'iconUrl',
      image: 'image',
    };

    const { result } = renderHookWithProvider(
      () => useTokenDetails(transactionMeta, TEST_SELECTED_TOKEN),
      mockState,
    );

    expect(result.current).toEqual({
      tokenImage: 'iconUrl',
      tokenSymbol: 'symbol',
    });
  });

  it('returns selected token image if no iconUrl is included', () => {
    const transactionMeta = genUnapprovedTokenTransferConfirmation(
      {},
    ) as TransactionMeta;

    const TEST_SELECTED_TOKEN = {
      address: 'address',
      decimals: 18,
      symbol: 'symbol',
      image: 'image',
    };

    const { result } = renderHookWithProvider(
      () => useTokenDetails(transactionMeta, TEST_SELECTED_TOKEN),
      mockState,
    );

    expect(result.current).toEqual({
      tokenImage: 'image',
      tokenSymbol: 'symbol',
    });
  });

  it('returns token list icon url if no image is included in the token', () => {
    const transactionMeta = genUnapprovedTokenTransferConfirmation(
      {},
    ) as TransactionMeta;

    const TEST_SELECTED_TOKEN = {
      address: 'address',
      decimals: 18,
      symbol: 'symbol',
    };

    const { result } = renderHookWithProvider(
      () => useTokenDetails(transactionMeta, TEST_SELECTED_TOKEN),
      {
        ...mockState,
        metamask: {
          ...mockState.metamask,
          tokenList: {
            '0x076146c765189d51be3160a2140cf80bfc73ad68': {
              iconUrl: 'tokenListIconUrl',
            },
          },
        },
      },
    );

    expect(result.current).toEqual({
      tokenImage: 'tokenListIconUrl',
      tokenSymbol: 'symbol',
    });
  });

  it('returns undefined if no image is found', () => {
    const transactionMeta = genUnapprovedTokenTransferConfirmation(
      {},
    ) as TransactionMeta;

    const TEST_SELECTED_TOKEN = {
      address: 'address',
      decimals: 18,
      symbol: 'symbol',
    };

    const { result } = renderHookWithProvider(
      () => useTokenDetails(transactionMeta, TEST_SELECTED_TOKEN),
      mockState,
    );

    expect(result.current).toEqual({
      tokenImage: undefined,
      tokenSymbol: 'symbol',
    });
  });
});
