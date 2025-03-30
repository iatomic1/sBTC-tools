export function calculateTokenSupplyPercentage(
  userBalance: string | number,
  circulatingSupply: number,
): number {
  const decimals = 8;
  const balanceNum =
    typeof userBalance === 'string' ? Number(userBalance) : userBalance;

  const userBalanceStandard = balanceNum / 10 ** decimals;

  const percentage = (userBalanceStandard / circulatingSupply) * 100;

  return Number.parseFloat(percentage.toFixed(2));
}
