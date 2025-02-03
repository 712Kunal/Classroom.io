'use client';

import { DateField, DateInput } from '@/components/ui/datefield-rac';
import { Label } from 'react-aria-components';

export default function BirthDate() {
  return (
    <DateField className="space-y-2">
      <DateInput className="bg-zinc-800 text-white rounded-md p-2 w-full" />
    </DateField>
  );
}
