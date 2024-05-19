import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

// pipes servem para: validação e transformação
export class OptionalParseUUIDPipe extends ParseUUIDPipe {
  override async transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      return undefined;
    }

    return super.transform(value, metadata);
  }
}
