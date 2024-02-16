import { HttpService } from './http-service';
import { sortBy } from 'lodash-es';

export type Period = 'weekly' | 'monthly' | 'yearly';
export interface SpendingsResponse {
  period: Period;
  total: string;
  granularity: string;
  granularResults: GranularResult[];
}

export interface GranularResult {
  period: string;
  total: string;
}

class StatisticsService {
  private http = new HttpService();

  async getSpendings({
    period,
    year,
    week,
    month,
  }: {
    period: string;
    year: string;
    week?: string;
    month?: string;
  }) {
    const response = await this.http.get<SpendingsResponse>(
      '/statistics/spending',
      {
        query: {
          period,
          year,
          week: week ?? '',
          month: month ?? '',
        },
      },
    );
    return {
      total: response.total,
      results: sortBy(response.granularResults, (_) => _.period),
    };
  }
}

export const statisticsService = new StatisticsService();
