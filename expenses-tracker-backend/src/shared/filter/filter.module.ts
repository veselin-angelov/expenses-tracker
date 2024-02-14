import { Module } from '@nestjs/common';
import { FiltersQueryBuilderService } from '@app/shared/filter/services';

@Module({
  providers: [FiltersQueryBuilderService],
  exports: [FiltersQueryBuilderService],
})
export class FilterModule {}
