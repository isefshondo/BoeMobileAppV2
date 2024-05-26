export interface StatisticsInfoProps {
  elementIcon: React.ReactNode;
  statisticsValue: number;
  color: string;
}

export interface CowAnalyticsCardProps {
  type: 'CURRENT_REGISTERED_COWS' | 'CURRENT_POSITIVE_CASES';
  value: number;
  increasedCasesValue?: number;
  decreasedCasesValue?: number;
}
