export interface CowAnalyticsCardProps {
  type: 'CURRENT_REGISTERED_COWS' | 'CURRENT_POSITIVE_CASES';
  value: number;
  increasedCasesValue?: number;
  decreasedCasesValue?: number;
}
