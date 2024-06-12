import { ArgumentMetadata, ParseEnumPipe, ParseUUIDPipe } from '@nestjs/common';

// pipes servem para: validação e transformação
export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
  override async transform(value: T, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      return undefined;
    }

    return super.transform(value, metadata);
  }
}
